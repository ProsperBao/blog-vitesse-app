// Simple 1 ------------------------------------
// type HelloWorld = string
// type test = Expect<Equal<HelloWorld, string>>

// Easy 1 ------------------------------------
// interface Todo {
//   title: string
//   description: string
//   completed: boolean
// }
// type MyPick<T, K extends keyof T> = { [P in K]: T[P]}
// type TodoPreview = MyPick<Todo, 'title' | 'completed'>
// const todo: TodoPreview = {
//   title: 'Clean room',
//   completed: false,
// }
// Easy 2 ------------------------------------
// interface Todo {
//   title: string
//   description: string
// }
// type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
//   title: 'Hey',
//   description: 'foobar',
// }
// todo.title = 'Hello' // Error: cannot reassign a readonly property
// todo.description = 'barFoo' // Error: cannot reassign a readonly property
// Easy 3 ------------------------------------
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// type result = TupleToObject<typeof tuple>
// // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
// type TupleToObject<T extends readonly any[]> = {[key in T[number]]: key}
// Easy 4 ------------------------------------
// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]
// type First<T extends any[]> = T extends [infer F, ...any] ? F : never
// type head1 = First<arr1> // expected to be 'a'
// type head2 = First<arr2> // expected to be 3
// Easy 5 ------------------------------------
// type tesla = ['tesla', 'model 3', 'model X', 'model Y']
// type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
// type Length<T extends readonly any[]> = T['length']
// type teslaLength = Length<tesla> // expected 4
// type spaceXLength = Length<spaceX> // expected 5
// Easy 6 ------------------------------------
// type MyExclude<T, U> = T extends U ? never : T
// Easy 7 ------------------------------------
// type X = Promise<string>
// type Y = Promise<{ field: number }>
// type Z = Promise<Promise<{
//   test: string
// }>>
// type RecursionAwaited<T> = T extends Promise<infer U> ? U extends Promise<infer F>? RecursionAwaited<F> : U: T
// type ResultX = RecursionAwaited<X> // ResultX type equals string
// type ResultY = RecursionAwaited<Y> // ResultY type equals { field: number }
// type ResultZ = RecursionAwaited<Z> // ResultY type equals { field: number }
// Easy 8 ------------------------------------
// type A = If<true, 'a', 'b'> // expected to be 'a'
// type B = If<false, 'a', 'b'> // expected to be 'b'
// type If<C extends boolean, T, F> = C extends true ? T : F
// Easy 9 ------------------------------------
// type Result = Concat<[1, 2, 3, 4, 5], [2]> // expected to be [1, 2]
// type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]
// Easy 10 ------------------------------------
// type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'ars'> // expected to be `false`
// type Includes<T extends unknown[], U> = T extends [infer first, ...infer rest] ? U extends first ? true : Includes<rest, U> : false
// Easy 11 ------------------------------------
// type Result = Push<[1, 2], '3'> // [1, 2, '3']
// type Push<T extends unknown[], U> = [...T, U]
// Easy 12 ------------------------------------
// type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
// type Unshift<T extends unknown[], U> = [U, ...T]
// Easy 13 ------------------------------------
// declare function f1(arg: { a: number; b: string }): void
// type T0 = myParameters<() => string> // []
// type T1 = myParameters<(s: string) => void>// [s: string]
// type T2 = myParameters<<T>(arg: T) => T>// [arg: unknown]
// type T3 = myParameters<typeof f1>// [arg: { a: number; b: string; }]
// type T4 = myParameters<any>// unknown[]
// type T5 = myParameters<never> // never
// type T6 = myParameters<string>// never
// type T7 = myParameters<Function>// never
// type myParameters<T extends (...args: any) => any> = T extends (...args: infer U) => any ? U : never
