
let timeout
let timeDiv = document.getElementById("time")
let timeCounter = 11
let trueCounter = 0
let falseCounter = 0
let trueAnswer = document.getElementById("true")
let falseAnswer = document.getElementById("false")
let first = document.getElementById("first")
let plus = document.getElementById("plus")
let second = document.getElementById("second")
let input = document.getElementById("input")

const randomSum = function (from, to) {
    let range = to - from + 1
    let random = Math.floor(Math.random() * 1000)
    random = random % range + from
    console.log(random)
    return random
}
const getData = function () {
    let sum = randomSum(2, 10)
    let first = randomSum(1, sum - 1)
    let second = sum - first
    return {
        sum,
        first,
        second
    }
}

const time = function () {
    timeCounter -= 1
    timeDiv.innerText = "Часу залишилося " + timeCounter
    timeout = setTimeout(time, 1000)
    if (timeCounter === 0) {
        
        checkResalt()
        return
    }
}

time()

const refresh = function (data) {
    first.innerText = data.first
    second.innerText = data.second
    input.value = ""
    input.focus()
}

let data = getData()
refresh(data)

const checkResalt = function () {
    if (data.second + data.first == input.value) {
        timeCounter = 11
        time()
        trueCounter += 1
        trueAnswer.innerText = "Правильних відповідей : " + trueCounter
        data = getData()
        clearTimeout(timeout)
        refresh(data)
    }
    else {
        timeCounter = 11
        time()
        falseCounter += 1
        falseAnswer.innerText = "НЕ правильних відповідей : " + falseCounter
        data = getData()
        clearTimeout(timeout)
        refresh(data)
    }
}

const keyDown = function (e) {
    if (e.keyCode === 13) {
        checkResalt()
    }
}
input.onkeydown = keyDown;