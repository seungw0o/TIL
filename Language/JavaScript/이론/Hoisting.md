# Hoisting

> Hoisting이란 JavaScript에서 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 말한다. var로 선언한 변수는 undefined로 초기화하지만, let과 const로 선언한 변수는 초기화하지 않는다.

- 먼저 Hoisting은 끌어올리다라는 뜻을 가진 명사이다. 스크립트 내에 있는 변수와 함수가 선언 순서와 상관없이 끌어올려진 것처럼 보이는 현상이라고 볼 수 있다. 여기서 포인트는 물리적으로 끌어올려지는 것이 아니라, 자바스크립트 엔진, 즉 v8 엔진이 실행 전에 코드를 한 번 쭉 읽고 함수나 변수에 대한 정보를 저장해 놓기 때문에 이런 현상이 일어난다는 점이다.

## 함수 Hoisting

```jsx
test(); // 이 코드가 과연 실행될까..?

function test() {
  document.writeln("Hoisting");
}

test();
```

- 상식적으로 생각해 보면 첫 번째 줄에 있는 test()는 test 함수가 선언되기 전에 사용되었기 때문에 실행되지 않아야 하지만, Hoisting 때문에 정상 실행된다.

## 변수 Hoisting

### var로 선언한 변수

- var로 선언된 변수는 `선언, 초기화`까지만 되고 `할당`까지는 되지 않은 채로 Hoisting 된다.

```jsx
console.log(name); // undefined
var name = "James";
console.log(name); //James
```

- 위 코드를 보면 name이라는 변수는 var로 선언되었기 때문에 undefined로 초기화된다.

### const, let으로 선언된 변수

- `const`, `let`은 `var`의 문제점을 해결하기 위해 나타났다.
- `const`와 `let`은 참조 오류가 발생한다.

```jsx
console.log(name); // ReferenceError
const name = "James";
console.log(name); // ReferenceError
let name = "James";
```

### TDZ(Temporal Dead Zone)

```jsx
console.log(name); // ReferenceError: Cannot access 'name' before initialization
let name = "James";
```

- `const, let`으로 선언된 변수는 호이스팅이 안 되는 것처럼 보이지만, `접근`만 못하게 된 것이다.
- `console.log(name)`이 쓰여진 곳을 `dead zone`이라고 한다.
