const USER_LS = "currentUser",
    SHOWING_ON = "showing",
    PREV_ONLOAD_GREETING = window.onload

let greetingForm, greetingInput, greeting

window.onload = function() {
    PREV_ONLOAD_GREETING()

    greetingForm = document.querySelector(".js-form")
    greetingInput = greetingForm.querySelector("input")
    greeting = document.querySelector(".js-greeting")

    initGreeting()
}

function saveName(text) {
    localStorage.setItem(USER_LS, text)
}

function handleGreetingSubmit(event) {
    event.preventDefault()
    const currentValue = greetingInput.value
    paintGreeting(currentValue)
    saveName(currentValue)
}

function askForName() {
    greetingForm.classList.add(SHOWING_ON)
    greetingForm.addEventListener("submit", handleGreetingSubmit)
}

function paintGreeting(text) {
    greetingForm.classList.remove(SHOWING_ON)
    greeting.classList.add(SHOWING_ON)
    greeting.innerText = `Hello, ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS)
    if (currentUser === null) {
        askForName()
    } else {
        paintGreeting(currentUser)
    }
}

function initGreeting() {
    loadName()
}