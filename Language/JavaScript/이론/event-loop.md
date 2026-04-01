# Event Loop

JavaScript는 기본적으로 한 번에 하나의 작업만 실행한다.  
이때 "지금 어떤 코드를 실행할지", "비동기 작업이 끝나면 언제 콜백을 실행할지"를 조율하는 메커니즘이 바로 **Event Loop**다.

이 문서는 **브라우저 런타임 기준**으로 설명한다.

## Event Loop의 시각적 표현

<img src='https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop/the_javascript_runtime_environment_example.svg' alt='Event Loop'>

## 먼저 전체 구조부터

이벤트 루프를 이해할 때는 아래 6가지를 같이 봐야 한다.

| 구성 요소              | 역할                                                               | 대표 예시                         |
| ---------------------- | ------------------------------------------------------------------ | --------------------------------- |
| `Call Stack`           | 지금 실행 중인 함수들의 실행 컨텍스트를 쌓아두는 곳                | 함수 호출, 재귀 호출              |
| `Heap`                 | 객체, 배열, 함수, 클로저 등이 저장되는 메모리 영역                 | `{}`, `[]`, 함수 객체             |
| `Web APIs` / Host APIs | 브라우저가 제공하는 비동기 기능                                    | `setTimeout`, DOM 이벤트, `fetch` |
| `Task Queue`           | 나중에 실행할 일반 작업 대기열                                     | `setTimeout`, 클릭 이벤트         |
| `Microtask Queue`      | 현재 작업 직후 우선 실행할 대기열                                  | `Promise.then`, `queueMicrotask`  |
| `Event Loop`           | 스택이 비었는지 보고, 큐에서 다음 작업을 가져와 실행 흐름을 이어감 | 전체 스케줄링                     |

> 흔히 `macrotask`라는 표현도 많이 쓰는데, 보통 여기서 말하는 `Task Queue`를 가리킨다.

## 핵심 요약

1. 현재 실행 중인 코드는 `Call Stack`에서 실행된다.
2. 비동기 작업은 브라우저의 `Web APIs` 같은 외부 영역에서 기다린다.
3. 작업이 끝나면 콜백이 바로 실행되는 것이 아니라, 큐에 들어가 대기한다.
4. `Call Stack`이 비면, 이벤트 루프가 큐를 확인해 다음 작업을 올린다.
5. 이때 **Microtask가 Task보다 먼저 처리된다.**

## Call Stack

- 함수 호출들은 `프레임(frame)` 스택을 형성한다.
- 어떤 함수가 실행되면 해당 함수의 실행 컨텍스트가 스택에 쌓인다.
- 함수 실행이 끝나면 스택에서 제거된다.
- 가장 나중에 들어온 함수가 가장 먼저 빠져나온다. 즉, **LIFO(Last In, First Out)** 구조다.

### 예시 코드

```js
function foo(b) {
  const a = 10;
  return a + b + 11;
}

function bar(x) {
  const y = 3;
  return foo(x * y);
}

const baz = bar(7); // 42
```

### 실행 순서

1. 전역 코드 실행이 시작된다.
2. `bar(7)`를 호출하면 `bar`의 프레임이 스택에 쌓인다.
3. `bar` 내부에서 `foo(x * y)`를 호출하면 `foo`의 프레임이 `bar` 위에 쌓인다.
4. `foo` 실행이 끝나면 `foo` 프레임이 제거된다.
5. 이어서 `bar` 실행이 끝나면 `bar` 프레임도 제거된다.
6. 최종적으로 전역 실행만 남는다.

### 주의할 점

- `Call Stack`은 "실행 흐름"을 관리하는 영역이다.
- 반면 객체나 함수 같은 값 자체는 주로 `Heap`에 저장된다.
- 즉, 스택에는 "어떤 코드가 실행 중인지"가 쌓이고, 실제 참조 대상 객체는 힙에 존재하는 경우가 많다.
- 클로저로 캡처된 값은 바깥 함수가 끝난 뒤에도 계속 살아 있을 수 있다.

