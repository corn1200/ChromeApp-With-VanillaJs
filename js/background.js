// 이전 onload를 불러오는 상수
const ACCESS_KEY = "jebsyaTCtg0jqVCxl0CvfCmYIRg9UvctXOoLm5LRn0c"
    UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&query=landscape&orientation=landscape&feature=true`
    UNUSE_BACKGROUND = "https://source.unsplash.com/random"
    NONE = "None",
    PREV_ONLOAD_BACKGROUND = window.onload

// body 부분을 할당할 변수
let body, locationContainer

// 이전 onload를 실행하고 body를 변수에 할당함
// 파일에서 담당하는 모든 기능을 실행
window.onload = function() {
    PREV_ONLOAD_BACKGROUND()
    
    body = document.querySelector("body")
    locationContainer = document.querySelector(".location")

    initBackground()
}

function loadBackground() {
    const savedImage = localStorage.getItem("bg")
    if (savedImage === null) {
        getBackgroud()
    } else {
        const parsedImage = JSON.parse(savedImage)
        const today = new Date()
        if (today < parsedImage.expiresOn) {
            getBackgroud()
        } else {
            const image = new Image()
            image.src = parsedImage.url
            image.classList.add("bgImage")
            body.appendChild(image)

            parsedImage.name = parsedImage.name !== null ? parsedImage.name : NONE
            parsedImage.city = parsedImage.city !== null ? parsedImage.city : NONE
            parsedImage.country = parsedImage.country !== null ? parsedImage.country : NONE

            locationContainer.innerHTML = `${parsedImage.name}, 
            ${parsedImage.city}, ${parsedImage.country}`
        }
    }
    return
}

function saveBackgroud(imageUrl, city, country, name) {
    const savedImage = localStorage.getItem("bg")
    if (savedImage !== null) {
        localStorage.removeItem("bg")
    }
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 1)
    const imageObject = {
        url: imageUrl,
        expiresOn: expirationDate,
        city,
        country,
        name
    }
    localStorage.setItem("bg", JSON.stringify(imageObject))
    loadBackground()
    return
}

function getBackgroud() {
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(json => {
            const image = json
            if (image.urls && image.urls.full && image.location) {
                const fullurl = image.urls.full
                const location = image.location
                const city = location.city
                const country = location.country
                const name = location.name
                saveBackgroud(fullurl, city, country, name)
            } else {
                // getBackgroud()
                body.style.backgroundImage = `url(${UNUSE_BACKGROUND})`
            }
        })
    return
}

// 파일에서 담당하는 모든 기능을 실행
function initBackground() {
    loadBackground()
    return
}