let interacBackground
let interacClock
let interacForm
let interacGreeting
let interacToDoForm
let interacToDoList

let x = 0
let y = 0
let mouseX = 0
let mouseY = 0
let speed = 0.009

// 이전 onload를 불러오는 상수
const PREV_ONLOAD_INTERACEFFECT = window.onload

window.onload = function() {
    PREV_ONLOAD_INTERACEFFECT()
    
    interacBackground = document.querySelector(".bgImage")

    window.addEventListener('mousemove', mouseFunc, false)

    loop()
}

function mouseFunc(e) {
    x = (e.clientX - window.innerWidth / 2)
    y = (e.clientY - window.innerHeight / 2)
}

function loop() {
    mouseX += (x - mouseX) * speed
    mouseY += (y - mouseY) * speed

    interacBackground.style.transform = `scale(1.05) translate(${-(mouseX / 40)}px, ${-(mouseY / 40)}px)`

    window.requestAnimationFrame(loop)
}