## Heap

- 객체는 `Heap`에 할당된다.
- 힙은 비교적 큰 메모리 영역이며, 동적으로 생성되는 데이터가 저장된다.
- 대표적으로 객체, 배열, 함수 객체, 클로저 관련 데이터가 여기에 놓인다.

```js
const user = {
  name: "Kim",
  skills: ["JS", "TS"]
};
```

위 코드에서 `user` 변수 자체는 현재 실행 컨텍스트에서 참조를 들고 있고, 실제 객체와 배열 데이터는 힙에 저장된다고 이해하면 된다.

### 왜 힙이 중요한가?

- 비동기 코드를 이해할 때 "함수가 끝났는데도 데이터가 왜 살아 있지?" 같은 의문이 생긴다.
- 이는 값이 스택에서 바로 사라지는 것이 아니라, 힙에 저장되어 있고 여전히 참조되고 있기 때문이다.
- 더 이상 참조되지 않는 값은 가비지 컬렉터가 정리한다.

## Web APIs / Host APIs

JavaScript 엔진 자체가 `setTimeout`이나 DOM 이벤트를 직접 처리하는 것은 아니다.  
이런 기능은 브라우저 같은 **호스트 환경**이 제공한다.

예를 들어:

- `setTimeout`은 브라우저 타이머 시스템에 등록된다.
- 클릭 이벤트는 브라우저가 감지한다.
- `fetch` 요청도 브라우저나 런타임 환경이 처리한다.

이 작업들이 끝나면 관련 콜백이 큐로 이동할 준비를 한다.

## Queue

이벤트 루프를 설명할 때 큐는 크게 두 종류로 나눠서 보는 것이 좋다.

### 1. Task Queue

- 일반적인 비동기 콜백이 대기하는 큐다.
- 흔히 `macrotask queue`라고도 부른다.
- 예:
  - `setTimeout`
  - `setInterval`
  - DOM 이벤트 콜백
  - 일부 I/O 완료 콜백

JavaScript 런타임은 대기열에서 작업을 하나 꺼내 `Call Stack`으로 올려 실행한다.

### 2. Microtask Queue

- 현재 작업이 끝난 직후, 다음 `Task`로 넘어가기 전에 먼저 처리되는 큐다.
- 예:
  - `Promise.then`
  - `Promise.catch`
  - `Promise.finally`
  - `queueMicrotask`
  - `MutationObserver`

### 중요한 구분

`microtask`와 `macrotask(task)`는 **Call Stack의 종류가 아니다.**  
둘 다 "나중에 실행할 작업이 대기하는 큐"이며, 우선순위가 다를 뿐이다.

## Event Loop

앞에 있는 기능들을 구현할 때, 보통 다음과 같이 단순화해서 설명한다.

```js
while (true) {
  const task = taskQueue.getNextTask();
  execute(task);

  while (microtaskQueue.hasNext()) {
    execute(microtaskQueue.getNextMicrotask());
  }

  renderIfNeeded();
}
```

물론 실제 브라우저 구현은 더 복잡하지만, 이해를 위해서는 이 흐름이 핵심이다.

### 동작 순서

1. 현재 실행 중인 스크립트(또는 작업)를 실행한다.
2. `Call Stack`이 비면 `Microtask Queue`를 전부 비운다.
3. 필요한 경우 브라우저가 렌더링 기회를 가진다.
4. 그 다음 `Task Queue`에서 하나를 꺼내 실행한다.
5. 다시 `Microtask Queue`를 전부 비운다.
6. 이 과정을 반복한다.

## Run-to-completion

### 메시지 처리는 동기인가? 비동기인가?

- 각 작업 자체는 **동기적으로 끝까지 실행**된다.
- 즉, 현재 실행 중인 함수가 중간에 다른 JavaScript 코드에 의해 끼어들어 중단되지 않는다.
- 앞선 작업이 끝나야 다음 작업이 실행된다.
- 하지만 작업이 큐에 등록되는 과정 자체는 비동기적으로 일어날 수 있다.

