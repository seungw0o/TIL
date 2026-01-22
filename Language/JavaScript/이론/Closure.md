# Closure

클로저는 자바스크립트의 <a href="./실행 컨텍스트.md">실행 컨텍스트</a> 때문에 발생하는 이론이다. 보통 클로저를 내부 함수에서 외부 함수의 변수에 접근 할 수 있다는 정도로만 알고 있지만. 좀 더 다뤄보겠다.

```js
function outer() {
  let x = 10;
  function inner() {
    console.log(x);
  }
  return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```

**동작 원리:**

1. `outer` 함수의 렉시컬 환경에는 변수 `x`와 함수 `inner`가 저장된다.
2. `inner` 함수는 자신의 Outer Lexical Environment Reference를 통해 `outer` 함수의 렉시컬 환경을 참조한다.
3. `outer` 함수가 종료된 후에도 `inner` 함수가 외부 렉시컬 환경을 참조하고 있어, `x`에 접근할 수 있다.
4. 이처럼 외부 함수의 변수를 내부 함수가 참조할 수 있는 것이 클로저다.

React의 **useState**도 클로저의 원리를 이용한 것이다.
