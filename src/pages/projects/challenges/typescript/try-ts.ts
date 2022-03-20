// Simple 1
// type HelloWorld = string
// type test = Expect<Equal<HelloWorld, string>>

// Easy 1
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
// Easy 2
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
// Easy 3
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// type result = TupleToObject<typeof tuple>
// // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
// type TupleToObject<T extends readonly any[]> = {[key in T[number]]: key}
// Easy 4
// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]
// type First<T extends any[]> = T extends [infer F, ...any] ? F : never
// type head1 = First<arr1> // expected to be 'a'
// type head2 = First<arr2> // expected to be 3
// Easy 5
// type tesla = ['tesla', 'model 3', 'model X', 'model Y']
// type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
// type Length<T extends readonly any[]> = T['length']
// type teslaLength = Length<tesla> // expected 4
// type spaceXLength = Length<spaceX> // expected 5
// Easy 6
// type MyExclude<T, U> = T extends U ? never : T
