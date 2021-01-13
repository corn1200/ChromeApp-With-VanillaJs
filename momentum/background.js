// 랜덤으로 출력할 배경화면의 갯수와
// 이전 onload를 불러오는 상수
const IMG_NUMBER = 3,
    PREV_ONLOAD_BACKGROUND = window.onload

// body 부분을 할당할 변수
let body

// 이전 onload를 실행하고 body를 변수에 할당함
// 파일에서 담당하는 모든 기능을 실행
window.onload = function() {
    PREV_ONLOAD_BACKGROUND()

    body = document.querySelector("body")

    initBackground()
}

// 랜덤한 숫자를 받고 랜덤한 이미지를 선택하여
// 배경화면으로서 출력함
function paintImage(imgNumber) {
    const image = new Image()
    image.src = `image/${imgNumber + 1}.jpg`
    image.classList.add("bgImage")
    body.append(image)
}

// 랜덤한 숫자를 생성하고 반환함
function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER)
    return number
}

// 파일에서 담당하는 모든 기능을 실행
// 랜덤한 숫자를 생성함
// 생성한 숫자에 해당하는 이미지를 출력
function initBackground() {
    const randomNumber = genRandom()
    paintImage(randomNumber)
}