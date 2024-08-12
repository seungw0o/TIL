# React Life Cycle (생명주기)

![alt text](images_minbr0ther_post_7f8ed738-2f24-46bd-ab9f-2c7e7d7976e2_Untitled-3.png)

- `생성(mounting) -> 업데이트(updating) -> 제거(unmounting)` 의 생명주기를 갖는다.

## Class Component 생명주기

### Mount

#### constroctor

- 컴포넌트 생성자 메서드, 컴포넌트가 생성되면 가장 먼저 실행되는 메서드이다. this.props, this.state에 접근이 가능하고 리액트 요소를 반환함

#### getDerivedStateFromProps

- props로부터 파생된 state를 가져온다. 즉 props로 받아온 것을 state에 넣어주고 싶을때사용한다.

#### render

- 컴포넌트를 렌더링하는 메서드이다.

#### componentDidMount

- 컴포넌트의 첫번째 렌더링이 마치면 호출되는 메서드이다.
- 이 메서드가 호출되는 시점에는 `화면에 컴포넌트가 나타난 상태`이다. 여기서는 주로 DOM을 사용해야 하는 외부 라이브러리 연동, 해당 컴포넌트에서 필요로하는 데이터를 ajax로 요청, 등의 행위를 한다.

```jsx
useEffect(() => {
  console.log("componentDidMount");
}, []);
```

### Updating

#### getDerivedStateFromProps

- 컴포넌트의 props나 state가 바뀌었을때도 이 메서드가 호출된다.

#### shouldComponentUpdate

- 컴포넌트가 리렌더링 할지 말지를 결정하는 메서드이다.

#### componentDidUpdate

- 컴포넌트가 업데이트 되고 난 후 발생한다.
  - 의존성 배열이 변할때만 useEffect가 실행되는 것과 같다.

```jsx
useEffect(() => {
  console.log("count or exampleProp changed");
}, [count, exampleProp]);
```

### Unmount

- 컴포넌트가 화면에서 사라지는 것을 의미한다.

#### componentWillUnmount

- 컴포넌트가 화면에서 사라지기 직전에 호출된다. DOM에 직접 등록했었던 이벤트를 제거하고, 만약에 `setTimeout`을 건게 있다면 `clearTimeout`을 통해 제거한다.
- 추가적으로 외부 라이브러리를 사용했고, 그 라이브러리에 dispose가 있다면, 여기서 호출하면 된다.

```jsx
useEffect(() => {
  console.log("");
  return () => exampleAPI.unsubscribe();
});
```

## Functional Componet 생명주기

- 리액트에서 Hook은 함수형 컴포넌트에서 React state와 생명주기 기능을 연동할 수 있게 해주는 함수다.
- Hook은 class 안에서는 동작하지 않고, class 없이 React를 사용할 수 있게 함

### 리액트 훅을 도입한 목적

- 기존의 라이프사이클 메서드 기반이 아닌 로직 기반으로 나눌 수 있어서 컴포넌트를 함수 단위로 쪼갤 수 있다는 이점이 있음.
- 라이프사이클 메서드에는 관련 없는 로직이 자주 섞여 들어가는데, 이로인해 버그가 쉽게 발생하고, 무결성을 쉽게 해친다.

### Hook 사용 규칙 두가지

- 최상위 에서만 Hook을 호출해야 한다.
  - 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하면 안된다.
  - 이 규칙을 따르면 컴포넌트가 렌더링 될 때마다 항상 동일한 순서로 Hook이 호출되는 것이 보장된다.
- 리액트 함수 컴포넌트에서만 Hook을 호출해야 한다.
  - 일반 JS함수에서는 Hook을 호출해서는 안된다.
