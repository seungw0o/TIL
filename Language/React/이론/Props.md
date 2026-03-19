# Props (Properties)

- `Hello`에 `name`이라는 props를 전달하는 코드이다.

  ```jsx
  import React from "react";
  import Hello from "./Hello";

  function App() {
    return <Hello name="react" />;
  }

  export default App;
  ```

#### Hello 코드에서 보면?

```jsx
import React from "react";

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>;
}

export default Hello;
```

- props는 객체 형태로 전달되며, `name`을 조회하고 싶다면 `props.name`으로 조회한다.

### Hello에 새로운 props를 줘보자

```jsx
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" color="red" />;
}

export default App;
```

#### Hello 코드로 와서

```jsx
import React from "react";

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>;
}

export default Hello;
```

- 지금까지는 props를 불러올 때 `props.`를 사용했는데, 비구조화 할당 문법을 사용하면 더 깔끔하게 불러올 수 있다.

#### 비구조화 할당을 한 코드

```jsx
import React from "react";

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>;
}

export default Hello;
```

### defaultProps 로 기본값 설정

- `defaultProps`를 사용하여 컴포넌트에 기본값을 지정할 수 있다.

  ```jsx
  import React from "react";

  function Hello({ color, name }) {
    return <div style={{ color }}>안녕하세요 {name}</div>;
  }

  Hello.defaultProps = {
    name: "이름없음"
  };

  export default Hello;
  ```

  - App에서 `name` 값이 없는 `Hello` 컴포넌트를 렌더링해 보면?

  ```jsx
  import React from "react";
  import Hello from "./Hello";

  function App() {
    return (
      <>
        <Hello name="react" color="red" />
        <Hello color="pink" />
      </>
    );
  }

  export default App;
  ```

  - 두 번째 `Hello`는 `name` 값이 `"이름없음"`이 되어 있을 것이다.

### props.children

- 컴포넌트 사이에 넣은 값을 조회하고 싶다면 `props.children`을 조회하면 된다.
- `props.children` 예시

  ```jsx
  import React from "react";

  function Wrapper() {
    const style = {
      border: "2px solid black",
      padding: "16px"
    };
    return <div style={style}></div>;
  }

  export default Wrapper;
  ```

  ```jsx
  import React from "react";
  import Hello from "./Hello";
  import Wrapper from "./Wrapper";

  function App() {
    return (
      <Wrapper>
        <Hello name="react" color="red" />
        <Hello color="pink" />
      </Wrapper>
    );
  }
  export default App;
  ```

  - 이 코드를 실행하면 `<Hello>` 코드는 나타나지 않게 될 것이다. `<Hello>` 코드를 보기 위해서는 `props.children`을 렌더링해 주어야 한다.

    ```jsx
    import React from "react";

    function Wrapper({ children }) {
      const style = {
        border: "2px solid black",
        padding: "16px"
      };
      return <div style={style}>{children}</div>;
    }

    export default Wrapper;
    ```

    - 위 코드를 실행하면 `<Hello>` 코드가 나타나게 된다.
