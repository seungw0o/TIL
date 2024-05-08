let myImage = document.querySelector("img");

myImage.onclick = function () {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/다운로드.jpg") {
    myImage.setAttribute("src", "images/다운로드 (1).jpg");
  } else {
    myImage.setAttribute("src", "images/다운로드.jpg");
  }
};
