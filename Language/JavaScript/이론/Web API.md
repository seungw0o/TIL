# Web API

## Local storage

- 정보가 계속 유지된다.
- 데이터가 만료되지 않는다.

### 예제

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

## Session

### 세션 기반 인증

- 세션은 비밀번호 등 클라이언트의 정보를 쿠키가 아닌 서버에 저장하고, 관리한다.
- 서버는 클라이언트의 로그인 요청에 대한 응답을 작성 할 때, 인증 정보는 서버에 저장하고, 클라이언트 식별자인 `JSESSIONID`를 쿠키에 담는다. 이후 클라이언트는 요청을 보낼 때마다 `JSESSIONID` 쿠키를 함께 보낸다. 그리하면 서버는 `JSESSIONID`의 유효성을 판별해 클라이언트를 식별한다.

#### 장점

- 서버가 클라이언트의 웹 브라우저에 의존하지 않아도 된다.
- 쿠키를 포함한 요청이 외부에 노출되어도 세션 ID 자체는 유의미한 개인 정보를 담지 않는다.
- 각 사용자마다 고유한 세션 ID가 발급되기 때문에, 요청이 들어올 때마다 회원 정보를 확인 할 필요가 없다

#### 단점

- 해커가 세션 ID를 중간에 탈취하여 클라이언트인 척 위장할 수 있다.
- 서버에서 세션 저장소를 사용하기 때문에, 요청이 많아지면 서버에 부하가 생긴다.

## cokie

<a href="https://github.com/seungw0o/TIL/blob/main/JS%20STUDY/%EC%9D%B4%EB%A1%A0/Cookie.md"> Cookie.md </a>

## token

### JWT

- Json Web Token의 약자로 Web에서 쓰이는 Json Token이다.
- 인증에 필요한 정보들을 암호화 시킨 토큰이다.
- 쿠키/세션 방식과 유사하게 `JWT 토큰(Access Token)`을 `HTTP 헤더에` 실어 서버가 클라를 식별한다.
- JWT는 `Header`,`Payload`,`Signature`로 이루어져 있다.

#### Header

- `Header`는 `alg`와 `typ`를 가지고 있다. `alg`는 정보를 암호화할 해싱 알고리즘을, `typ`는 토큰의 타입을 지정한다.

```jsx
{
	"alg": "HS256",
	"typ": "JWT"
}
```

#### Payload

- `Payload`는 실제로 토큰에 담을 정보를 가지고 있다. 주로 `클라이언트 고유 ID`,`유효 기간` 등이 포함된다.
- `Key-Value` 형식으로 이루어진 한 쌍의 정보를 `Claim`이라고 한다.

```jsx
{
	"sub": "1234567890",
	"name": "John Doe",
	"iat": 1516230922
}
```

#### Signature

- `Signature`는 인코딩된 `Header`와 `Payload`를 더한 뒤, 비밀키로 해싱하여 생성한다.
- `Header` 및 `Payload`는 단순 인코딩된 값이기 때문에 해커가 복호화 하고 조작할 수 있지만, `Signature`는 서버 측에서 관리하는 비밀키가 유출되지 않는 이상 복호화 할 수 없다.
- 따라서 `Signature`는 토큰의 위변조 여부를 확인하는 데 사용된다.

```jsx
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
);
```

#### 종류

- refresh Token
- access Token

#### Access Token

- Access Token은 보호된 정보에 접근할 수 있는 권한부여에 사용된다.
  권한을 부여받는 데에는 Access Token만 있으면 된다. 하지만 해킹의 위험성이 있기 때문에, Access Token은 일정 기간이 지내면 만료 되어 버린다

#### Refresh Token

- Access Token이 만료될 때마다, Refresh Token이 Access Token을 재발급 해주는 역할을 한다. Access Token이 열쇠, Refresh Token이 열쇠 재발급 같은 개념이다.

### Access Token, Refresh Token 발급 작성법

```jsx
const jwt = require("jsonwebtoken");

//access 토큰 발급
const accessToken = jwt.sign(payload, accessSecret, {
  algorithm: "HS256",
  expiresIn: "1h",
});
//refresh 토큰 발급
const refreshToken = jwt.sign(payload, refreshSecret, {
  algorithm: "HS256",
  expiresIn: "14d",
});
//클라이언트에서 받았을 때 access token은 그냥 응답하고, refresh token은 cookie에 담아서 보내준다. cookie에 담을 때는 쿠키 옵션을 포함해줘서 보낸다.

res
  .status(200)
  .send({ data: { accessToken: accessToken }, message: "ok" })
  .end();

res.cookie("refreshToken", refreshToken, {
  domain: "localhost",
  path: "/",
  maxAge: 24 * 6 * 60 * 10000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
});
```

### Token 기반 인증 절차

<img src="https://velog.velcdn.com/images%2Fboo1996%2Fpost%2Fb8bcd2b7-4801-4d54-a373-33f4d4362d2a%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%2C%202022-02-13%2012-52-01.png"/>

