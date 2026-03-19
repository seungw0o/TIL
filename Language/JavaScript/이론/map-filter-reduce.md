# ES6 배열 메서드

> es6는 JavaScript의 버전을 말한다.

---

## map()

### 배열의 값을 새로운 값으로 바꿀 때 사용하기 좋음

- map 함수는 입력한 배열의 정보 중 한 조각을 받아 새로운 값을 반환한다.
- 때로는 정보의 일부를 반환하기도 한다.
- 또는 정보를 변형해서 새로운 값을 반환하기도 한다.
  - 예를 들어 모든 값을 대문자로 변환하거나 정수를 화폐 단위로 바꾸어 새로운 배열로 반환할 수 있다.

  ```jsx
  let arr = [1, 2, 3, 4, 5];

  let newArr = arr.map((val, idx) => val * val);

  console.log(newArr); // [1,4,9,16,25]
  ```

  ```jsx
  const numbers = [1, 2, 3, 4];
  const updatedNumbers = numbers.map(number => {
    return number * 2;
  });
  console.log(updatedNumbers);
  //[2, 4, 6, 8]
  ```

## filter()

### 원하는 배열 값만 추려낼 때 사용

- 배열을 순회하면서 조건에 맞는 배열 값만 통과시켜 새로운 배열로 반환한다.
- map() 함수와는 다르게 데이터의 형태는 유지하면서 배열의 길이만 줄인다.

  ```jsx
  let users = [
    { id: 11, name: "Adam", age: 23, group: "editor" },
    { id: 47, name: "John", age: 28, group: "admin" },
    { id: 85, name: "William", age: 34, group: "editor" },
    { id: 97, name: "Oliver", age: 28, group: "admin" }
  ];
  let res = users.filter(it => it.name.includes("oli"));
  console.log(res);
  // res is []
  ```

  ```jsx
  const fruits = [
    { name: "Apple", price: 1000 },
    { name: "Banana", price: 5000 },
    { name: "Grape", price: 4000 },
    { name: "Watermelon", price: 20000 }
  ];

  const chipFruits = fruits.filter(fruit => {
    return fruit.price < 5000;
  });
  console.log(chipFruits);
  //[{name: "Apple", price: 1000}, {name: "Grape", price: 4000}]
  ```

## reduce()

- 배열을 줄여 나가며 하나의 값을 만든다는 개념이다.
- `let les = arr.reduce((acc, val, idx) => {}, 초기값);` 형태이다.
- 첫 번째 인자는 초기값/누적값이다.
- 두 번째 인자는 배열 값을 순회하며 처리한다.
- 세 번째 인자는 (idx) 인덱스값이다.
- 네 번째 인자는 기존 배열을 그대로 보여준다.
