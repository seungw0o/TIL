const h1 = document.querySelector("div.hello:first-child h1");

function handleh1Click() {
  const clickedClass = "active"; // class 이름을 개발자가 정한거로 그대로 사용하면 오타가 발생했을때, 찾기 어려움 그렇기 때문에 변수에 클래스 이름을 지정하여 사용한다.
  if (h1.className === clickedClass) {
    h1.className = "";
  } else {
    h1.className = clickedClass;
  }
}

h1.addEventListener("click", handleh1Click);
