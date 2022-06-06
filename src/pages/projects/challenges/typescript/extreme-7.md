---
title: Inclusive Range
date: 2022-6-6 15:53:50
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00734-extreme-inclusive-range/README.md)

### 问题

```typescript
type case1 = InclusiveRange<200, 1> // []
type case2 = InclusiveRange<10, 5> // []
type case3 = InclusiveRange<5, 5> // [5]
type case4 = InclusiveRange<0, 10> // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
type case5 = InclusiveRange<1, 200> // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200]
type case6 = InclusiveRange<22, 146> // [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146]

```

### 解答

```typescript
type InclusiveRange<Lower extends number, Higher extends number, C extends any[] = [], I = false, R extends number[] = []> =
  I extends true
  ? C["length"] extends Higher
    ? [...R, Higher]
    : InclusiveRange<Lower, Higher, [...C, 1], true, [...R, C["length"]]>
  : C["length"] extends Lower
    ? InclusiveRange<Lower, Higher, C, true>
    : C["length"] extends Higher
      ? []
      : InclusiveRange<Lower, Higher, [...C, 1], false>;
```

### 拆分

1. 利用 (条件类型的尾递归消除)[https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types] 只要在条件类型中加入非递归条件就能延长递归深度
