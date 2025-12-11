# Symbol

심볼은 `유일한 식별자`를 선언할 때 사용합니다.

```js
const a = Symbol();
const b = Symbol();

console.log(a === b); // false
console.log(a == b); // false
```

심볼에게 `설명`도 붙일 수 있습니다.
이는 디버깅을 할 때 용이합니다.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id === id2); // false
console.log(id == id2); // false
```

## property key : 심볼형

```js
const id = Symbol("id");
const user = {
  name: "Mike",
  age: 30,
  [id]: "myid",
};

console.log(user); // {name: "Mike", age: 30, Symbol(id): "myid"}
console.log(user[id]); // "myid"

Object.keys(user); // ["name","age"] 가 나옵니다. Symbol은 나오지 않음
```

이러한 심볼은 협업자가 만들어둔 객체에 새로운 프로퍼티를 추가하고 싶을 때 사용합니다.

## Symbol.for() : 전역 심볼

- Symbol 함수는 매번 다른 Symbol 값을 생성하지만
- Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol을 공유

```js
const id1 = Symbol.for("id");
const id2 = Symbol.for("id");

console.log(id === id2); // true
console.log(id == id2); // true

Symbol.keyFor(id1); // "id"
```

## description

Symbol의 설명을 확일할 수 있다.

```js
const id = Symbol("id 입니다");
id.description; // id 입니다
```

## Sysbol을 보는법

```js
const id = Symbol("id");

const user = {
  name: "Mike",
  age: 30,
  [id]: "myid",
};

Object.getOwnPropertySymbols(user); // [Symbol(id)]
Reflect.ownKeys(user); // 심볼형을 포함한 객체의 모든 키를 확인 가능하다. ["name","age", Symbol(id)]
```
