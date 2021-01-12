const USER_LS = "currentUser",
    SHOWING_ON = "showing",
    PREV_ONLOAD = window.onload

let form, input, greeting

window.onload = function() {
    PREV_ONLOAD()

    form = document.querySelector(".js-form")
    input = form.querySelector("input")
    greeting = document.querySelector(".js-greeting")

    initGreeting()
}

function saveName(text) {
    localStorage.setItem(USER_LS, text)
}

function handleSubmit(event) {
    event.preventDefault()
    const currentValue = input.value
    paintGreeting(currentValue)
    saveName(currentValue)
}

function askForName() {
    form.classList.add(SHOWING_ON)
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON)
    greeting.classList.add(SHOWING_ON)
    greeting.innerText = `Hello, ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS)
    if(currentUser === null) {
        askForName()
    } else {
        paintGreeting(currentUser)
    }
}

function initGreeting() {
    loadName()
}