# useRef

`useRef`는 React에서 두 가지 주요 목적으로 사용되는 Hook입니다.

1.  **DOM 요소에 직접 접근 (DOM 참조)**
2.  **컴포넌트의 생애주기 동안 유지되는, 리렌더링을 유발하지 않는 값 저장**

---

## 1. DOM 참조 (DOM Reference)

JavaScript에서 `getElementById`나 `querySelector`를 사용해 DOM 요소에 접근하는 것처럼, React에서는 `ref`를 사용해 DOM 요소에 직접 접근할 수 있습니다. 함수형 컴포넌트에서는 `useRef` Hook을 사용합니다.

`useRef()`를 호출하여 `ref` 객체를 생성하고, 이 객체를 접근하고 싶은 DOM 요소의 `ref` 속성으로 설정합니다. 이렇게 하면 `ref` 객체의 `.current` 프로퍼티가 해당 DOM 요소를 가리키게 됩니다.

이를 통해 특정 DOM 요소에 포커스를 주거나, 스크롤 위치를 제어하거나, DOM 요소의 크기나 위치를 가져오는 등의 작업을 할 수 있습니다.

#### 예시: 특정 input에 포커스하기

```jsx
import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: ""
  });
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: ""
    });
    // nameInput.current는 <input name="name" ... /> DOM 요소를 가리킵니다.
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}
```

- 위 예시에서 `useRef`로 `nameInput`이라는 `ref` 객체를 생성했습니다.
- 이 객체를 이름 input의 `ref` 속성에 연결했습니다.
- '초기화' 버튼을 누르면 `onReset` 함수가 실행되고, `nameInput.current.focus()`를 통해 이름 input에 포커스가 자동으로 이동합니다.

---

## 2. 리렌더링 없는 값 저장 (Mutable Value Container)

`useRef`의 또 다른 중요한 용도는 **리렌더링을 유발하지 않으면서** 컴포넌트의 전체 생애주기 동안 값을 유지하는 것입니다.

`useState`는 값이 변경되면 컴포넌트를 리렌더링시키지만, `useRef`는 `.current` 프로퍼티의 값이 변경되어도 컴포넌트가 다시 렌더링되지 않습니다.

이러한 특징은 다음과 같은 상황에서 유용합니다.

- `setTimeout`이나 `setInterval`의 ID 값 저장
- 이전 상태 값 저장
- 스크롤 위치와 같은 외부 라이브러리 인스턴스 저장
- 렌더링과 관계 없는 계산 결과를 저장할 때

#### 예시: 렌더링 횟수 세기

`useState`로 렌더링 횟수를 세려고 하면, `setCount`가 호출될 때마다 컴포넌트가 다시 렌더링되어 무한 루프에 빠지게 됩니다. `useRef`를 사용하면 이 문제를 해결할 수 있습니다.

```jsx
import React, { useState, useRef, useEffect } from "react";

function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    // .current 값은 리렌더링을 유발하지 않습니다.
    renderCount.current = renderCount.current + 1;
    console.log(`이 컴포넌트는 ${renderCount.current}번 렌더링되었습니다.`);
  });

  return (
    <div>
      <p>State: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        State 변경 (리렌더링)
      </button>
    </div>
  );
}
```

- 위 컴포넌트에서 "State 변경" 버튼을 누를 때마다 `count` 상태가 바뀌어 리렌더링이 발생합니다.
- `useEffect`는 렌더링이 완료될 때마다 실행되므로, `renderCount.current` 값을 1씩 증가시킵니다.
- `renderCount`는 `ref` 객체이므로 `.current` 값을 바꿔도 리렌더링이 발생하지 않아 무한 루프 없이 렌더링 횟수를 안전하게 추적할 수 있습니다.

---

## `useState` vs `useRef`

| 특징              | `useState`                              | `useRef`                                                  |
| ----------------- | --------------------------------------- | --------------------------------------------------------- |
| **값 변경 시**    | 컴포넌트 **리렌더링 발생**              | 리렌더링 **발생하지 않음**                                |
| **용도**          | 렌더링과 직접적으로 관련된 상태 값 관리 | DOM 참조, 렌더링과 무관한 값 저장 (타이머 ID, 이전 값 등) |
| **값 접근**       | `state`                                 | `ref.current`                                             |
| **값의 생애주기** | 다음 렌더링 시 새로운 값으로 대체       | 컴포넌트의 전체 생애주기 동안 유지                        |

`useRef`는 상태가 아닌, "컴포넌트의 기억 상자"와 같다고 생각하면 이해하기 쉽습니다. 렌더링에 영향을 주지 않으면서 무언가를 기억하고 싶을 때 사용합니다.