1. 클라이언트 로그인 요청이 들어오면, 서버는 검증 후 클라이언트 고유 ID의 정보를 `Payload`에 담는다
2. 암호화할 비밀키를 사용해 `Access Token(JWT)`를 발급한다.
3. 클라이언트는 전달받은 토큰을 저장해두고, 서버에 요청할 때마다 토큰을 요청 헤더 `Authorization`에 포함시켜 함께 전달한다.
4. 서버는 토큰의 `Signature`을 비밀키로 복호화한 다음, `위변조 여부` 및 `유효 기간` 등을 확인한다
5. 유효한 토큰이라면 요청에 응답한다.

- Access Token과 Refresh Token을 모두 생성한다.
  - 토큰에 담길 정보는 유저를 식별할 정보, 권한이 부여된 카테고리가 될 수 있다.
  - 두 종류의 토큰이 같은 정보일 필요는 없다.

    ```jsx
    const jwt = require("jsonwebtoken");

    //access 토큰 발급
    const accessToken = jwt.sign(payload, accessSecret, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshSecret, {
      algorithm: "HS256",
      expiresIn: "14d",
    });
    ```

  - 토큰을 클라이언트에게 보내주면, 클라이언트는 토큰을 저장한다

    ```jsx
    res
      .status(200)
      .send({ data: { accessToken: accessToken }, message: "ok" })
      .end();


      res.cookie('refreshToken', refreshToken, {
      domain: 'localhost',
      path: '/',
      maxAge: 24 _ 6 _ 60 \* 10000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      })

    ```

  - 클라이언트가 HTTP 헤더에 토큰을 담아 보낸다.

    ```jsx
    axios.get("https://localhost:4000/accesstokenrequest", {
      //req.headers
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    });
    ```

  - 서버가 토큰을 해독하여 서버에서 보내준 토큰이 맞다는 판단이 될 경우, 클라이언트의 요청을 처리한 후 응답을 보내준다.

    ```jsx
    const authorization = req.headers.authorization
    if (!authorization) {
    res.status(400).send({ data: null, message: 'invalid access token' })
    } else {
    const token = authorization.split(' ')[1]
    console.log('token=========>', token, typeof (token))
    //토큰에 유저 정보가 있다면 유저정보를 비동기로 가져와서 주어진 형식에 맞게 응답한다.
    jwt.verify(token, accessSecret, async (err, data) => {
      const UserData = await Users.findOne({
        where: { userId: data.userId }
      })
      console.log('UserData=======>', UserData)
      if (!UserData) {
        res.status(400).send({ data: null, message: "유저정보가 없는 토큰입니다." })
      } else {
        let userInfo = {
          id: UserData.id,
          userId: UserData.userId,
          email: UserData.email,
          createdAt: UserData.createdAt,
          updatedAt: UserData.updatedAt
        }
        console.log(userInfo)
        res.status(200).send({ data: { 'userInfo': userInfo }, message: 'ok' })
      }
      //헤더 authorizaion에 jwt 토큰이 있는 경우, 해당 유저의 정보를 리턴하자.

    })
    ```

#### 장점

- `Header`와 `Payload`를 가지고 `Signature`를 생성하므로 데이터 위변조를 막을 수 있다.
- 인증 정보에 대한 별도의 저장소가 필요 없다.
- JWT는 `토큰에 대한 기본 정보`와 `전달할 정보` 및 `토큰이 검증됐음을 증명하는 서명` 등 필요한 모든 정보를 자체적으로 지니고 있다.
- 클라이언트의 인증 정보를 저장하는 서버와 다르게, 서버는 무상태가 된다
- 확장성이 우수하다
- 토큰 기반으로 다른 로그인 시스템에 접근 및 권한 공유가 가능하다.(토큰 서버 활용)
- `OAuth`의 경우 Facebook, Google등 소셜 계정을 이용해 다른 웹 서비스에서도 로그인 할 수 있다.
- 모바일 어플리케이션 환경에서도 잘 동작한다.

#### 단점

- `쿠키`,`세션`과 다르게 JWT는 토큰의 길이가 길어, 인증 요청이 많을수록 네트워크 부하가 심해진다.
- `Payload` 자체는 암호화되지 않기 때문에 유저의 중요한 정보는 담을 수 없다 (패스워드 등)
- 토큰을 탈취 당하면 대처하기 어렵다. 토큰은 한 번 발급되면, 유효기간이 만료될 때까지 계속 사용이 가능하다.
- 특정 사용자의 접속을 강제로 만료하기 어렵다. (쿠키/세션 기반 인증은 서버 단에서 쉽게 삭제할 수 있지만 토큰은 그게 안 됨)

### 단점을 보완하기 위한 토큰 전략들

#### 짧은 만료 기한 설정

- 토큰의 만료 기한을 짧게 설정해서 토큰이 탈취되더라도 빠르게 만료시키는 방법이다. 하지만 토큰이 만료되면 사용자가 다시 로그인 해야하기 때문에 사용자 입장에서는 번거롭다.

#### Sliding Session

- 서비스를 지속적으로 이용하는 클라이언트에게 **자동으로 토큰 만료 기한을 늘려주는 방법**이다. 사용자가 로그인을 자주 할 필요가 없다

#### Refresh Token

- 자세한 설명은 위에 나와있으니 참고하자.
