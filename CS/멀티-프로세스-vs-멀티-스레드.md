# 멀티 프로세스와 멀티 스레드

## 멀티 프로세스

멀티 프로세스는 하나의 프로그램에서 여러 개의 프로세스를 실행 할 수 있게 하는 기술이다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FFhV9X%2Fbtr5Zk0YNaj%2FAAAAAAAAAAAAAAAAAAAAAAAl7X6q1dC1Mz1n4tLNjCcWVLHMNuuzBI7rLSh-u6Ma%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DO%252FnLRdlp5xwpBK4BRpY1bp2%252BPJk%253D' style="width: 500px; "/>

멀티 프로세스의 구조는 부모 프로세스와 자식 프로세스가 존재하는데, 부모 프로세스는 자식 프로세스를 생성하고 관리할 수 있다. 프로세스는 자신만의 Id를 가지는데 이를 PID(Process Id)라고 하며, 부모 프로세스는 자식 프로세스의 PID를 알고 있어 자식 프로세스를 관리할 수 있다. 자식 프로세스도 부모 프로세스의 PPID를 알고 있어 부모 프로세스와 통신을 할 수 있다.

부모 프로세스와 자식 프로세스는 통신이 가능할 뿐이지 다른 프로세스이기 때문에 독립적으로 실행되며 메모리 공간 또한 독립적인 공간을 가진다.

크롬 같은 웹 브라우저의 탭들이 멀티 프로세스의 예시이다. 각각의 탭은 독립적인 프로세스이기 때문에, 한 탭이 멈춰도 다른 탭은 정상 작동한다.

## 멀티 프로세스의 장점

### 1. 프로그램 안정성

멀티 프로세스는 각 프로세스가 독립적인 메모리 공간을 가지므로, 한 프로세스가 비정상적으로 종료 되어도 다른 프로세스는 멀쩡하게 작동한다. 그래서 멀티 프로세스를 사용하면 프로그램 전체의 안정성을 확보할 수 있다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcYWWkm%2Fbtr74vyHiea%2FAAAAAAAAAAAAAAAAAAAAAJm0ZutO8klptW6IPE_yU3LQeJ_2wWlqCZmqGp_EO6tN%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DC2mEkZIhfE0EJ6uYNDEiFi0WKnw%253D'/>

### 2. 프로그램 병렬성

멀티 프로세스와 여러개의 cpu 코어를 사용하여 각 프로세스를 병렬적으로 실행해 성능을 향상 시킬 수 있다.
하지만 이는 멀티 스레드도 가지는 장점이다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fra7qE%2Fbtr7TkxScdB%2FAAAAAAAAAAAAAAAAAAAAAOXfhEOBiGTHN3hR0Tz8AF6qlkkteTqbCujxjUjWEEwX%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3Dw4Nwohhc90GjalUNiwT7T7rQ6gA%253D'/>

### 3. 시스템 확장성

멀티 프로세스는 각 프로세스가 독립적이기 때문에 이를 이용해 시스템을 쉽게 확장 할 수 있다. 서버를 개발할때 수많은 요청을 처리하기 위해서 여러대의 서버를 두고 클라이언트 요청을 분산시키는데, 이는 여러대의 서버는 컴퓨터를 많이 설치하는 것과 성능이 좋은 컴퓨터에 여러 프로세스를 두는 것을 말하기도 한다. 멀티 프로세스는 여러 프로세스를 두는 쪽이라고 할 수 있다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbcozTV%2Fbtr72XPgQV8%2FAAAAAAAAAAAAAAAAAAAAAEL3Q6lXM_SUF4r0RZAZMgyZwjODIU3gb5nyYAWcbR1s%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3Djo7OMoSPYwTQ1%252FHg%252B99Li3pBT5w%253D'/>

## 멀티 프로세스의 단점

### 1. Context Switching Overhead

멀티 태스킹을 할 떄 특정 작업에서 다른 작업으로 이동하는 과정을 Context Switching 이라고 한다. 멀티 프로세스 기술은 Context Switching 과정에서 성능 저하가 올 수 있다. 프로세스를 컨텍스트 스위칭 하려면, CPU는 다음 프로세스의 정보를 가져오기 위해 메모리를 검색하고 캐시를 초기화 하는 과정을 가져야하는데, 이로인해 비용 오버헤드가 발생할 수 있다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fc8hWqD%2Fbtr6rw5WrBY%2FAAAAAAAAAAAAAAAAAAAAAHTWgYrVy0Re_iQpkQfFJlDumUx0je0lE5NcURsx-pZg%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DFW%252FvqbleumQLiucKJ8YUeS63k3U%253D'/>

### 2. 자원 공유 비효율성

멀티 프로세스는 각 프로세스가 독립적인 메모리 공간을 가지기 때문에, 메모리 사용량이 증가하게 된다. 또한 각 프로세스에서 정보를 공유하기 위해서는 복잡한 통신기법인 IPC를 사용해야한다. IPC란 프로세스 간에 정보를 주고받는 매커니즘을 말하는데, IPC는 데이터를 복사하거나 버퍼링 하는 과정에서 오버헤드가 발생하며 코드 또한 복잡해지게 된다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FwHlQM%2Fbtr53ErRepe%2FAAAAAAAAAAAAAAAAAAAAAD46KjyowVq2-KonycoDI7wtuSM5RMZGr0BUuY_dAqur%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DpS7U1zGVjNhUC6aVqpXTsTfJNyY%253D'/>

## 멀티 스레드

