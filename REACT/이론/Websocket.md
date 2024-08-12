# 웹소켓

- 웹소켓은 TCP 연결에 완전한 이중 통신 채널을 제공하는 컴퓨터 프로토콜이다. (HTTP와 다름 - 둘다 OSI 7계층에 위치해 있고, 4계층의 TCP에 의존함 웹소켓은 HTTP 프로토콜과 호환이 된다.)

## 기존의 방식

- 우리가 아는 기존의 방식은 단방향 통신이다 (요청을 보내면 응답이 오는 형식)

## 하지만?

- 웹소켓은 statefull하여 매번 요청을 보내는 것이 아닌 한번의 요청으로 handShake 과정을 통해 연결을 유지하여, 양방향 통신이 가능해짐

### 특징

#### 양방향 통신

- 데이터 송수신을 동시에 처리 가능
- 클라이언트와 서버가 서로 원할때 데이터를 주고 받는다

#### 실시간 네트워킹

- 웹 환경에서 연속된 데이터를 빠르게 노출함
- 여러 단말기에서 정보를 빠르게 교환

### 여기서 알아야 할 개념

#### Polling : 일정 주기로 요청을 송신하는 것

- 바뀐게 없어도 요청과 응답을 계속한다.(실시간 네크워킹에서는 언제 요청이 발생할지 예측 불가능하기 때문)

#### Long Polling

- Polling의 단점을 해결하기 위해, 서버에서 좀 더 대기를 하며, 이벤트가 발생할 때 응답을 하는 형식임
- 응답을 받으면 끊고 다시 재요청한다. 결국 많은 양의 메시지가 쏟아지면 Polling과 동일해짐

#### Streaming

- 서버에 요청을 보내고 끊기지 않은 연결상태에서 끊임없이 데이터를 수신한다.
- 클라이언트에서 서버로의 데이터 송신이 어려움

#### 세 개의 방식 모두 HTTP를 통해 통신하기 때문에 요청/응답 모두 헤더가 불필요하게 크다는 단점이 있음.

### 웹소켓 종류

#### socket.io

- 인터넷 익스플로어 구버전 사용자는 웹소켓으로 작성된 웹페이지를 볼 수 없다. 이를 해결하려고 socket.io는 브라우저가 웹소켓을 지원하면 일반 웹소켓 방식으로 동작하고, 지원하지 않으면 http를 이용하여 웹소켓을 흉내내는 방식으로 통신을 지원한다.
- socket.io는 node.js에 종속적이다.

#### sockjs

- spring에서 위 문제를 해결하기 위해 sockjs를 해결책으로 제공했다. 서버를 개발할 때, 일반 웹소켓으로 통신할지, sockjs로 통신할지 결정할 수 있고, 클라이언트는 sockjs로 서버와 통신한다.

#### stomp

- 단순 텍스트 지향 메시징 프로토콜이다. spring에 종속적이며, 구동방식으로 사용하고 있다. (가벼워서 많이 씀)
- stompt는 웹소켓 위에서 동작하는 프로토콜로써, 클라이언트와 서버가 전송할 메시지 유형, 형식, 내용들을 정의하는 매커니즘이다.

#### node를 이용할땐 socket.io를 주로 쓰고, spring을 쓸때는, stomp, sockjs를 사용한다.

### React 적용

```jsx
import SockJs from "sockjs-client";
import StompJs from "stompjs";
//stomp와 sockjs 패키지로 깔고 임포트!!

const sock = new SockJs("http://서버주소");
//client 객체 생성 및 서버주소 입력

const stomp = StompJs.over(sock);
//stomp로 감싸기

const stompConnect = () => {
  try {
    stomp.debug = null;
    //웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을
    //console에 보여주는데 그것을 감추기 위한 debug

    stomp.connect(token, () => {
      stomp.subscribe(
        `서버주소`,
        data => {
          const newMessage = JSON.parse(data.body);
          //데이터 파싱
        },
        token
      );
    });
  } catch (err) {}
};

//웹소켓 connect-subscribe 부분

const stompDisConnect = () => {
  try {
    stomp.debug = null;
    stomp.disconnect(() => {
      stomp.unsubscribe("sub-0");
    }, token);
  } catch (err) {}
};
//웹소켓 disconnect-unsubscribe 부분
// 웹소켓을 disconnect을 따로 해주지 않으면 계속 연결되어 있어서 사용하지 않을때는 꼭 연결을 끊어주어야한다.

const SendMessage = () => {
  stomp.debug = null;
  const data = {
    type: "TALK",
    roomId: roomId,
    sender: sender_nick,
    message: message,
    createdAt: now,
  };
  //예시 - 데이터 보낼때 json형식을 맞추어 보낸다.
  stomp.send("/pub/chat/message", token, JSON.stringify(data));
};
//웹소켓 데이터 전송 부분
```

#### stomp의 흐름

1. 서버와 연결할 클라이언트 객체를 생성
2. 서버와 연결할 클라이언트 connection
3. 메시지 전송 전 subscriber와 sender를 지정
4. subscribe를 하면 해당 url로 나에게 메시지를 보낼 수 있는 경로가 생김
5. sender를 하면 send하는 데이터를 해당 url로 전송
