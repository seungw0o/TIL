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

# filter()

- 배열을 순회하면서 조건에 맞는 배열값만 통과시켜서 새로운 배열로 반환한다.
- map() 함수와는 다르게 데이터의 형태는 유지하면서 배열의 길이만 줄인다.
<pre>
<code>
let users = [
  { id: 11, name: 'Adam', age: 23, group: 'editor' },
  { id: 47, name: 'John', age: 28, group: 'admin' },
  { id: 85, name: 'William', age: 34, group: 'editor' },
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
];
let res = users.filter(it => it.name.includes('oli'));
console.log(res);
// res is []
</code>
</pre>

<br>

# reduce

- 배열을 줄여서 나가서 하나의 값을 만든다는 컨셉
- let les = arr.reduce( (acc, val, idx) => {}, 초기값); -> 모양
- 첫번째 인자는 초기값/누적값
- 두번째 인자는 배열값을 순회하며 처리
- 세번째 인자는 (idx) 인덱스값
- 네번째 인자는 기존배열 그대로 보여줌
