const h1 = document.querySelector("div.hello:first-child h1");

function handleh1Click() {
  // if (h1.classList.contains(clickedClass)) {
  //   // h1의 클래스에 clickedClass가 있는지 확인
  //   h1.classList.remove(clickedClass); // clickedClass가 있다면 제거
  // } else {
  //   h1.classList.add(clickedClass); // clickedClass가 없다면 추가
  // }
  // // 이를 이용하여 원래 남아있던 class 값을 보존가능
  h1.classList.toggle("clicked"); // 위 코드를 toggle 함수 하나로 끝냄.
}

h1.addEventListener("click", handleh1Click);
