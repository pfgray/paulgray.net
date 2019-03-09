---
title: Render Props; Not Dead Yet!
subtitle: Render props still have a purpose in post-hooks react.
date: "2019-02-25T00:00:00.000Z"
layout: post
draft: false
tags:
  - javascript
  - react
  - hooks
  - render props
  - functional programming
---

There's been a lot of discussion around the newly released hooks, with a lot of people implying that they flat out replace render props. While a lot of render props can be replaced by hooks, there's still one thing that render props can do that hooks can't.

> Render props can "take over" the rendering of your component and render something else under certain conditions

This might sound scary, but it enables very powerful abstractions.

For example, suppose I have the need to implement a page where admins can come and view all the users in a system. This page must:

1. Show a login screen if the user is not authenticated, otherwise produce an auth token.
2. Show a loading screen while we’re loading the current user's info, eventually providing the loaded user object.
3. Show an error screen if there was an error fetching the user.
4. Show an 'access denied' screen if the current user isn't an admin.
5. Show a loading screen while the users list is loading, eventually providing the loaded users list.
6. Show an error screen if there was an error fetching the users list.
7. Show the list of users.

We can build a render prop that handles all of the login, loading, and error screens, allowing us to simply define the view for the list of users.

We'd use it like:

```jsx
<WithAdminUsersList>
  {users => (
    <div>
      {users.map(u => u.username}
    </div>
  )}
</WithAdminUsersList>
```

`<WithAdminUsersList>` will handle cases #1, #2, #3, #4, #5, and #6, only calling our supplied render function if all the conditions are met.

How did we build `<WithAdminUsersList>`? This seems like a very specialized render prop that we'd likely only use once in our app. It's merely a composition of other, generalized render props.

#### #1: `WithLogin`

`WithLogin` will render a login screen if a user isn't logged in. Otherwise, it will supply the API token associated with the session.

```jsx
function WithLogin({ children }) {
  const token = ls.get("token");
  if (token) {
    return children(token);
  } else {
    return <LoginScreen />;
  }
}
```

#### #2 `WithPromise`

`WithPromise` takes a function that returns a promise and waits for it to resolve, handling loading or error screens:

```jsx
function WithPromise({ fetch, children }) {
  const [request, setRequest] = useState({ loading: true });
  useEffect(() => {
    fetch()
      .then(d => {
        setRequest({ data: d });
      })
      .catch(error => {
        setRequest({ error });
      });
  }, [fetch]);
  if (!request.loading && !request.error) {
    return children(request.data);
  } else if (request.error) {
    return <div>We encountered an error...</div>;
  } else {
    return <div>Loading...</div>;
  }
}
```

#### #3: `WithCurrentUser`

`WithCurrentUser` is itself, a composition of `WithLogin` and `WithPromise`:

```jsx
export function WithCurrentUser({ children }) {
  return (
    <WithLogin>
      {token => (
        <WithPromise fetch={() => getCurrentUser(token)}>
          {user => children([user, token])}
        </WithPromise>
      )}
    </WithLogin>
  );
}
```

#### #4: `WithAdmin`

`WithAdmin` takes a user and renders an “access denied” page if they’re not an admin.

```jsx
export function WithAdmin({ user, children }) {
  return user.role === "admin" ? (
    children()
  ) : (
    <div>Access denied, you're not allowed here!</div>
  );
}
```

And finally, `WithAdminUsersList` is just a composition of `WithCurrentUser`, `WithAdmin`, and `WithPromise`

```jsx
export function WithAdminUsersList({ children }) {
  return (
    <WithCurrentUser>
      {([user, token]) => (
        <WithAdmin user={user}>
          {() => (
            <WithPromise fetch={() => getAllUsers(token)}>
              {userList => children(userList)}
            </WithPromise>
          )}
        </WithAdmin>
      )}
    </WithCurrentUser>
  );
}
```

Now we are free to just define the view for the users list, and we don’t have to repeat the same logic that we’ll use constantly elsewhere in our app.

Here's a [code sandbox](https://codesandbox.io/s/qv0l6mm05w) with an example of these render props.

Using these building block render props and others like them, we can quickly build out complex user interfaces by composing smaller, focused render props. The only difference between these render props and hooks is that render props can optionally “short-circuit” the render chain, and return early with a different view. You can’t do this with hooks due to the [rules of hooks](https://reactjs.org/docs/hooks-rules.html). Does this mean hooks are bad? No! In fact, hooks make writing render props even easier! Previously, in order to write a render prop that used state or any of the lifecycle methods, you’d have to write a class. Now you can simply use the corresponding hooks.

In terms of choosing between hooks and render props, I think it makes the most sense to:

> Use a Render prop when you need to optionally render something, and use hooks for everything else.

Composing render props still sucks (it's pretty verbose). Also, if you want to compose a hook with a render prop, you'll have to make a render prop. Easier composition was my motivation for writing [chainable-components](https://github.com/pfgray/chainable-components), which gives render props, hooks, and HOCs one common, composeable, API based on functional programming patterns.
