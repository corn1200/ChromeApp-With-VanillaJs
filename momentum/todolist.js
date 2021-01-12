const TODOS_LS = 'toDos',
    PREV_ONLOAD_TODOLIST = window.onload

let toDoForm, toDoInput, toDoList

window.onload = function() {
    PREV_ONLOAD_TODOLIST()

    toDoForm = document.querySelector(".js-toDoForm")
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList")

    initToDoList()
}

function paintToDo(text) {
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    delBtn.innerText = "❌"
    const span = document.createElement("span")
    span.innerText = text
    li.appendChild(delBtn)
    li.appendChild(span)
    toDoList.appendChild(li)
}

function handleToDoListSubmit(event) {
    event.preventDefault()
    const currentValue = toDoInput.value
    paintToDo(currentValue)
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS)
    if (toDos !== null) {
        
    }
}

function initToDoList() {
    loadToDos()
    toDoForm.addEventListener("submit", handleToDoListSubmit)
}