# Styled-Components

### 나타난 이유

- 리액트 컴포넌트의 CSS 스타일링을 편하게 하기 위해 만들었다.

#### 설치 방법

```jsx
//npm
npm install --save styled-components

//yarn
yarn add styled-components
```

#### 사용 방법

```jsx
import styled from "styled-components"; // 꼭 import 해주어야 사용 가능

const Test = styled.div`
  width: 100px;
  color: tomato;
`;

function App() {
  return <Test />;
}

export default App;
```

### props를 전달 해보자

- styled-components를 잘보면 백틱으로 감싸져 있다. 그렇기 때문에 전달을 하려면 `${}`를 사용 해야한다.

#### 예제

```jsx
const Button = styled.button`
  background: ${props => (props.on ? "tomato" : "white")};
`;

function App() {
  return (
    <>
      <Button>OFF</Button>
      <Button on>ON</Button>{" "}
      {/*on 값이 있기 때문에 배경색이 tomato 색으로 변한다*/}
    </>
  );
}
```

### 재사용하기

- 만들어둔 컴포넌트를 그대로 가져올 수도 있고, 약간의 다른 점만 추가 할 수도 있다.

#### 예제

```jsx
const Button = styled.button`
  background: white;
  width: 100px;
  height: 100px;
`;
const TomatoButton = styled(Button)`
  // 이 컴포넌트는 Button에 있는 스타일을 그대로 가져오면서, 배경 색만 tomato 색으로 변하게 된다.
  background: tomato;
`;

function App() {
  return (
    <>
      <Button>White</Button>
      <TomatoButton>Tomato</TomatoButton>
    </>
  );
}
```

### 선택자

#### &

- 현재의 컴포넌트를 의미한다.
- &:hover, &:after 등등으로 사용 할 수 있다.

### attrs로 간단하게 설정하기

- attrs로 컴포넌트에 기본값을 설정 할 수 있다. 예를 들면 input 같은 태그에 미리 type을 정해 놓을 수 있다. 그렇다면 사용할 때, type="checkbox" 같은 걸 쓸 필요가 없다.

#### 예제

```jsx
const Input = styled.input.attrs({ type: "checkbox" })``;
```
