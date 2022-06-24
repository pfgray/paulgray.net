

type Foo = Required<number>

export type RequireAll<T> = 
  T extends {} ? { [P in keyof T]: RequireAll<T[P]> } : Exclude<T, null> 


  