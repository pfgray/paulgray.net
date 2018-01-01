
#Scalaz imports

##Patterns

Typeclasses for std library classes are usually located in:

```
import scalaz.std._
```


Enrichment methods for typeclasses are usually located in:

```
import scalaz.syntax._
```




## Equals

import `EqualOps` with:

```
import scalaz.syntax.equal._
```

    1 === 1
    2 =/= 1
    
In order to use the `===` with two variables of type `T`, you must have an instance of `Equal[T]`

import individual `Equal` typeclasses with:

```
import scalaz.std.anyVal._
import scalaz.std.option._
```
the `anyVal._` contains a `Equal[Any]` and the `option._` contains a `Equal[Option[A]]` for any `A` that also has a `Equal[A]`

## Disjunction
```
1.right
"Error".left
```

import with:  

```
import scalaz.syntax.either._
```

## Semigroup

```
import scalaz.syntax.semigroup._
```