---
title: A Proposal for an Alternative Design for Hooks
subtitle: An Alternative API for hooks based on functional programming patterns.
date: "2018-10-31T00:00:00.000Z"
layout: post
draft: false
tags:
  - javascript
  - react
  - hooks
---

#### preface:
If you haven't, please read the [Hooks Intro](https://reactjs.org/docs/hooks-intro.html), otherwise this post won't make sense to you.
To the React team: Thanks for a great framework. I enjoy using React every day, and it's all credit to your hard work.

Hook functions (currently as of 10/31/2018):

1. Have signatures which are indistinguishable from normal functions.
2. Have hidden complexity around ordering hooks.
3. Have no way to be unit tested.
4. Cannot short-circuit.
5. Can only be used in function components.
6. Are imperative.
7. Are not pure.

If we realized an alternative API based on functional programming patterns, we could have hook functions that:

1. Have meaningful signatures.
2. Have straightforward ordering mechanics.
3. Can be unit tested.
4. Can short circuit.
5. Can be used in class-based and function components.
6. Are declarative
7. Are pure.

## The ReactHook type

At the core of the API, there would be a new type, `ReactHook<T>` which is a glorified "wrapper" around some provided value `T`. This type would encapsulate a description of how react should execute effects around it.

From a render function, you can return a `ReactNode` (thus not breaking existing components) _or_ a `ReactHook<ReactNode>`. The react renderer will simply render a `ReactNode` if returned, or mount & maintain hooks if a `ReactHook<ReactNode>` is returned. For this reason, `React.createElement()` would need to be able to render both a `ReactNode` and a `ReactHook<ReactNode>`.

As an example, Instead of returning `[T, T => void]`, The `useState` hook would return `ReactHook<[T, T => void]>`. At first this might seem pedantic, but it provides many improvements, because now:

