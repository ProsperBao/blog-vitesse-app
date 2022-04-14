---
title: InorderTraversal
date: 2022-4-14 15:36:25
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3376-medium-inordertraversal/README.md)

### 问题

实现二叉树的类型版本中序遍历。

```typescript
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null
  }
} as const

type case1 = InorderTraversal<null> // []
type case2 = InorderTraversal<typeof tree1> // [1, 3, 2]
type case3 = InorderTraversal<typeof tree2> // [1]
type case4 = InorderTraversal<typeof tree3> // [2, 1]
type case5 = InorderTraversal<typeof tree4> // [1, 2]
```

### 解答

```typescript
type InorderTraversal<T extends TreeNode | null> =
  T extends TreeNode
  ? T['left'] extends TreeNode
    ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']> ]
    : T['right'] extends TreeNode
      ? [T['val'], ...InorderTraversal<T['right']>]
      : [T['val']]
  : [] 
```

### 拆分
1. 中序遍历是通过中序遍历左子树、根节点、右子树的方式实现的。
2. 先判断传入的是否是节点
3. 然后判断左子树是否是节点，如果是节点，则递归调用
4. 然后判断右子树是否是节点，如果是节点，则递归调用
5. 如果是节点，则返回节点的值
