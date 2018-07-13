---
title: Typing HoCs
subtitle: Writing type signatures for Higher Order Components
date: "2018-07-13T00:00:00.000Z"
layout: post
draft: false
tags:
  - javascript
  - typescript
  - higher order components
  - react
---

The process of writing a type signature for a HoC can be daunting at first. In this post, I’ll build an HoC and detail the process of writing a type signature for it. 

The HoC we’ll develop will be simple; it’ll take a promise, and handle the state-management, providing the inner component with the value, and whether it is loading or not. The usage will look like:

```jsx
const UserProfile = ({loading, user}) =>
  loading ? (
    <div>loading...</div>
  ) : (
    <div>{user.name}: {user.age}</div>
  );

withPromise(() => fetchUser())(UserProfile)
```


Often times when writing a type signature for a function, it's useful to say out loud what the function is designed to do at a high level. In this instance, `withPromise` is a function that takes a function which returns a promise, and it itself returns another function which takes a component and returns another component (re-read that sentence a few times if you need to).

## Curried functions
Higher order component functions are often _curried_, meaning the arguments are applied in separate argument lists. This is a fancy term, but mostly just means that we invoke them like:
```js
withPromise(() => fetchUser())(UserProfile)
```
as opposed to:
```js
withPromise(() => fetchUser(), UserProfile)
```

Let’s split up the usage so we can tackle each step separately.
```js
const withPromiseHoc = withPromise(() => fetchUser())
```
`withPromise` is just a function that returns an hoc (which we’ll worry about typing later). It takes a function which returns a promise. This gives us something to start with:

```js
function withPromise(f: () => Promise<any>): ???
```
`withPromise` returns a function that takes a component and returns another component, The type of that function is: `(c: ComponentType<any>) => ComponentType<any>`. 
_`ComponentType<A>` is a React-specific type that describes any component (sfc or class), where `A` is the type of the props it expects_ 
We can simply replace the `???` with this type:

```js
function withPromise(f: () => Promise<any>): 
  (c: ComponentType<any>) => ComponentType<any> {...}
```

Now we’re getting somewhere!

### Generic Type Parameters
You’ve probably noticed that we’re using the `any` type frequently. You’ve probably heard that this isn’t desirable, and I’ll show you why.

Let’s go back to our original example, where we have a component that renders a user:
```jsx
const UserProfile = ({loading, user}) =>
  loading ? (
    <div>loading...</div>
  ) : (
    <div>{user.name}: {user.age}</div>
  );
```
The `user` parameter has `name` and `age` properties. Let’s suppose we’re using it like:
```js
withPromise(() => fetchUser())(UserProfile)
```
Where `fetchUser` returns a `Promise` of a user, which has the `name` and `age` attributes.

Now let’s suppose a colleague has come along and refactored `fetchUser` to not only fetch a user, but also their preferences. Instead of returning a user, it now returns an object with shape: 
```json
{
  user: {
    name: 'paul'
    age: 29
  },
  preferences: {
    lang: 'en-US'
  }
}
```
Since we’re using `any`, Typescript can’t make any assumptions about the type of object coming from `fetchUser()`. Even though our `UserProfile` expects users, typescript won’t complain, and our colleague will go on thinking that they haven’t broken anything with their change.

To guard ourselves against this pitfall, we can use a type parameter to align the return type of the promise with the prop types of the inner component. You can name these however you want, but a common pattern is to use a single uppercase character:
```js
type WithPromiseContext<A> = {
  loading: boolean,
  value: A
};

function withPromise<A>(f: () => Promise<A>): 
  (c: ComponentType<WithPromiseContext<A>>) 
    => ComponentType<any> {...}
```
Notice how the `A` is used in both the type of the promise _and_ the wrapped component.
The `WithPromiseContext<A>` is just a type that defines the props that the inner component will receive.

## Passing Props Through
You may have noticed that our HoC still returns a type of `ComponentType<any>`. We haven’t defined what props the wrapped component takes. This can get tricky, since the props of the wrapped component won’t necessarily be the same as the inner component. In fact, in our usage, the wrapped component doesn’t have any props! This makes sense if we consider the usage:

```jsx
const UserProfile = ({loading, user}) =>
  loading ? (
    <div>loading...</div>
  ) : (
    <div>{user.name}: {user.age}</div>
  );

const WrappedProfile = withPromise(() => fetchUser())(UserProfile)

...
<WrappedProfile />
```
`WrappedProfile` doesn’t take any props, so its type is `ComponentType<{}>`. This won’t be the case for every usage, so let’s tweak our example a bit.

Let’s add a prop to `UserProfile` which isn’t supplied by `withPromise` . This prop will be a boolean that switches on a “dark” css theme:
```jsx
type UserProfileProps = {
  loading: boolean,
  user: {name: string, age: number},
  dark: boolean
}

const UserProfile: ComponentType<UserProfileProps> = ({loading, user, dark}) =>
  loading ? (
    <div>loading...</div>
  ) : (
    <div className={dark ? 'dark' : 'light'}>{user.name}: {user.age}</div>
  );
```

Most HoCs pass on props they receive, so let’s assume `withPromise` does. In this case, we’ll want the wrapped component to indicate it needs to be supplied a `dark` prop, but _not_ the `loading` and `user` props, since they’ll be supplied by `withPromise`. The usage will look like:

