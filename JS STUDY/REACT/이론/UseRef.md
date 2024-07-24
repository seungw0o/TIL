# useRef로 특정 DOM 선택하기

- Js에서 DOM을 가져오려면 getElementById나 querySelector를 사용 해야한다. React에서는 DOM을 가져오기 위해, ref라는 것을 사용하기를 권장한다.

## useRef

- ref를 사용하기 위한 Hook이다.

#### 예시

```jsx
import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
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

- useRef로 Ref 객체를 생성하고 이 객체를 선택하고 싶은 DOM에 ref 값으로 설정한다. 그러면 Ref 객체의 `.current` 값은 우리가 원하는 DOM을 가르키게 된다. 예시 코드에서는 `onReset` 함수에서 input에 포커스하는 `focus()` DOM API를 호출했다.
