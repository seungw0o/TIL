let myImage = document.querySelector("img");

myImage.onclick = function () {
  // 이미지 변경 코드
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/다운로드.jpg") {
    myImage.setAttribute("src", "images/다운로드 (1).jpg");
  } else {
    myImage.setAttribute("src", "images/다운로드.jpg");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  // 개인화된 이름 추가하기
  let myName = prompt("Please enter your name");
  if (!myName || myName === null) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.innerHTML = "Mozilla is cool, " + myName;
  }
  localStorage.setItem("name", myName); // 서버 api에 저장
  myHeading.textContent = "Mozilla is cool, " + myName;
  if (!localStorage.getItem("name")) {
    setUserName();
  } else {
    let storedName = localStorage.getItem("name");
    myHeading.textContent = "Mozilla is cool, " + storedName;
  }
}

myButton.onclick = function () {
  setUserName();
};

//javascript 적용하기 연습
document.addEventListener("DOMContentLoaded", () => {
  function createParagraph() {
    const para = document.createElement("p");
    para.textContent = "You clicked the button!";
    document.body.appendChild(para);
  }

  const buttons = document.querySelectorAll("button");

  for (const button of buttons) {
    button.addEventListener("click", createParagraph);
  }
});
