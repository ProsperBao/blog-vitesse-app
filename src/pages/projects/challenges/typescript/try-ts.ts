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
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple>
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
type TupleToObject<T extends readonly any[]> = {[key in T[number]]: key}
