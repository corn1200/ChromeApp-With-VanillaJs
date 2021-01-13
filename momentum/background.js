const IMG_NUMBER = 3,
    PREV_ONLOAD_BACKGROUND = window.onload

let body

window.onload = function() {
    PREV_ONLOAD_BACKGROUND()

    body = document.querySelector("body")

    initBackground()
}

function paintImage(imgNumber) {
    const image = new Image()
    image.src = `image/${imgNumber + 1}.jpg`
    image.classList.add("bgImage")
    body.prepend(image)
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER)
    return number
}

function initBackground() {
    const randomNumber = genRandom()
    paintImage(randomNumber)
}