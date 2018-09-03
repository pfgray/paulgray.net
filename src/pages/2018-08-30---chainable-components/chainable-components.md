---
title:  Chainable Components
subtitle: A composable API for reusable React components
date: "2018-09-04T00:00:00.000Z"
layout: post
draft: false
tags:
  - javascript
  - higher order components
  - render props
  - react
---

The easiest way to write [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) reusable React components is with Render Props. However, they aren't inherently succinct or easy combine. HOCs are an equivalent way to write DRY React components, and offer more composability, but [leave a lot to be desired](https://www.youtube.com/watch?v=BcVAq3YFiuc). Fortunately, we can realize a more composable and succinct API for reusable React components.

## The Essence of reusable React components

The essence of HOCs and Render Props is to provide a value, and abstract the process of producing and maintaining that value. Take this `js±WithAuthentication` render prop for example:

```jsx
<WithAuthentication>
  {user => (
    <span>You are logged in as: {user.name}</span>
  )}
</WithAuthentication>
```

`WithAuthentication` will either produce the current user that is logged in, or render a login screen. This render prop can be used anywhere an application needs to define a view that should only be visible to logged in users. This render prop abstracts away the code that's used to produce a `user` object. In order to access this value, we provide a callback which takes this value as a parameter. Using multiple Render Props together can get verbose and clumsy, leading to heavily nested code.

Here's another example of the `withState` HOC from [recompose](https://github.com/acdlite/recompose):

```jsx
withState('counter', 'setCounter', 0)(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
)
```

`withState` provides the value `{counter, setCounter}`, and abstracts the way that state is initialized and maintained. In order to access this value, we provide a component which takes this value as props. HOCs can be succinctly composed with a common `compose` function, but this often leads to trouble when multiple HOCs use the same name for their props.

It would be optimal if we could find a way to combine the succinctness of HOCs with the flexibility of Render Props!

[Chainable Components](https://github.com/pfgray/chainable-components) is an attempt to fill this need, using advanced functional programming techniques.

Here's me talking to the React DC meetup group about this library.

`youtube: upUp34fVnvY`

## A Chainable API

Just like Render Props and HOCs, a chainable component abstracts over the logic to produce a value that can be used to render React views. The easiest way to create a chainable component is to use `of`:

```js
const five = ChainableComponent.of('five');
```

`five` is now a chainable component which contains the string value `"five"`. You can think of it as just a wrapper for that value. In order to use that value, we need to supply a view for that value:

```jsx
<div>
  {five.render(num => (
    <span>Your number is: {num}</span>
  ))}
</div>
```

In addition to wrapping static values, we can also convert Render Props and HOCs to chainable components. Here's an example using the Context API from React:

```jsx
const { Consumer, Provider } = React.createContext("Default Value");

// Consumer is a Render Prop!

const withConsumer = fromRenderProp(Consumer);

const MyComponent = () =>
  <div>
    {withConsumer.render(value => <span>{value}</span>)}
    <Provider value="Overriden">
      {withConsumer.render(value => <span>{value}</span>)}
    </Provider>
  </div>
``` 

The `withConsumer` chainable's value is the same value that would have been supplied to the `Consumer`'s children prop. Instead of:

```jsx
<Consumer>
  {value => <span>{value}</span>}
</Consumer>
```
we have:
```js
withConsumer.render(value => <span>{value}</span>);
```

These seem quite similar, so why convert a render prop to a chainable component in the first place? The usefulness of chainable components, is that we don't need to provide the view right away. We can store it in a variable, return it from a function, transform the value inside or even _compose_ them with other chainables!

## map

Map allows us to transform the value inside of a chainable:

```js
const five = ChainableComponent.of('five');

const length = five.map(str => str.length);
```

`length` is now a chainable component containing the number value, `4`.

## chain

We can compose chainable components with other chainables via the `chain` method.

Let's say we have a chainable component called `withState`, which is equivalent to recompose's `withState`, but converted to a chainable component.
```js
const withTwoCounters = 
  withState(0).chain(outer => 
    withState(13).map(inner => ({
      inner,
      outer
    }))
  )

<div>
  {withTwoCounters.render(({inner, outer}) => (
    <div>
      <div>Outer: {outer.value} <button onClick={() => outer.update(outer.value + 1)}>+</button></div>
      <div>Inner: {inner.value} <button onClick={() => inner.update(inner.value + 1)}>+</button></div>
    </div>
  ))}
</div>
```

The `chain` method is quite similar to `map`, but instead of returning just any value, it returns another chainable component. The difference being that `chain` doesn't simply return a chainable component of a chainable component, but it _composes_ both of the chainables together!

## Do

If you've noticed, our chained anonymous functions are _still_ subject to nesting for every "link" in the chain (although it's much better than with Render Props). Unfortunately, there's nothing that the language affords us to solve this problem (This was also true with Promises, until [aync/await](https://gist.github.com/MaiaVictor/bc0c02b6d1fbc7e3dbae838fb1376c80)).

The static `Do` method can help alleviate this nesting.

```jsx
const withThreeCounters =
  ChainableComponent.Do(
    withState(5),
    (outer) => withState(5 + outer.value),
    (middle, outer) => withState(middle.value * outer.value),
    (inner, middle, outer) => ({outer, inner, middle})
  );

withThreeCounters.render(({outer, inner, middle}) => 
  <div>
    <div>Outer: {outer.value} <button onClick={() => outer.update(outer.value + 1)}>+</button></div>
    <div>Middle: {middle.value} <button onClick={() => middle.update(middle.value + 1)}>+</button></div>
    <div>Inner: {inner.value} <button onClick={() => inner.update(inner.value + 1)}>+</button></div>
  </div>
);
```

`Do` takes care of calling the necessary `chain` and `map` methods, keeping track of the contextual values to pass to our anonymous functions. The last function is passed to `map`, and whatever value is returned will be the ultimate value inside the final chainable.

If you feel that this API seems oddly familiar, that's because it should. This pattern appears often during functional programming, and it's called the [_monad_](https://www.youtube.com/watch?v=9QveBbn7t_c) pattern. Sometimes the "chain" function is called `then` (for promises), and `flatMap` (for arrays), but it's still the same pattern. We chose the name `chain` to be compatible with the [fantasy-land](https://github.com/fantasyland/fantasy-land#monad) specification for functional programming structures. This means that chainable components are compatible with all fantasy-land libraries (most notably, [Ramda](https://ramdajs.com/)).

Utilizing advanced functional patterns gives us some extra composability over plain Render Props and HOCs. In your next project, consider giving [Chainable Components](https://github.com/pfgray/chainable-components) a whirl when writing reusbale React code.
