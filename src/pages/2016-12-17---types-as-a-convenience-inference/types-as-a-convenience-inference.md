---
title: Types as a convenience, Inference.
subtitle: Type-safe doesn’t mean verbose.
date: "2016-12-16T00:00:00.000Z"
layout: post
draft: false
tags:
  - javascript
  - front end
  - typescript
  - UI
---

Type-safe doesn’t mean verbose.

A common criticism of typed languages is that they are unnecessarily verbose. While that idea may have some merit with languages like Java, features in newer typed languages have come a long way. The Typescript compiler uses a method known as type inference to make type-safe code less cluttered.
Type inference occurs when the compiler can determine a type automatically just from the context that it appears in.

For example, take this variable declaration:

````js
const size = "Paul".length
````

length is a property on strings which holds the length of the string as a number. It will always return a number, and because of that fact, the compiler can infer that size is a number. We don’t have to explicitly declare the type.
This is beneficial because it is less verbose. It doesn’t take away from the meaning of the code, while still checking our assumptions.
Type inference occurs in a variety of places. Let’s consider the method map which is defined for all arrays. Map takes a function, applies each item in the array to that function, and then returns a new array with the transformed values.
Imagine we have an array of strings:

````js
const strs = ["one", "two", "three"]
````

Suppose we wanted to call .map on this array. What kind of function would we need to provide? We'd need a function that takes a string and returns something.

Typescript is smart enough to know that when you pass an anonymous function to .map on an array of strings, the first parameter to that anonymous function will be a string.
````js
strs.map(str => str.length)
````
Inside the anonymous function, str is a string. This means we're free to access any of the properties from the string prototype.

What is the type of this entire expression? In other words, if we were to assign a variable to this value, what would the type of that variable be?
````js
const lengths = strs.map(str => str.length)
````
Remember that map returns a new array with the results from the supplied function.

Since the anonymous function we supplied returns a value of type number, the type of lengths is an array of numbers.

Suppose further down in our code we wanted to compute the sum of all the lengths of our strings. We might use a function like reduce to combine all the lengths:

````js
lengths.reduce((sum, cur) => sum + cur, 0)
````
Here, we start with the value 0 and add each length in our array to it, effectively summing all the values. Notice how inside of the function, sum & cur are both numbers.
What is the type of this expression? Let’s assign it to a variable:
````js
const sum = lengths.reduce((sum, cur) => sum + cur, 0)
````
The type of sum is number. We didn’t have to annotate that fact, since the typescript compiler was able to infer it again.

Let's review the snippet of code we've written so far:
````js
const strs = ["one", "two", "three"];
const lengths = strs.map(str => str.length);
// ...
const sum = lengths.reduce((sum, cur) => sum + cur, 0)
````
Notice anything particular about this piece of code? There are no type annotations. This looks like valid JavaScript code (and it is). In fact, this is also valid Typescript code.

Let’s imagine that 6 months from now, the strs array becomes an array of numbers (maybe it’s more efficient to pre-calculate lengths before passing it to this snippet). As soon as that change is made, we’re notified of the error here, since .length is not a property on numbers. We got this type safety without doing anything extra. As far as anyone is concerned, we were writing plain old JavaScript.

With any tool, it’s usefulness is diminished if it’s clunky to use. Type inference offers type safety while keeping the clutter at a minimum.
