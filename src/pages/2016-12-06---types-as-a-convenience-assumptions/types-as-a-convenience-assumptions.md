---
title: Types as a convenience, Assumptions
date: "2016-12-16T05:00:54.222Z"
layout: post
draft: false
tags:
  - javascript
  - front end
  - typescript
  - UI
---

## Minimize your assumptions with types.

As developers, we make assumptions every day when we write code.
I assume that a method in that library that I’m using didn’t change when I bumped the dependency’s patch version.
I assume that the data I get back from /api/users is an object, not an array.
I assumed that my wife wanted an honest opinion when she asked “does this look good on me?”
Assumptions are the great flaw of a developer.
Every bug that ever existed was caused by an incorrect assumption from a developer. Types are a way to put our assumptions in code form, where they can be checked statically. We can be explicit about how our APIs should be used. If we try to use our code incorrectly, we’ll be notified immediately, before our code even hits the browser.
Without types
Here’s a simple example of a regular old javascript method:

````js
function pluralize(count, singular, plural){
  if(count === 1){
    return plural;
  } else {
    return singular;
  }
}
````

This method takes a count (a number), a singular phrase (a string) to display when the count is 1, and a plural phrase (a string) to display when the count is not 1. It’s used like:

````js
pluralize(1, "child", "children");   // "child"
````

This works fine without any types included. However, let’s fast forward 3 months (when you’re on the hook to deliver a shiny new feature that was promised a week ago).
You import the pluralize function and you’re pretty sure you remember how it works:

````js
import { pluralize } from './helpers';
pluralize("child", "children", 3);   // "children"
````

You refresh the browser, and see in your ui “3 children” and you assume it’s correct (because 3 is plural, right?). Except this won’t work obviously when passed 1:

````js
pluralize("child", "children", 1);   // "children"
````

This code is especially sinister because it doesn’t even fail loudly.
With types
Let’s try implementing the pluralize function again, but this time, declaring our assumptions with Typescript. Reiterating the purpose of the pluralize function, it should be a:
method that takes a count (a number), a singular phrase (a string) to display when the count is 1, and a plural phrase (a string) to display when the count is not 1.
Notice the words in bold. Those are the types of variables that we assume this function will be passed. Let’s add those in along with the definition of the function:

````js
function pluralize(count: number, singular: string, plural: string){
  if(count === 1){
    return plural;
  } else {
    return singular;
  }
}
````

Notice that aside from the type ascriptions for each parameter, this looks just like regular Javascript.
Now, if we try to use this function incorrectly (even 5 months later when we forget how we wrote it), we’ll get a compiler error letting us know that our assumptions are wrong:

````js
pluralize("child", "children", 1);
// Argument of type '"child"' is not assignable
//   to parameter of type 'number'
````

The Typescript compiler is telling us we’re trying to use “child” where it expects a number. This jogs our memory, and we remember that the count comes first, so we correct our mistake, and thank the fact that we’re using types that we didn’t ship a product that lets users have “1 children.”

## Minimizing Assumptions
In this example, we were the ones using our own api. Chances are, you’ll have a better memory of your own code (although it’s quite common to not remember code you wrote just last month!), but the example still holds when you’re designing an api, or when you’re using an api designed by someone else.
Let types check your assumptions, so you can worry about other things.
