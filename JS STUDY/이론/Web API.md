# Web API

## Local storage

- 정보가 계속 유지된다.

  ```jsx
  localstorage.setItem("key", "value"); // value는 string이여야 함
  //setItem은 등록을 getItem은 읽는 것을 담당함
  localstorage.getItem("key");
  localstorage.removeItem("key"); //제거를 담당
  localstorage.clear(); //전체 제거
  ```

## Session storage

- 페이지 세션이 끝날 때, 정보가 사라진다.

- 브라우저가 열려있는 한 새로고침과 페이지 복구를 거쳐도 남아있다.
- 페이지를 새로운 탭이나 창에서 열면, 최상위 브라우징 맥락의 값을 가진, 새로운 세션을 생성함
- 같은 URL을 다수의 탭/창에서 열면 각각의 탭/창에 새로운 sessionstorage를 생성함
- 탭/창을 닫으면 세션이 끝나고, sessionstorage 안의 객체를 초기화함.

- sessionStorage에 저장한 자료는 페이지 프로토콜별로 구분합니다. 특히 HTTP로 방문한 페이지에서 저장한 데이터는 같은 페이지의 HTTPS와는 다른 sessionStorage에 저장된다.

### 예제

```jsx
// sessionStorage 객체에 접근 후, Storag.setItem()을 사용해 항목 하나를 추가한다.
sessionStorage.setItem("myCat", "Tom");
```

```jsx
// 텍스트 필드의 문자을 자동 저장하여 브라우저가 의도치 않게 재시작 되었을 경우 자동으로 텍스트 필드에 저장된 내용을 저장된 문장으로 복구하여 작성한 내용이 사라지지 않게 한다.

// 추적할 텍스트 입력 칸 가져오기
let field = document.getElementById("field");

// 자동저장 값이 존재하는지 판별
// (의도치 않게 페이지를 새로 불러올 경우에만 발생)
if (sessionStorage.getItem("autosave")) {
  // 입력 칸의 콘텐츠 복구
  field.value = sessionStorage.getItem("autosave");
}

// 텍스트 입력 칸의 변화 수신
field.addEventListener("change", function () {
  // 결과를 세션에 저장
  sessionStorage.setItem("autosave", field.value);
});
```

## cokie

- 일정 시간 후 정보가 사라짐

## token

- ***
