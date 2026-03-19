# spread?

- spread 연산자이다. `...`을 사용한다.
- spread 연산자를 사용할 때는 `[]` 안에 사용해야 한다. 배열 안에서 써야 한다는 뜻이다.

```jsx
const numbers = [1, 2, 3, 4, 5];

const spreadNumbers = [...numbers, 1000, ...numbers];
console.log(spreadNumbers); // [1, 2, 3, 4, 5, 1000, 1, 2, 3, 4, 5]
```

# rest?

```jsx
const purpleCuteSlime = {
  name: "슬라임",
  attribute: "cute",
  color: "purple"
};

const { color, ...rest } = purpleCuteSlime;
console.log(color);
console.log(rest);
```

- 위의 rest 예제에서는 앞에서 사용한 color를 제외한 값들을 purpleCuteSlime에 사용한 것이다.
