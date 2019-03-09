---
title: HoCs and Render Props - Not Dead Yet!
subtitle: There's still a need for HoCs and Render Props in React 16.7
date: "2018-10-28T00:00:00.000Z"
layout: post
draft: true
tags:
  - javascript
  - higher order components
  - render props
  - react
  - hooks
---

At React conf we saw the introduction of [hook](https://reactjs.org/docs/hooks-reference.html)s, which duplicate all of the class-based lifecycle methods for functional components. For example, `setState`, `componentDidMount`, `createContext`, etc. now have a hook counterpart.

At first glance, they seem to do a lot of similar things that Render Props and Higher Order Components do. For example, [`withState`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate) from recompose does the same exact thing as the newly provided `useState` hook, except `useState` is much cleaner & doesn't rely on prop names not clashing.

I've seen a lot of people wonder if they "replace" RPs and HoCs. While some of them are simply usurped by the new hook versions, RPs and HoCs can still conditionally render elements, whereas hooks cannot.

Simply put,

> If your HoC or Render Prop was purely logic (meaning, it didn't render anything), it can be implemented with hooks or as a "custom" hook. If it conditionally rendered something (maybe like an 'access denied' page), it can't be reimagined as a hook.

Hooks don't replace these patterns, and in fact, hooks will make developing render props even easier! Hooks can be "composed" with other hooks and render props. Since hooks can't render anything, when you combine two hooks, you get a hook, and when you combine a hook with a render prop, you get a render prop.

![hooks](./hooks.png)

Consider the custom hook `usePromise`. It takes a function that returns a promise, fetches it when the component is rendered, and handles state around whether or not it's resolved.

It combines the `useState` and `useEffect` hooks:

```js
function usePromise(get) {
  const [result, setResult] = useState({
    loaded: false,
  });

  useEffect(() => {
    get().then(data => {
      setResult({ loaded: true, data })
    })
  }, []);

  return result;
}
```

`usePromise` is a composition of the `useState` and `useEffect`. Since those are both hooks, what we end up with is another hook.

Now, consider the `Loadable` render prop, which takes a potentially loading value, and renders a loading icon if the value is loading, or defers to a render function for the resolved value.

```jsx
const Loadable = ({resource, children}) => {
  if(!resource.loading) {
    return children(resource.data);
  } else {
    return <svg>...</svg>;
  }
}
```

Using the two together would look like:
```js
const App = () => {
  const fooResource = withPromise(() => fetchFoo());
  return (
    <Loadable resource={fooResource}>
      {foo => (
        <pre>{JSON.stringify(foo)}</pre>
      )}
    </Loadable>
  );
}
```

There's still a bit of duplication we can get rid of. What we want is something that will just take a function that returns a promise and the logic to render the resolved value, and have it handle all the state and take care of rendering the loading icon while the promise is resolving.

What we'll need to do is combine `usePromise` with `Loadable`. Since we're combining a hook with a render prop, we'll end up with a render prop.

Our `LoadPromise` render prop will look like:

```js
const LoadPromise = ({ get, children }) => {
  const result = usePromise(get);
  return <Loadable resource={result}>{children}</Loadable>;
}
```

And we'd use it just like a normal render prop:
```js
const App() => (
  <LoadPromise get={fetchFoo}>
    {foo => (
      <pre>{JSON.stringify(foo)}</pre>
    )}
  </LoadPromise>
)
```

TL:DR; While hooks can replace all of your logic-only HoCs/render props, They are still an effective way of sharing composeable views.

Also, if you're looking for a better, type-safe way to compose render props, check out [chainable components](https://github.com/pfgray/chainable-components)