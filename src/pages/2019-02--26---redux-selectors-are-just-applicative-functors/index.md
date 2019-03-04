---
title: Redux Selectors are just Applicative Functors
subtitle: What that means and why it matters.
date: "2019-02-25T00:00:00.000Z"
layout: post
draft: true
tags:
  - javascript
  - redux
  - functors
  - monads
  - functional programming
---

Redux selectors are functors, applicative functors, and monads. Why does this matter? If we can express our selectors as these patterns in a standardized way (wrt the [static-land](https://github.com/rpominov/static-land) standard), we can leverage a whole suite of reusable code for free (from the [fp-ts](https://github.com/gcanti/fp-ts) library), replacing some of the specialized code from reselect!

Prerequisites: [_**typescript**_](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html), [_**generics**_](https://www.typescriptlang.org/docs/handbook/generics.html), and [_**higher order functions**_](https://en.wikipedia.org/wiki/Higher-order_function#JavaScript).

## The shape of a selector

Redux selectors are functions from state to some other value. This can be expressed in a type like so:

```typescript
type Selector<State, A> = (state: State) => A;
```

Where `State` is the type of our app state and `A` is the type of value we're selecting out of the state. So, for example, a `Selector<AppState User>` would represent a function that takes `AppState` as it's parameter, and returns a `User`. A `Selector<AppState, Post[]>` represents a function that takes in `AppState` and returns a list of `Post`s.

For example:

```typescript
type AppState = { currentUser: User; posts: Post[] };

const selectCurrentUser: Selector<AppState, User> =
  state => state.currentUser;

const selectPosts: Selector<AppState, Post[]> =
  state => state.posts;
```

We can think of `Selector<AppState, A>` as a kind of "wrapper" around the `A` value, where in order to get that value, we need to pass in an object of `AppState`.

## Selectors are Functors

All functors are _generic_ (which means they have a type parameter), and have a function called `map` which takes a function that takes the generic value and returns a different value, thus "changing" or "mapping" the type of the generic value.

So, in order for `Selector<State, A>` to be a functor, it must have a method `map` which takes a function from `A` to something else (`B`), and returns a `Selector<B>`. We can define this function as a free-standing static function, instead of defining it on the `Selector` type itself: this just means we'll invoke it like `map(selectPosts, posts => ...)` instead of `selectPosts.map(posts => ...)`

```typescript
function map<State, A, B>(
  selector: Selector<State, A>,
  mapper: (a: A) => B
): Selector<B> {
  ...
}
```

This function takes a selector that selects an `A` and a function from `A => B` (a to b), and returns a selector that selects a `B`. This function must work for any type of state, any type of `A` and any type of `B`. Take some time to try and implement this function (You'll likely learn something in the process)! If you get stuck, come back and look at an example usage for some inspiration. If you're still stuck, scroll down to the "typeclasses" section to see the implementation. _Hint: start with what you have to return, and work backwards from there._

The key is to remember that mapping over a selector just applies the selected function on the result of the selector.

> Side track:
> Why did we define `map` as a plain static method? why not have a `Selector` class where each instance has a `.map` method?
>
> Functionally, there is no difference between:
>
> ```typescript
> map(postsSelector, posts => posts.length);
> ```
> and
> ```typescript
> postsSelector.map(posts => posts.length);
> ```
>
> Both of these are viable ways of expressing a 'functor'. In fact, the second example is how **fantasy-land** specifies how a functor should behave.
>
> **static-land** is an alternative standard to fantasy-land which prefers the first form. One benefit to this approach is that you can define functors and applicatives for types that you don't own.

Where would this `map` function be useful in practice? Consider if we had a selector that selects the recent posts out of the app state:

```typescript
const postSelector: Selector<AppState, Posts[]> = state => state.posts
```

Suppose that we wanted a new selector, which only selected the count of all posts. We _could_ create a new selector:

```typescript
const postCountSelector: Selector<number> = state => state.posts.length
```

This would duplicate the logic for getting the posts out of state (a trivial example, for simplicity). Instead, we could reuse the `postsSelector`, and map over the result of that selector, returning just the size of the posts array:

```typescript
const postCountSelector = map(postsSelector, posts => posts.length);
```

See the second parameter to `map`? That's the callback function that takes the result of the `postsSelector` and returns something else, thus 'mapping' the value inside. We had a `Selector<..., Post[]>` and we mapped that into a `Selector<.., number>`.

## Selectors are Applicatives

> The term 'applicative functor' is often shorthanded to 'applicative.' Both mean the same thing.

An Applicative has a method called `ap` which takes a wrapped value `A` and a _wrapped_ function `A => B`, and returns a `B`. It's very similar to `map`, except that the callback function you pass is _itself_ wrapped in the wrapper type. For our `Selector` type, this looks like:

```typescript
function ap<State, A, B>(
  aSelector: Selector<State, A>,
  abSelector: Selector<State, (a: A) => B>
): Selector<B> {
  ...
}
```

Think on this for a little bit: It takes two wrappers, `Selector<..., A>` and `Selector<..., A => B>` but yet only returns one `Selector<..., B>`. So this `ap` function must include a way to _compose_ selectors! With that information, try to implement this `ap` function which combines two selectors. Remember, start with the return type and work backwards from there. I'll include the correct implementation at the end, in case you get stuck.

How are applicatives useful? Using the `ap` and `map` methods, we can derive another method that maps over two wrappers of anything simultaneously,  For example, given a wrapper type (`Wrapper`), we can make a method `combine2` which takes two wrappers, `Wrapper<A>` and `Wrapper<B>`, and _composes_ them into a `Wrapper<[A, B]>` ("Wrapper" here, just refers to any applicative type, it could be `Option`, `List`, or even our `Selector`). 

For selectors, this would look like:
```typescript
function combine2<State, A, B>(
  aSelector: Selector<State, A>,
  bSelector: Selector<State, B>
): Selector<State, [A, B]> {
  ...
}
```

> Hard:  
> Try to implement `combine2` using only our `ap` and `map` functions we built above.

This same strategy can be used to implement `combine3`, `combine4`, etc, all the way to `combineN`. The fp-ts library provides this `combineN` function for us for free (we just need to implement `ap` and `map`! This function is called `sequenceT`, and you'd use it like:

```typescript
import { sequenceT } from "fp-ts/lib/Apply";

const abcSelector: Selector<State, [A, B, C]> =
  sequenceT(...)(aSelector, bSelector, cSelector)
```

`aSelector`, `bSelector` and `cSelector` are all _composed_ into `abcSelector`! I'll explain the `...` further down.

It turns out this pattern is incredibly powerful, and **you have undoubtedly already used this without knowing it.** Consider `Promise.all`. what does it's signature look like? It takes a unbound list of promises, and returns promise of a list, thus "_composing_" all the promises in the list:

```typescript
const abcPromise = Promise.all([aPromise, bPromise, cPromise])
```

can you see the resemblance to our selector example?

```typescript
const abcSelector = sequenceT(...)(aSelector, bSelector, cSelector)
```

The main difference is that `Promise.all` is specialized for promises, but `sequenceT` works for _all_ applicatives!

## Typeclasses

In fp-ts, a type is considered an applicative if a static instance of the `Applicative` interface exists for that type. Instead of having a class implement an interface, you implement all of the methods on a separate object. For our `Selector` type, this looks like:

```typescript
type Selector<State, A> = (s: State) => A;
export const URI = "Selector";

export const selector: Applicative2<URI> = {
  URI,
  of<State, A>(a: A) {
    return () => a;
  },
  map<State, A, B>(aSelector: Selector<State, A>, ab: (a: A) => B) {
    return (state: State) => {
      const a = aSelector(state);
      const b = ab(a);
      return b;
    };
  },
  ap<State, A, B>(
    abSelector: Selector<State, (a: A) => B>,
    aSelector: Selector<State, A>
  ): Selector<State, B> {
    return (state: State) => {
      const ab = abSelector(state);
      const a = aSelector(state);
      return ab(a);
    };
  }
};
```

The `selector` constant is an instance of the `Applicative` typeclass, but it's completely divorced from our `Selector` type itself; this makes it a "typeclass." While this is a bit more clumsy/verbose than the dot notation you're probably used to (i.e. `foo.bar()`), it has one major benefit; you can define a typeclass for _any_ type, even types that come from a completely different package, including the standard library types (looking at you, promises)! This means that if a library doesn't specify the functor or applicative behavior for their type, you can simply define it on a typeclass, instead of having to wrap the type in another class. 

Since we have access to this `selector` typeclass, this means we can consider our `Selector` class as an applicative. Whenever a function needs to work for any applicative they simply take an instance of an applicative typeclass, `sequenceT` is an example of such a function, and so if we want to use it with our `Selector` type, we just supply the `selector` typeclass value (filling in the "..." from before):

```typescript
const abcSelector = sequenceT(selector)(aSelector, bSelector, cSelector)
```

This works for _any_ applicative, consider the need to compose many optional values into one optional value. We can just use the `option` typeclass provided by fp-ts:

```typescript
import { option } from 'fp-ts/lib/Option'

const abcOption = sequenceT(option)(aOption, bOption, cOption)
```

## createSelector from reselect is just map + sequenceT

Consider the shape of the `createSelector` method that reselect provides:

```javascript
createSelector(
  aSelector,
  bSelector,
  cSelector,
  ([a, b, c]) => {
    ...
  }
)
```

It takes `n` selectors and allows you to _compose_ them, finally providing you with a function to map the selected values into the value returned from a new selector.

This pattern can be emulated using the `sequenceT` method from fp-ts and the `map` function we implemented above: 

```typescript
const mapped = selector.map(
  sequenceT(selector)(
    aSelector,
    bSelector,
    cSelector
  ),
  ([a, b, c]) => {
    ...
  }
);
```
_Remember: `selector` is an instance of our typeclass, not an actual instance of a selector_. _Also note that in the fp-ts example, `a`, `b`, and `c`'s types are properly inferred_.

The reselect version is less characters, but it's implemented specifically for selectors. In the fp-ts example, it was provided for us for free! We just needed to describe how two selectors are combined, and the library takes care of the rest for us.

It can be hard at first to see these patterns in code you're using and writing. The only advice I can give is to learn as many examples of functors, applicatives, and monads that you can. Don't just read materials, bust out an editor, where you can quickly try out these concepts and verify what you're reading. I'm sure you'd be surprised how quickly you can gain an intuition.

One of the biggest benefits that comes from recognizing these patterns is that you might simply find new ways to use your types. For example, if you were only exposed to the reselect library, you might now know that you can turn an array of selectors into a selector of array. If you had an intuition around applicatives, this becomes easier to recognize. 

#### _Notes_:

Here's the implementation for `combine2`:

```typescript
function combine2<State, A, B>(
  aSelector: Selector<State, A>,
  bSelector: Selector<State, B>
): Selector<State, [A, B]> {

  const aToAbSelector: Selector<State, (a: A) => [A, B]> =
    map(bSelector, b => (a: A) => ([a, b]))

  return ap(aSelector, aToAbSelector);
}
```

You have a `Selector<..., A>`, and a `Selector<..., B>`, and you need to return a `Selector<State, [A, B]>` using only `ap` and `map`. In order to use `ap`, we need a `Selector` that selects a function.