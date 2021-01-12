let clockContainer, clockTitle

window.onload = function() {
    clockContainer = document.querySelector(".js-clock")
    clockTitle = document.querySelector("h1")

    init()
}

function getTime() {
    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const seconds = date.getSeconds()
    clockTitle.innerText = `${hours}:${minutes}:${seconds}`
}

function init() {
    getTime()
}