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
// Middle 1 ------------------------------------
// const fn = (v: boolean) => {
//   if (v)
//     return 1
//   else
//     return 2
// }
// type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
// type MyReturnType<T extends Function> = T extends (...args: any) => infer R ? R : never
// Middle 2 ------------------------------------
// interface Todo {
//   title: string
//   description: string
//   completed: boolean
// }
// type TodoPreview = MyOmit<Todo, 'description' | 'title'>
// const todo: TodoPreview = {
//   completed: false,
// }
// type MyExclude<T, U> = T extends U ? never : T
// type MyOmit<T, K extends keyof T> = { [P in MyExclude<keyof T, K>]: T[P] }
// Middle 3 ------------------------------------
// interface Todo {
//   title: string
//   description: string
//   completed: boolean
// }
// const todo: MyReadonly2<Todo, 'title' | 'description'> = {
//   title: 'Hey',
//   description: 'foobar',
//   completed: false,
// }
// todo.title = 'Hello' // Error: cannot reassign a readonly property
// todo.description = 'barFoo' // Error: cannot reassign a readonly property
// todo.completed = true // OK
// type MyExclude<T, U> = T extends U ? never : T
// type MyOmit<T, K extends keyof T> = { [P in MyExclude<keyof T, K>]: T[P] }
// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   readonly [P in K]: T[P]
// } & MyOmit<T, K>
// Middle 4 ------------------------------------
// type Arr = ['1', '2', '3']
// type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
// type TupleToUnion<T extends any[]> = T[number]
// Middle 5 ------------------------------------
// type X = {
//   x: {
//     a: 1
//     b: 'hi'
//   }
//   y: 'hey'
// }
// type Expected = {
//   readonly x: {
//     readonly a: 1
//     readonly b: 'hi'
//   }
//   readonly y: 'hey'
// }
// type Todo = DeepReadonly<X> // should be same as `Expected`
// type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> }
// Middle 6 ------------------------------------
// declare const config: Chainable
// const result = config
//   .option('foo', 123)
//   .option('name', 'type-challenges')
//   .option('bar', { value: 'Hello World' })
//   .get()
// type Chainable<Options = {}> = {
//   option<K extends string, V>(key: K, value: V): Chainable<{ [P in K]: V } & Options>
//   get(): { [k in keyof Options]: Options[k] }
// }
// // 期望 result 的类型是：
// interface Result {
//   foo: number
//   name: string
//   bar: {
//     value: string
//   }
// }
// Middle 7 ------------------------------------
// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]
// type tail1 = Last<arr1> // expected to be 'c'
// type tail2 = Last<arr2> // expected to be 1
// type Last<T extends unknown[]> = T extends [...any, infer L ] ? L : never
// Middle 8 ------------------------------------
// type arr1 = ['a', 'b', 'c', 'd']
// type arr2 = [3, 2, 1]
// type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
// type re2 = Pop<arr2> // expected to be [3, 2]
// type re3 = Shift<arr1> // expected to be ['b', 'c', 'd']
// type re4 = Shift<arr2> // expected to be [2, 1]
// type re5 = Push<arr1, 'e'> // expected to be ['a', 'b', 'c', 'd', 'e']
// type re6 = Push<arr2, 0> // expected to be [3, 2, 1, 0]
// type re7 = Unshift<arr1, 'z'> // expected to be ['z', 'a', 'b', 'c', 'd'
// type re8 = Unshift<arr2, 4> // expected to be [4, 3, 2, 1]
// type Pop<T extends unknown[]> = T extends [...infer rest, any] ? rest : never
// type Shift<T extends unknown[]> = T extends [any, ...infer rest] ? rest : never
// type Push<T extends unknown[], V> = [...T, V]
// type Unshift<T extends unknown[], V> = [V, ...T]
