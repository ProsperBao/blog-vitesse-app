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
// Easy 1
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
