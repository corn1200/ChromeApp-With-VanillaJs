// 시계의 틀과 시간을 나타내는 텍스트
let clockContainer, clockTitle

// 윈도우 로딩 후에 요소를 검색하여 변수에 할당함
// 현재 파일에서 담당하는 전체 기능을 실행함
window.onload = function() {
    clockContainer = document.querySelector(".js-clock")
    clockTitle = document.querySelector("h1")

    initClock()
}

// 현재 시각을 시간을 나타내는 텍스트에 삽입
function getTime() {
    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const seconds = date.getSeconds()
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`
}

// 첫 호출시 현재 시각을 기입하고
// 이후 1초 간격으로 같은 기능을 실행함
function initClock() {
    getTime()
    setInterval(getTime, 1000)
}