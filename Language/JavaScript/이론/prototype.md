# 프로토타입

## 문제점?

```js
function Person() {
  this.eyes = 2;
  this.nose = 1;
}

let kim = new Person();
let park = new Person();

console.log(kim.eye); // 2
console.log(kim.nose); // 1
console.log(park.eye); // 2
console.log(park.nose); // 1
```

kim과 park은 Person의 eyes와 nose를 공통으로 가지고 있지만 메모리에는 eyes 2개, nose 2개 씩 총 4개가 할당된다.
객체가 100개, 1000개를 만들면, 메모리에 200개, 2000개가 할당이 되게 되는 문제가 생긴다.

## 해결책

이러한 문제를 해결하기 위해서 `Prototype`을 사용한다.

```js
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

console.log(kim.eye); // 2
console.log(kim.nose); // 1
console.log(park.eye); // 2
console.log(park.nose); // 1
```

`Person.Prototype`이라는 빈 Object가 메모리 어딘가에 존재하고 kim과 park은 그 Object에 있는 값을 사용할 수 있다. 이렇게 된다면 eyes와 Nose를 공유하기 때문에 메모리에 2개만 할당이 된다.

## Prototype Link & Prototype Object

`Prototype`은 `Prototype Link`와`Prototype Object`로 이루어져 있다.

객체는 함수로 생성이 된다.

```js
function Person() {} // 함수

let personObject = new Person(); // 함수로 객체 생성
```

함수가 정의될때 2가지 일이 동시에 이루어진다.

## 1. Constructor(생성자) 자격 부여

생성자 자격이란 `new`를 통해 객체를 생성할 수 있는 자격을 말한다.
함수는 선언되며 생성자 자격을 얻게 된다. 단 화살표 함수는 생성자 자격을 얻지 않는다
화살표 함수는 생성자 함수가 아니기 떄문이다.

```js
function Person() {} // 생성자 자격 획득
const Person2 = () => {}; // 생성자 자격 획득 X
```

## 2. Prototype Object 생성 및 연결

<img src='https://blog.kakaocdn.net/dna/58ONQ/btrfqCxbRzi/AAAAAAAAAAAAAAAAAAAAACfbootDype6GZrmBgaGna07XweTpmoC6eGIyBHyL7VJ/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1767193199&allow_ip=&allow_referer=&signature=Qy%2FYLkDAt9SiQnyTh9qU8gGVnNI%3D'/>

위 이미지처럼 함수가 생성될때 `Person Prototype Object` 또한 같이 생성이 되게 된다. `Person Prototype Object`는 `prototype`으로 접근 가능하다
`Person Prototype Object`는 `constructor`와 `__proto__`를 가지고 있으며,
`constructor`는 해당 `prototype을` 어떤 함수가 생성했는지를 가르키고 있고, `__proto__`는 `prototype link`이다.

예체 코드를 다시 보면

```js
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;
```

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FeNRe8K%2FbtrfuJPSacj%2FAAAAAAAAAAAAAAAAAAAAAEzlVJdXCTAfcjSxQqN2g1bmoPYYtCxQOjn3k8WKdDXx%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3D%252B85OJXvH3kG%252FB4x7QasU%252FyD%252Fmh0%253D'/>

Prototype.Object는 객체임으로 속성을 추가/삭제 할 수 있으며, kim과 park은 Person 함수를 통해 생성이 되었기 때문에 eyes와 nose에 접근을 할 수 있다.

```js
function Person() {}

Person.prototype.eyes = 2;
Person.prototype.nose = 1;

let kim = new Person();
let park = new Person();

console.log(kim.eyes); // => 2
```

<img src='https://blog.kakaocdn.net/dna/Hc1cq/btrfqh7EjJw/AAAAAAAAAAAAAAAAAAAAAM1CmcJn6RxcPOtl5KGsdnj6a5P54z0DDFnNmiAqVeQh/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1767193199&allow_ip=&allow_referer=&signature=%2FK5pOugSwtwye9TKafyY7oDJEvE%3D' />

kim에는 eyes라는 속성이 없지만 kim.eyes를 실행하면 2라는 값이 나오게 된다. `Person Prototype Object`의 eyes 속성을 참조한 것이다.

### `__proto__`

`__proto__` 속성이 kim이 `Person Prototype Object`의 속성을 참조할 수 있게 해주는데, `prototype` 속성과 달리 `__proto__` 속성은 모든 객체가 가지고 있다. **proto**는 객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킨다.

kim 객체는 Person으로부터 생성이 되었으니 `Person Prototype Object`을 가리키고 있는 것이다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fop5Zb%2Fbtrfp2QqOWV%2FAAAAAAAAAAAAAAAAAAAAAMpaL_6gKdeHuIP7GwdK1mYAExCh0gFbSo-jlwHOALOx%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DY1tx7DthSs9YjDm8ZF3uvgYsCg0%253D' />

kim은 생성자 함수가 아니기 때문에 `prototype` 속성은 없다

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FHtIUD%2FbtrfqCqrfv7%2FAAAAAAAAAAAAAAAAAAAAAJDmxQynIU9p3OzasESJ4LksBLlXPIPnpN-HTGbTB9JS%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DpMvgFBTViKSfzmx2epO5zoZ2ilg%253D' />

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FeJ2MHI%2FbtrfqCDW6TY%2FAAAAAAAAAAAAAAAAAAAAAByFIRAhh20zr1AOzc3Us-xUXzlS11gmtKYUlroRBWyR%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3DT1R63GVFK9c5O82gpfn6L7KeGMI%253D'/>

kim의 `__proto__`는 `Person Prototype Object`을 가르키고 있는데, 이는 kim 객체에 eyes 속성이 없기 때문에 상위 객체로 올라가며 eyes를 찾기 때문이다. `Person Prototype Object`에도 없으면 undefined를 반환한다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcxHZjr%2FbtrfqC42ZON%2FAAAAAAAAAAAAAAAAAAAAAEBMf5DBHCbNOI7oIxhHJB4gKQ7Gq71ybkbzMSW0ugEv%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1767193199%26allow_ip%3D%26allow_referer%3D%26signature%3D5IVBaQFZzQV4EncmgtqKwrzrCQw%253D' />

`kim.eyes`를 100으로 변경했는데 `park.eyes`가 그대로인 이유는 `kim.__proto__.eyes`를 사용하지 않았기 때문이다. `kim.eyes = 100`은 kim 객체에 eyes 속성을 새로 생성하는 것이다. `체이닝`에 의해 kim 객체의 eyes 속성이 있는지부터 확인하기 때문이다. `kim.__proto__.eyes`는 Person의 eyes의 값을 바꾸는 것이다.
