const TODOS_LS = 'toDos',
    toDos = [],
    PREV_ONLOAD_TODOLIST = window.onload

let toDoForm, toDoInput, toDoList

window.onload = function() {
    PREV_ONLOAD_TODOLIST()

    toDoForm = document.querySelector(".js-toDoForm")
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList")

    initToDoList()
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function paintToDo(text) {
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    const span = document.createElement("span")
    const newId = toDos.length + 1
    delBtn.innerText = "❌"
    span.innerText = text
    li.appendChild(delBtn)
    li.appendChild(span)
    li.id = newId;
    toDoList.appendChild(li)
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj)
    saveToDos()
}

function handleToDoListSubmit(event) {
    event.preventDefault()
    const currentValue = toDoInput.value
    paintToDo(currentValue)
    toDoInput.value = ""
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS)
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos)
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        })
    }
}

function initToDoList() {
    loadToDos()
    toDoForm.addEventListener("submit", handleToDoListSubmit)
}