```jsx
const WrappedComponent = withPromise(() => fetchUser())(UserProfile)

...
<WrappedComponent dark={true} />
```

`WrappedComponent`’s type is therefore `ComponentType<{dark: boolean}>`. 
The tricky thing to remember is that `withPromise` can use a component with any number of other props! What we need is a way to say that _the props of the wrapped component should contain all the props of the inner component, minus the ‘loading’ and ‘user’ props_.  

Thanks to the work that has gone on in [this](https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046) GitHub issue, we can realize a type which does this generically!
```js
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

This type takes any two types (such that the second extends the first) and returns another type that includes everything in the first, that isn’t in the second.

We just need to add another type parameter which will indicate the props of the inner component: 
```js
function withPromise<A, B>(f: () => Promise<A>):
  (c: ComponentType<WithPromiseContext<B>>) 
    => ComponentType<any> {...}
```

However, `B` still needs the `loading` and `dark` props from `WithPromiseContext<A>`, so we add that constraint to `B`:
```js
function withPromise<A, B extends WithPromiseContext<A>>
  (f: () => Promise<A>): 
    (c: ComponentType<WithPromiseContext<B>>) 
      => ComponentType<any> {...}
```

Ok, so now that we have a type  `B` which has everything in `WithPromiseContext<A>` , and potentially more, we need to specify that the returned wrapped component’s props should have everything in `B` which is not in `WithPromiseContext<A>`. This is where `Omit` becomes handy. This type we’re looking for can be expressed as: `Omit<B, keyof WithPromiseContext<A>>`. This is the type of the props expected for the returned wrapped component, so let’s add it to the signature:
```js
function withPromise<A, B extends WithPromiseContext<A>>
  (f: () => Promise<A>):
    (c: ComponentType<WithPromiseContext<B>>) 
      => ComponentType<Omit<B, keyof WithPromiseContext<A>>> {...}
```

Now when we use  `withPromise` with our updated component, the type of the returned component will include the props that aren’t supplied via `withPromise`:  

```jsx
const WrappedUserProfile = withPromise<User, UserProfileProps>(getUser)(UserProfile)

...
<WrappedUserProfile /> // fails since it doesn't have a "dark" prop
<WrappedUserProfile dark="true"/> // fails since "dark" is not a boolean
<WrappedUserProfile dark={true}/> // succeeds
```

## Inferring Wrapped Type props
You may have noticed that when you use `withPromise` to wrap a component that has additional props, you must specify the type parameters:

```js
withPromise<User, UserProfileProps>(getUser)(UserProfile)
```

If you don’t specify them ahead of time, you’ll get an error:
```js
withPromise(getUser)(UserProfile)

// fails with:
// Property 'dark' is missing in type: 'WithPromiseContext<User>'
```

This has to do with the fact that `withPromise` is curried. Typescript first examines the expression:
```js
withPromise(getUser)
``` 
to determine its type. Since we didn’t include any type parameters, Typescript has to make a guess at what the types are. There’s simply no way for Typescript to know the prop types of the inner component, since we haven’t supplied it yet. The only thing that Typescript knows for sure is that `B` will at least have all the props in `WithPromiseContext<A>`, so it simply uses the type `WithPromiseContext<A>`.
It’s easier to see if the curried invocation is split up:
```js
const withUserHoc = withPromise(getUser)

// here, withUserHoc doesn't have the inner component's props type,
//   so it sticks with 'WithPromiseContext<A>'

withUserHoc(UserProfile) // UserProfile has an extra "dark" property, which isn't in 'WithPromiseContext<A>', so we get an error
```

We’d like for Typescript to _infer_ the props of the wrapped component. To fix this, we’ll need to delay the resolution of the second type parameter until the last argument list is provided.

To aid with clarity, we’ll come up with a type definition, specifically for an HoC which can remove props from decorated components. Let’s call it `InferableHOC`:

```js
interface InferableHOC<ProvidedProps> {
  <B extends ProvidedProps>(
    c: React.ComponentType<B>
  ): React.ComponentType<Omit<B, keyof ProvidedProps>>
}
```
 
_In Typescript, if we want to declare the type of a function that has a type parameter, we must use an interface with a single method._

The `InferableHOC` takes a component with props `A`,  and returns a component with props that are in `A` that are not in `ProvidedProps`. `ProvidedProps` represents the props that are provided via our HoC.

Since `B` now solely exists in the `InferableHOC` type, we remove it from the signature of `withPromise`:

```js
function withPromise<A>(f: () => Promise<A>):
  InferableHOC<WithPromiseContext<A>> { ... }
```

Now we can have typescript automatically infer the types for us, without having to specify the props manually:

```js
const WrappedUserProfile = withPromise(getUser)(UserProfile)

...
<WrappedUserProfile /> // fails since it doesn't have a "dark" prop
<WrappedUserProfile dark="true"/> // fails since "dark" is not a boolean
<WrappedUserProfile dark={true}/> // succeeds
```

Of course, you could just ignore all this headache and write render props, which are far easier to write type signatures for :D

_Special thanks to the smart people writing the [recompose type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/recompose)!_

