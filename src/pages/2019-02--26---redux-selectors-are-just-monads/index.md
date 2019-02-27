---
title: Redux Selectors are Monads
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

Redux selectors are functors, applicatives, and monads. Why does this matter? Well, if we can express our selectors as these three fp patterns, we can leverage a whole suite of reusable code for free!

Prerequisites: typescript, generics, hofs

# The shape of a selector

Redux selectors are functions from state to some other value. This can be expressed in a type like so:

```ts
type Selector<A> = (state: AppState) => A;
```

Where `State` is the type of our app state and `A` is the type of value we're selecting out of the state. So, for example, a `Selector<User>` would represent a function that takes `AppState` as it's parameter, and returns a `User`. A `Selector<Post[]>` represents a function that takes in `AppState` and returns a list of `POST`s.

For example:

```
const selectCurrentUser: Selector<User> = state => state.currentUser

const selectPosts: Selector<Post[]> = state => state.posts;
```

We can think of `Selector<A>` as a kind of "wrapper" around the `A` value, where in order to get that value, we need to pass in an `AppState`.

## What's a functor, applicative and monad?

If a class is a type of object, functors, applicatives, and monads are all _types of classes_. If you think of a class as a type of object, a Functor is a type of class. How do we know if a class is a Functor?

## Selectors are Functors

All functors are generic, and have a function called `.map` which takes a function that takes the generic value and returns a different value, thus "changing" the value inside.

So, in order for `Selector<A>` to be a functor, it must have a method `map` which takes a function from `A` to something else, let's say `B`, and return a `Selector<B>`. We can define this function free-standing, instead of defining it on the `Selector` type itself: this just means we'll invoke it like `map(selectPosts, posts => ...)` instead of `selectPosts.map(posts => ...)`

```
function map<A, B>(selector: Selector<A>, mapper: (a: A) => B): Selector<B> {
...
}
```

In this signature, we're taking a selector that returns some value `A`, and a function from `A => B` (that is, a function that takes `A` and returns `B`, and we're returning a brand new selector that selects a `B`. Take some time to try and implement this function (You'll probably learn something in the process)! If you get stuck, come back and look at an example usage for some inspiration.

The key is that mapping over a selector just applies the selected function on the result of the selector.

What does this mean in practice? Well let's say we had a selector that selects the recent posts out of the app state: `const postSelector: Selector<Posts[]> = state => state.posts`
Suppose that we wanted a new selector, which only selected the count of all posts. We _could_ create a new selector:
`const postCountSelector: Selector<number> = state => state.posts.length`. This would duplicate the logic for getting the posts out of state (a trivial example, for simplicity's sake).
Instead, we could reuse the `postsSelector`, and map over the result of that selector, returning just the size of the posts array:

```
const postCountSelector = map(postsSelector, posts => posts.length)
```

See the second parameter to `map`? That's the callback function that takes the result of the `postsSelector` and returns something else, thus changing or 'mapping' the value inside. We had a `Selector<Post[]>` and we mapped that into a `Selector<number>`

If you tilt your head and squint,

-Functors have `.map`, which allows you change he value 'inside'.
-Applicative Functors have `.mapN` which allows you to map over multiple values at the same time.
-Monads have `.chain` which allows you to compose them in sequence.