1. Users will immediately know this function represents a React Hook (because of it's signature).
2. The Hook function can be invoked outside the context of a functional component (in a unit test or class component for example).

## Rendering
Values of type `ReactHook` would have a `.map` function that modifies the value inside. Since functional components can return a `ReactHook<ReactNode>`, and the `useState` hook returns a `ReactNode<[T, T => void]>`. In order to use the `useState` hook to render a view, you'd need to map the value inside into a `ReactNode`:

```js
function App() {
  return useState(0)
    .map(([count, setCount]) => (
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    ))
}

ReactDom.render(<App />, document.getElementById('main'))
```

## Composition
In addition to `.map`, values of type `ReactHook` would have a `.chain`, which is similar to `.map`, except that the value returned from the lambda needs to be another `ReactHook`. The final value will just be the value returned from the lambda, but it will be _composed_ with the `ReactHook` above it.

```js
const App = () =>
  useState(0)
    .chain(([a, setA]) => 
      useState(0).map(([b, setB]) => 
        <div>
          {a}, <button onClick={() => setA(a + 1)}>+</button>
          {b}, <button onClick={() => setB(b + 1)}>+</button>
        </div>
      )
    )
```

Nesting could become an issue. Luckily, there are many solutions to this problem (since it is an incredibly common pattern), including but not limited to:

#### All:

```jsx
const App = () =>
  ReactHook.all([
    useState(0),
    useEffect(() => ...),
    useState(0)
  ])
  .map(([[a, setA], _, [b, setB]]) =>
    <div>
      {a}, <button onClick={() => setA(a + 1)}>+</button>
      {b}, <button onClick={() => setB(b + 1)}>+</button>
    </div>
  )
```

#### Compose:

```jsx
const App = () =>
  ReactHook.Compose(
    useState(5),
    (_) => useEffect(() => ...),
    (_, [a]) => useState(2 + a),
    ([b, setB], _, [a, setA]) =>
      <div>
        {a}, <button onClick={() => setA(a + 1)}>+</button>
        {b}, <button onClick={() => setB(b + 1)}>+</button>
      </div>
  )
```

#### Traverse (via [List](https://github.com/evilsoft/crocks/blob/master/src/core/List.js) from crocks)

```jsx
List([0, 2])
  .traverse(num => useState(num))
  .map(([a, setA], [b, setB]) =>
    <div>
      {a}, <button onClick={() => setA(a + 1)}>+</button>
      {b}, <button onClick={() => setB(b + 1)}>+</button>
    </div>
  )
```

#### Syntax Sugar (via [babel plugins](https://github.com/pfgray/babel-plugin-monadic-do)):

```jsx
const App = () =>
  do {
    [a, setA] << useState(5);
    _         << useEffect(() => ...);
    [b, setB] << useState(2 + a);

    <div>
      {a}, <button onClick={() => setA(a + 1)}>+</button>
      {b}, <button onClick={() => setB(b + 1)}>+</button>
    </div>
  }
```

## Short circuiting & rendering jsx
It would also be straightforward to model "short-circuit"-ing a render chain, returning jsx in certain situations. We'd need a few new methods to model this: `ReactHook.of`, `ReactHook.branch`, and `ReactHook.suspend`.

`ReactHook.of` would just take a value and wrap it in a `ReactHook`, i.e. `ReactHook.of(5)`, which can be mapped, chained, etc. `ReactHook.branch` would just take a jsx expression & render that, and `ReactHook.suspend` would signal to React that this component is waiting on some data to be resolved.

There are plenty of times where a `ReactHook` would like to render something conditionally. For example, it could attempt to extract the value of an API token from local storage, and pass it on if it exists, but if not present, render a login screen, thus "short-circuiting" the render chain from continuing. In practice, this would look like:

```jsx
const useToken = () => {
  const token = grabTokenFromLocalStorage()
  return token ? 
    ReactHook.of(token) :
    ReactHook.branch(<LoginScreen />)
}
```

This could then be used like:
```jsx
const App = () =>
  useToken()
    .map(token => 
      <div>
        You're logged in and your token is: {token}
      </div>
    )
```

React's new suspense feature is implemented via throwing promises when we wish to suspend. If we return a `ReactHook` value from our render functions, we could (instead of throwing) just return a `ReactHook.suspend()` expression. For example, suppose we wanted to fetch a list of users & "suspend" while we wait for the promise to resolve:

```js
const useFetchUsers = (token) =>
  ReactHook.Compose(
    useState({loaded: false}),
    ([data, setData]) => useEffect(() => {
      fetchUsers(token)
        .then(users => (
          setData({
            loaded: true,
            users
          })
        ))
    }),
    ([data, _], _) =>
      data.loading ? 
        ReactHook.suspend() : 
        ReactHook.of(data.users)
  )
```

We could compose these two hooks succinctly using a common API:

```jsx
ReactHook.Compose(
  useToken(), // will render a login screen if there is no token!
  token => useFetchUsers(token), // will 'suspend' if the users are loading!
  (users, token) =>
    <div>
      The users are: {users.map(u => ...)}
      And your token is: {token}
    </div>
)
```

## The Algebra of the ReactHook type:
The `ReactHook` type would just be an encapsulation of plain values that are treated differently depending on their type. The exact way they're implemented isn't important, but since they're now values, they can be built & executed in an environment outside of `ReactDOM.render()`. This is an important detail, especially when trying to write tests for these functions.

## Testing
Since Hook functions would return values, they are straightforward to test. A mock rendering engine could the various handle `ReactHook` types & allow you to make assertions. I haven't fully fleshed out exactly how a testing library would look, but some psuedocode would look something like:

```js
const statefulInstance = mockMount(useToken())

expect(mockRender(statefulInstance)).toBeType(LoginPage)

localStorage.setItem('apiToken', tok)

expect(mockRender(statefulInstance)).toHaveText(tok)
```

The important thing to note is that this testing library could be implemented totally outside of React. Currently, hooks _must_ be used inside the context of a React render.



I think this API would be quite forward thinking. React was built on functional ideals, and I feel we've pushed the existing patterns as far as they can go. The beauty is that this problem isn't [unique](https://tylermcginnis.com/async-javascript-from-callbacks-to-promises-to-async-await/) to us, and we can share [ideas](https://gist.github.com/MaiaVictor/bc0c02b6d1fbc7e3dbae838fb1376c80) and learn from past failures.

## TL:DR;

### Benefits:
1. Hook signatures are meaningful.
2. Hook functions are pure.
4. Hook functions can be used in class components.
5. Hook functions can also render stuff.

### Tradeoffs:
1. It is less concise than the current hooks proposal.
2. It uses complex functional patterns that every javascript developer might not be comfortable using.