이 특징은 프로그램의 동작을 추론할 때 매우 중요하다.  
실행 중인 함수는 중간에 선점되지 않고, 자기 차례가 오면 끝까지 실행된다.

### 단점

- 하나의 작업이 너무 오래 걸리면 클릭, 스크롤, 입력 같은 사용자 상호작용이 늦어진다.
- 브라우저 화면 갱신도 밀릴 수 있다.
- 심하면 브라우저가 "스크립트 응답 없음" 경고를 띄울 수 있다.

그래서 긴 작업은 잘게 나누거나, 필요하면 다음 작업으로 넘겨 UI가 숨 쉴 시간을 주는 것이 좋다.

## 메시지 추가하기

- 웹 브라우저에서는 클릭 이벤트가 발생하면 해당 콜백이 큐에 들어간다.
- `setTimeout`도 시간이 지나면 관련 작업이 큐에 들어간다.
- `Promise.then`은 작업이 완료되면 `Microtask Queue`에 등록된다.

## `setTimeout()`

- 두 개의 매개변수를 받는다.
- 첫 번째는 실행할 콜백, 두 번째는 지연 시간이다.
- 이 시간은 "정확한 실행 시점"이 아니라 **최소 지연 시간**이다.

```js
setTimeout(() => {
  console.log("timeout");
}, 1000);
```

1초가 지났다고 해서 즉시 실행되는 것은 아니다.  
그 시점에 스택이 바쁘거나 앞선 작업이 남아 있으면 더 늦게 실행된다.

### 0의 지연 시간

- 지연 시간을 `0`으로 지정해도 바로 실행되는 것은 아니다.
- 현재 실행 중인 작업이 끝나야 하고, 큐의 순서도 지켜야 한다.
- 그래서 `0`은 "즉시 실행"이 아니라 "가능한 한 빨리, 하지만 현재 작업 이후"에 가깝다.

## Microtask가 더 먼저 실행되는 예시

```js
console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("script end");
```

### 실행 결과

```txt
script start
script end
promise
setTimeout
```

### 이유

1. 전역 스크립트가 먼저 실행된다.
2. `setTimeout` 콜백은 `Task Queue`로 갈 준비를 한다.
3. `Promise.then` 콜백은 `Microtask Queue`에 등록된다.
4. 현재 스크립트가 끝나고 스택이 비면, 이벤트 루프는 먼저 `Microtask Queue`를 비운다.
5. 그래서 `promise`가 먼저 출력된다.
6. 그 다음에 `Task Queue`의 `setTimeout` 콜백이 실행된다.

## 렌더링과의 관계

브라우저는 보통 하나의 `Task`가 끝나고, 필요한 `Microtask` 처리도 끝난 뒤에 렌더링 기회를 얻는다.

즉 다음과 같은 상황이 생길 수 있다.

- 무거운 동기 작업이 오래 걸리면 화면이 멈춘다.
- `Microtask`를 계속 만들어내면 렌더링이 지연될 수 있다.

예를 들어 아래 코드는 좋지 않다.

```js
function loop() {
  queueMicrotask(loop);
}

loop();
```

이런 코드는 `Microtask Queue`를 계속 채우기 때문에, 다음 `Task`나 렌더링으로 넘어가지 못할 수 있다.

## 정리

- `Call Stack`은 지금 실행 중인 함수들의 스택이다.
- `Heap`은 객체, 배열, 함수 등 실제 데이터가 저장되는 메모리 영역이다.
- 비동기 작업은 브라우저의 `Web APIs` 같은 호스트 환경에서 처리된다.
- 작업이 끝나면 콜백은 큐에 들어간다.
- `Microtask Queue`는 `Task Queue`보다 먼저 비워진다.
- JavaScript 코드는 기본적으로 `run-to-completion` 방식으로 실행된다.
- 긴 동기 작업이나 과도한 `Microtask`는 UI 멈춤의 원인이 된다.
