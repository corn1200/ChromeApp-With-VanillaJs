// localstorage의 ToDoList의 key 값
// localstorage의 ToDoList의 값을 저장할 배열
// 이전 window.onload의 동작을 저장함
const TODOS_LS = 'toDos',
    PREV_ONLOAD_TODOLIST = window.onload

// ToDoList를 작성하는 폼과
// ToDoList의 내용을 입력한 input
// ToDoList를 list로 출력하는 ul
let toDoForm, toDoInput, toDoList, 
    toDos = [], toDoListDelete

// 윈도우 로딩 후 이전 onload를 호출함
// 요소를 검색하여 변수에 할당함
// 현재 파일에서 담당하는 전체 기능을 실행함
window.onload = function() {
    PREV_ONLOAD_TODOLIST()

    toDoForm = document.querySelector(".js-toDoForm")
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList")
    toDoListDelete = toDoForm.querySelector("span")

    toDoInput.addEventListener('focusin', focusInToDoList)
    toDoInput.addEventListener('focusout', focusOutToDoList)
    toDoInput.addEventListener('input', inputToDoList)
    toDoListDelete.addEventListener('click', deleteToDoFormInput)

    initToDoList()
}

function switchToDoInput(isEmpty) {
    if (isEmpty) {
        toDoInput.style.marginRight = "14px"
        toDoListDelete.style.marginRight = "0px"
    } else {
        toDoListDelete.style.marginRight = "14px"
        toDoInput.style.marginRight = "0px"
    }
}

function deleteToDoFormInput() {
    toDoInput.value = ""
    toDoListDelete.style.display = "none"
    switchToDoInput(true)
    focusOutGreeting()
}

function inputToDoList() {
    if (toDoInput.value !== null,
        toDoInput.value !== "") {
        toDoListDelete.style.display = "inline"
        switchToDoInput(false)
    } else {
        toDoListDelete.style.display = "none"
        switchToDoInput(true)
        focusOutGreeting()
    }
}

function focusOutToDoList() {
    toDoInput.style.width = "6em"
    toDoInput.style.borderBottom = "3px solid rgba(255, 255, 255, 0.8)"
}

function focusInToDoList() {
    toDoInput.style.transition = "0.5s ease-in-out"
    toDoInput.style.width = "9em"
    toDoInput.style.borderBottom = "3px solid rgba(255, 255, 255, 1)"
}

// event를 받고 event를 호출한 버튼을 할당
// event를 호출한 요소의 부모 요소 list를 할당
// ToDoList를 관리하는 ul에서 삭제버튼을 누른
// list를 제거하고 filter 함수를 이용해
// 삭제된 id의 요소를 제외하고 다시 배열을 반환함
// toDos를 정리한 cleanToDos로 바꾸고
// localstorage에 현재 toDos를 저장함
function deleteToDo(event) {
    const btn = event.target
    const div = btn.parentNode
    toDoList.removeChild(div)
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(div.id)
    })
    toDos = cleanToDos
    saveToDos()
}

// localstorage에 toDos의 현재 배열 상태를 JSON 구조로
// 변환하여 초기화함
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

// li, button, span 요소를 생성함
// 각각 ToDoList를 담기 위한 list,
// ToDoList를 삭제하기 위한 button,
// ToDoList의 내용을 보여주는 영역,
// toDos 배열의 길이 + 1 한 id 값
// 삭제버튼에는 삭제버튼을 명시하는 emoji 추가
// 텍스트 영역에는 매개변수의 텍스트 삽입
// list에 삭제버튼과 ToDoList 내용을 차례대로 추가
// list의 id에는 이전 요소에서 + 1 한 id값 삽입
// ToDoList를 출력하는 ul인 toDoList에 list를 추가
// ToDoList의 내용과 id값을 가진 오브젝트를 생성
// toDos 배열에 오브젝트를 추가하고 localstorage에 
// 현재 toDos의 배열을 JSON으로 변환하고 초기화함
function paintToDo(text) {
    const div = document.createElement("div")
    const delBtn = document.createElement("button")
    const span = document.createElement("span")
    const newId = toDos.length + 1
    delBtn.innerText = "X"
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text
    div.appendChild(delBtn)
    div.appendChild(span)
    div.id = newId;
    toDoList.appendChild(div)
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj)
    saveToDos()
}

// 폼의 기본 동작을 막음
// input의 내용을 추출하여 ToDoList에 추가함
// input 내부를 다시 비워줌
function handleToDoListSubmit(event) {
    event.preventDefault()
    const currentValue = toDoInput.value
    paintToDo(currentValue)
    deleteToDoFormInput()
}

// localstorage에서 ToDoList를 가져옴
// ToDoList가 존재하면 JSON 형태로 변환하여
// 저장된 ToDoList를 모두 출력함
function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS)
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos)
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        })
    }
}

// ToDoList를 불러오고 ToDoList를 입력하는
// 폼에 submit 사용자 정의 이벤트를 할당함
function initToDoList() {
    loadToDos()
    toDoForm.addEventListener("submit", handleToDoListSubmit)
}