스레드는 하나의 프로세스에 있는 실행 흐름이다. 멀티 스레드는 그러한 스레드가 하나의 프로세스에 여러 스레드가 있게 하는 기술을 말한다. 웹 브라우저에서도 멀티 스레드를 사용하는데 한개의 탭 안에서 브라우저 이벤트 루프, 네트워크 처리, I/O 및 기타 작업등을 각 스레드로 처리한다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbvfndW%2FbtrjAeFcoaB%2FAAAAAAAAAAAAAAAAAAAAAOdb-xApaHs3xDEyCz0XdXyfF5hcWjyjJ8qi9pQzUcnS%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3D8VEdh2L1O0y0METtEtx964By9s0%253D'/>

## 멀티 스레드의 장점

일단 말하자면 멀티 프로세스보다 멀티 스레드가 더 좋다. 그 이유를 작성하겠다

### 1. 스레드는 프로세스보다 가볍다

스레드는 프로세스 안에서 생성하기 떄문에 실행 환경을 설정하는 작업이 매우 간단하여 생성 및 종료가 빠르다. 또한 스레드는 코드, 데이터, 스택 영역을 제외한 영역을 공유하기 때문에, 내장되어 있는 데이터 용량이 프로세스 보다 작다.

### 2. 자원의 효율성

스레드는 프로세스와 달리 head 영역에 있는 데이터 공유가 가능하다. 그렇기 때문에 IPC를 사용하지 않아도 되어서 시스템 자원 소모가 줄어든다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbilJ94%2Fbtr6rxcJ12e%2FAAAAAAAAAAAAAAAAAAAAAH3ETtL36z7FBnvPihJDc_MGbB9nHQ1-VsFfYCGm0rEF%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3Dw8YjjIGGXCfbbkwa%252B57Vzoyhg9c%253D' />

### 3. Context Switching 비용 감소

스레드에서 Context Switching 오버헤드가 존재하지만 프로세스의 오버헤드보다는 훨씬 적은 편이다. 프로세스는 Context Switching을 하기 위해 cpu 캐시를 초기화하고 메모리에서 다음 프로세스의 정보를 검색해야 하지만, 스레드는 스레드 간의 공유 자원을 제외한 스레드 정보(stack, register)만을 교체하면 되기 때문에 Context Switching 비용이 상대적으로 낮다

### 4. 응답시간 단축

위에서 설명한 장점을 멀티 스레드는 가지고 있어며, 여러 개의 스레드가 하나의 프로세스 내에서 요청을 할 수 있기 때문에 빠른 응답 시간을 보장할 수 있다.

## 멀티 스레드의 단점

### 1. 안정성 문제

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FL5gYp%2Fbtr6eUGAI4R%2FAAAAAAAAAAAAAAAAAAAAAGU8ARIsenk0ahkwht_bCVsAuj8WXD2lQQ7y74k5-HvH%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DQO7Hr9y7OHb7bHPin8ZkGnCTciU%253D'/>
멀티 프로세스에서는 프로세스가 각각 독립되어 있기 때문에 한개의 프로세스가 멈추더라도 나머지 프로세스는 정상 작동한다. 하지만 멀티 스레드에서는 하나의 스레드에서 문제가 발생하면 다른 스레드들도 멈출 수도 있다. 그렇기 때문에 개발자는 적절한 예외처리를 해두어야 한다.

### 2. 동기화로 인한 성능 저하

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbmehI6%2Fbtr736r6Tw6%2FAAAAAAAAAAAAAAAAAAAAAGvhoPb4jYca_UN6ChTNUQYZaFnbT8oF_NZR4WnOjmjl%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DaCE9s0I5%252FEcYvnU4yxqZP2qTe50%253D'/>
스레드는 자원을 공유해 사용하기 때문에, 여러 스레드가 동시에 한 데이터에 접근할 수 있는데 그렇게 된다면 두개의 스레드가 동시에 자원을 바꾸는 문제가 생겨 동기화를 통해 하나의 스레드씩 자원에 접근할 수 있도록 통제 해야한다. 그러나 동기화 작업은 여러 스레드의 접근을 제한하는 것이기 때문에 병목 현상이 일어나게 된다.

### 3. 데드락

데드락이란 다수의 프로세스나 스레드가 서로 자원을 점유하고, 다른 프로세스나 스레드가 점유한 자원을 기다리는 상황에서 발생하는 교착 상태를 말한다. 여러개의 스레드가 서로 대기하며 무한 대기를 하는 증상과 같다고 보면 된다.
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbgRSP9%2Fbtr6ouO1S99%2FAAAAAAAAAAAAAAAAAAAAAC5JI82h0OfsK4UEvs2vzZ322wyJ1EJ-vYCwg_jYyHQc%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DyPu9qBX6k%252BOzQFRRUwtXtLr0AlI%253D'/>
위 이미지처럼 다수의 쓰레드가 같은 lock을 동시에, 다른 명령에 의해 획득하려 할 때 서로 절대 불가능한 일을 계속적으로 기다리는 상황을 이야기 한다. 이러한 문제흘 해결하기 위해, 상호배제, 점유와 대기, 비선점, 순환 대기 등의 알고리즘으로 극복해야한다.
데드락은 멀티 스레드만의 단점이 아닌 멀티 프로세스와 멀티 스레드의 공통된 단점이다. 프로세스 또한 IPC로 메모리를 공유하기 때문이다.

### 4. Context Switching Overhead

멀티 스레드의 Context Switching이 멀티 프로세스보다 가볍다고 하지만, 오버헤드 비용을 무시할 수는 없다. 특히 스레드 수가 많으면 많을 수록 Context Switching이 많이 발생하게 되고 이는 성능 저하로 이어진다. 그렇기 떄문에 스레드가 많을 수록 좋아질까? 라는 질문에는 Context Switching Overhead를 알고 있는 우리는 답변을 좀 더 생각해 봐야할지도 모르겠다.
