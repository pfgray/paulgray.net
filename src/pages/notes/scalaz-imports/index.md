---
title:  Scalaz Imports
subtitle: those imports you always need but can never remember.
date: "2018-08-30T00:00:00.000Z"
layout: note
draft: false
tags:
  - scala
  - scalaz
---

##Patterns

Typeclasses for std library classes are usually located in:

```scala
import scalaz.std._
```

Enrichment methods for typeclasses are usually located in:

```scala
import scalaz.syntax._
```




## Equals

import `EqualOps` with:

```scala
import scalaz.syntax.equal._
```

    1 === 1
    2 =/= 1
    
In order to use the `===` with two variables of type `T`, you must have an instance of `Equal[T]`

import individual `Equal` typeclasses with:

```scala
import scalaz.std.anyVal._
import scalaz.std.option._
```
the `anyVal._` contains a `Equal[Any]` and the `option._` contains a `Equal[Option[A]]` for any `A` that also has a `Equal[A]`

## Disjunction
```scala
1.right
"Error".left
```

import with:  

```scala
import scalaz.syntax.either._
```

## Semigroup

```scala
import scalaz.syntax.semigroup._
```