// 좌표값으로 날씨를 표시할 API의 Key 값
// localstorage에 저장된 위도와 경도의 이름
// 이전 onload를 저장한 상수
const API_KEY = "1b9d3024cb88207299e87d357b8c7ee1",
    COORDS = 'coords',
    PREV_ONLOAD_WEATHER = window.onload

// 윈도우 로딩 후 이전 onload 동작을 실행
// 파일에서 담당하는 모든 기능을 실행함
window.onload = function() {
    PREV_ONLOAD_WEATHER()

    initWeather()
}

// 매개변수로 받은 오브젝트를 localstorage에
// 좌표값으로서 저장
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

// 현재 위치의 위도, 경도를 받아서 오브젝트로 변환
// localstorage에 저장함
function handleGeoSucces(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj)
}

// 위치 정보 제공을 거부하면 메세지를 콘솔에 출력
function handleGeoError() {
    console.log("Cant access geo location")
}

// 위치 정보 추적 허락 시 현재 위치의 위도, 경도를 저장
// 오브젝트로 변환하여 localstorage에 저장함
// 거부할 시 거부 메세지 콘솔에 출력
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

// 좌표값이 localstorage에 존재하지 않을 시
// 위치 정보를 새로 받음
function loadCoords() {
    const loadCoords = localStorage.getItem(COORDS)
    if (loadCoords === null) {
        askForCoords()
    } else {
        // getWeather
    }
}

// 좌표값을 불러옴
function initWeather() {
    loadCoords()
}