# JSX 기본 규칙
### 꼭 닫혀야 하는 태그
- 태그는 꼭 닫혀 있어야 한다.
  - 오류가 발생하는 예시
    ```jsx
    import React from 'react';
    import Hello from './Hello';

    function App() {
      return (
        <div>
          <Hello />
          <Hello />
          <Hello />
          <div> {/*꼭 닫아야 한다.*/}
        </div>
      );
    }

    export default App;
    ```

- 태그와 태그 사이에 내용이 없는 경우에는 self closing 태그를 사용 해야한다. < Hello /> 같이 self closing을 사용 해야한다.

### 꼭 감싸져야 하는 태그 
- 두개 이상의 태그는 무조건 하나의 태그로 감싸져 있어야 한다.
  ```jsx
  import React from 'react';
  import Hello from './Hello';

  function App() {
    return (
      <div>
        <Hello />
        <div>안녕히계세요</div>
      </div>
    );
  }

  export default App;
  ```
  
- 계속 div로만 감싸는게 별로 좋지 않은 상황도 있다. 그런 경우에는 리액트의 Fragment 라는 것을 사용하면 된다.
  ```jsx
  import React from 'react';
  import Hello from './Hello';

  function App() {
    return (
      <>
        <Hello />
        <div>안녕히계세요</div>
      </>
    );
  }

  export default App;
  ```
  - fragment는 브라우저 상에서 따로 별도의 엘리먼트로 나타나지 않는다.  
### JSX 안에 있는 JS 변수
- jsx에서 javascript 변수를 보여줘야 할 때애는 {} 로 감싸서 보여준다.
  ```jsx
   import React from 'react';
   import Hello from './Hello';

   function App() {
     const name = 'react';
     return (
       <>
         <Hello />
         <div>{name}</div>
       </>
     );
   }

   export default App;
   ```
### style과 className
- HTML과 사용 방법이 다르다. 먼저 인라인 스타일은 객체 형태로 작성 해야한다. background-color 같이 - 를 쓰는 태그들은 backgroundColor 처럼 camelCase를 사용 해야한다.
  ```jsx
  import React from 'react';
  import Hello from './Hello';

  function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <>
    <Hello />
    <div style={style}>{name}</div>
    </>
  );
  }

  export default App;
  ``` 
- class name을 설정 해야 한다면, "class ="가 아닌, "className ="으로 설정을 해야한다.
### 주석
- JSX에서 주석은 {/**/} 이런 형태로 사용한다. 열리는 태그 안에서는 //를 사용해도 된다. (중괄호를 안 써도 됨)