// let isDone: boolean = false; // boolean 의 타입을 지정
// let decimal: number = 0; // 정수형 타입을 선언한 모습 (10진수, 8진수, 2진수, 16진수, 소수, 실수 등등 다 number로 가능)
// let str: string = "정승우"; // 문자열
// let list1: number[] = [1, 2, 3]; // 배열 선언
// let list2: Array<number> = [1, 2, 3]; // 재네릭으로 선언?
// let x: [string, number]; // 튜플(열거형)
// x = ["hello", 10]; // 오류가 나지 않음
// //x = [10, "hello"]; <= 오류
// let list3: Array<[string, number]> = [
//   // 배열 안에 튜플을 넣었더니? 잘 작동됨
//   ["a", 1],
//   ["b", 2],
// ];
// console.log(list3);

// enum Color { // c언어의 구조체와 비슷한 열거형 enum,
//   Red = 1, // Red에 1을 주었기 때문에 Red는 1로 불러 올 수 있음(Green은 2, Blue는 3), 주지 않으면 0부터 시작(Green은 1 ...), Red에 2를 주면 1의 값은 정의되지않음(undefined)
//   Green,
//   Blue,
// }
// let colorName: string = Color[1];
// console.log(colorName);

// let notSure: any = 4; // 모든 타입 사용 가능, js -> ts 할 때, any로 주고 점진적으로 수정할 때 사용하기도 함, 아니면 일부는 알고 일부는 알지 못할때
// notSure = "maybe a string instead";
// notSure = false;

// let unusable: void = undefined; // void는 undefined와 null만 할당 가능
// //unusable = null; // --strictNullChecks` 을 사용하지 않을때만 오류가 발생하지 않음

// let u: undefined = undefined; // undefined 타입은 undefined만 할당 (undefined는 값이 할당 되지 않은 상태)
// let n: null = null; // null 타입은 null만 할당 (의도적으로 값을 비워둔 상태)

// let un: number; // 이걸 js에서 log하면 undefined지만 ts에서는 log 또한 되지 않는다
// //let nu:number = null; // null과 undefined는 할당 불가

// let und: number | undefined = undefined; // 유니언 타입을 사용하여 undefined를 받아 올 수 있다
// let nul: number | null = null; // 위와 같은 방법으로 null도

// // function error(message: string): never {
// //   // 어떤 타입도 never에 할당 될 수 없다 never 타입은 사용을 지양하는 추세
// //   throw new Error(message);
// // }

// declare function create(o: object | null): void; //object는 원시 타입이 아닌 타입을 나타냅니다. 예를 들어, number, string, boolean, bigint, symbol, null, 또는 undefined 가 아닌 나머지를 의미합니다.

// // create({ prop: 0 }); // 성공
// // create(null); // 성공
// //create(42); // 오류

// let someValue: any = "this is a string"; // 타입 단언, 타입 변환, 컴파일 단계에서 확인하지 않음

// let strLength: number = (<string>someValue).length; // 실행값 16
// console.log(strLength);

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length; // as 문법
