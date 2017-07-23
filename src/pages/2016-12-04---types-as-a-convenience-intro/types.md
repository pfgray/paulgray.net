---
title: Types as a convenience, Intro.
subtitle: Bringing types to your UI.
date: "2016-11-04T00:00:00.000Z"
layout: post
draft: false
tags:
  - javascript
  - front end
  - typescript
---

## Bringing types to your UI.

As a developer with experience in both type safe and weakly typed languages, I much prefer the former, simply because I enjoy it more.

In a series of following blog posts, I’ll attempt to make an argument for types, and make some recommendations of where I think they bring the most benefit. If you’re already sold on type safety, you may find these discussions to reiterate things you’ve already found to be true. If you’re a Javascript/Ruby developer who has nightmares of Java when someone mentions “types,” don’t worry; types can be a lot more fun than writing code in Java. They include many affordances for developers that makes their lives easier.

The examples in this series will use Typescript, but all of these examples extend to any typed language. Typescript doesn’t quite have all the features of a language like Haskell or Scala, but it’s simple enough that most Javascript developers can quickly become accustomed to it’s syntax. As a bonus, Typescript can be compiled to Javascript, so we can use it to create a front-end app.

I’ll start out with a few high level examples, and then I’ll get into some specifics about how types can make developing with Redux & React much nicer.

My hope is that after reading this, you’ll find a new and stronger appreciation for static types, and you’ll even be excited to try some of these examples out on your own.
Next up: Assumptions
