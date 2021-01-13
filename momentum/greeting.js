// localstorage에 저장된 유저명의 key 값
// 요소를 보여주기 위한 class 명
// 이전 window.onload의 동작을 저장함
const USER_LS = "currentUser",
    SHOWING_ON = "showing",
    PREV_ONLOAD_GREETING = window.onload

// 유저명을 입력하는 폼, 유저명을 입력하는 칸
// 유저가 있을 시 출력하는 텍스트 부분
let greetingForm, greetingInput, greeting

// 윈도우 로딩 후 이전 onload를 호출함
// 요소를 검색하여 변수에 할당함
// 현재 파일에서 담당하는 전체 기능을 실행함
window.onload = function() {
    PREV_ONLOAD_GREETING()

    greetingForm = document.querySelector(".js-form")
    greetingInput = greetingForm.querySelector("input")
    greeting = document.querySelector(".js-greeting")

    initGreeting()
}

// 매개변수로 받은 값을 localstorage의
// 유저명으로 저장함
function saveName(text) {
    localStorage.setItem(USER_LS, text)
}

// 폼의 기본 기능인 enter 시 데이터를
// 전송하는 기능을 막는 대신에
// input에 입력된 값을 이용하여
// 유저명을 포함한 인사가 출력되도록 함
// 유저명을 localstorage에 저장함
function handleGreetingSubmit(event) {
    event.preventDefault()
    const currentValue = greetingInput.value
    paintGreeting(currentValue)
    saveName(currentValue)
}

// 유저명이 존재하지 않을 시 입력란 표현
// 유저명을 입력하여 추가 동작을 진행하게 함
function askForName() {
    greetingForm.classList.add(SHOWING_ON)
    greetingForm.addEventListener("submit", handleGreetingSubmit)
}

// 유저명이 존재할 시 이름 입력란을 숨김
// 유저명을 출력할 h1 태그를 표현함
// 유저명이 포함된 인사를 출력함
function paintGreeting(text) {
    greetingForm.classList.remove(SHOWING_ON)
    greeting.classList.add(SHOWING_ON)
    greeting.innerText = `Hello, ${text}`
}

// localstorage에 유저명이 존재하는지 검색함
// 존재하지 않을 시 입력란을 제공함
// 존재할 시 유저명이 포함된 인사를 출력함
function loadName() {
    const currentUser = localStorage.getItem(USER_LS)
    if (currentUser === null) {
        askForName()
    } else {
        paintGreeting(currentUser)
    }
}

// 전체 기능을 담당하고 윈도우 로딩 시
// 처음 실행되고 localstorage에 있는
// 유저명을 검색함
function initGreeting() {
    loadName()
}