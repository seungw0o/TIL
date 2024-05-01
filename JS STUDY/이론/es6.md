# es6 반복문이란?

> es6란 JavaScript의 버전을 말한다.

---

### map()

- map 함수는 입력한 배열의 정보중 한조각을 받아 새로운 값을 반환한다.
- 때로는 정보의 일부를 반환하기도 한다.
- 또는 정보를 변형해서 새로운 값을 반환하기도 한다.

  - 예를 들어 모든 값을 대문자로 변환하거나 정수를 화폐 단위로 변환해서 새로운 배열로 반환 가능하다.
  <pre>
  <code>
    let arr = [1,2,3,4,5];
    let newArr = arr.map( (val, idx) => val * val ); // idk 라는 값에   idx * idx 값을 넣는다.
    console.log ( newArr ); // [1,4,9,16,25]
  </code>
  </pre>

<br/>
<br/>
