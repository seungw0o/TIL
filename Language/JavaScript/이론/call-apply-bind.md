# call, apply, bind

## call

call은 유사배열객체에 배열 메서드를 활용할 때 사용한다.

```js
let obj = {
  string: "zero",
  yell: function () {
    alert(this.string);
  }
};
let obj2 = {
  string: "what"
};

obj.yell(); // zero
obj.yell.call(obj2); // what
```

위 코드처럼 call을 사용하여 obj의 yell 함수를 obj2의 yell 함수처럼 사용할 수 있다.

```js
call(thisArg, arg1, arg2);
```

- 첫 번째 인자(`thisArg`): 함수 내부의 `this`를 대체할 객체
- 두 번째 인자부터: 함수에 전달할 인자들 (쉼표로 구분)

call은 `arguments` 같은 유사배열객체에 배열 메서드를 적용할 때도 사용한다. `arguments`는 함수의 인자들을 담은 유사배열객체인데, 배열처럼 생겼지만 실제 배열이 아니기 때문에 배열 메서드를 직접 사용할 수 없다.

```js
function example() {
  console.log(Array.prototype.join.call(arguments));
}
example(1, "string", true); // '1,string,true'
```

이처럼 call을 통해 `Array.prototype`의 메서드를 유사배열객체에 적용할 수 있다.

```js
Array.from(arguments); // 유사배열객체 → 실제 배열로 변환
```

다만 `Array.from`이 등장하면서 유사배열객체를 바로 배열로 변환할 수 있어, 요즘은 이 방식을 더 많이 사용한다.

## apply

apply는 call과 거의 동일하지만, 인자를 배열 형태로 넘긴다는 점이 다르다.

```js
const sum = (a, b, c) => {
  return a + b + c;
};

const nums = [1, 2, 3];
console.log(sum.apply(null, nums)); // 6
```

위처럼 apply를 사용하면 `nums` 같은 배열을 `a, b, c`처럼 개별 인자로 분리해 함수에 넘길 수 있다.

```js
sum(...nums); // 스프레드 문법으로 동일하게 사용 가능
```

요즘은 스프레드 문법이 apply를 대체하는 경우가 많다.

## bind

bind는 함수가 가리키는 `this`를 바꾼 새로운 함수를 반환하며, call/apply와 달리 즉시 호출하지 않는다.

```js
let obj = {
  string: "zero",
  yell: function () {
    alert(this.string);
  }
};
let obj2 = {
  string: "what"
};

const yell2 = obj.yell.bind(obj2);
yell2();
obj.yell.bind(obj2)();
```

obj의 yell 함수의 `this`를 bind로 obj2로 고정하고 yell2에 할당하면, yell2 실행 시 `what`이 출력된다.

`obj.yell.bind(obj2)();` 처럼 반환된 함수를 즉시 실행하면 별도 변수에 할당 없이 call처럼 사용할 수도 있다.

bind는 `this` 고정 외에도 함수의 인자를 미리 고정하는 용도로도 사용할 수 있다. 이를 **부분 적용(Partial Application)** 이라고 한다.

```js
const mul = (a, b) => {
  return a * b;
};

const double = mul.bind(null, 2); // a를 2로 고정, this는 필요 없으므로 null
double(5); // 10
double(3); // 6
```

`this`가 필요 없는 경우 첫 번째 인자에 `null`을 넘기는 것이 관례다.
