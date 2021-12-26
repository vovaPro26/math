let MOrP
let conteiner = document.getElementById("conteiner")
let start = document.getElementById("start")
let plusChange = document.getElementById("plus")
let minusChange = document.getElementById("minus")
let timeout
let timeDiv = document.getElementById("time")
let timeCounter = 11
let trueCounter = 0
let falseCounter = 0
let trueAnswer = document.getElementById("true")
let falseAnswer = document.getElementById("false")
let first = document.getElementById("first")
let sine = document.getElementById("sign")
let second = document.getElementById("second")
let input = document.getElementById("input")

const randomSum = function (from, to) {
    let range = to - from + 1
    let random = Math.floor(Math.random() * 1000)
    random = random % range + from
    console.log(random)
    return random
}
const getDataPlus = function () {
    let sum = randomSum(2, 10)
    let first = randomSum(1, sum - 1)
    let second = sum - first
    let sign = "+"
    const checker = res => first + second === res
    return {
        first,
        second,
        sign,
        checker
    }
}

const getDataM = function () {
    let first = randomSum(2, 10)
    let second = randomSum(1, first - 1)
    let sign = "-"
    const checker = res => first - second === res
    return {
        sign,
        first,
        second,
        checker
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
let data
const startTest = function () {
    start.classList.add("hiden")
    conteiner.classList.remove("hiden")
    checkBoxer()
    data = getData()
    time()
    refresh(data)
}
// time()

const refresh = function (data) {
    first.innerText = data.first
    second.innerText = data.second
    sine.innerText = data.sign
    input.value = ""
    input.focus()
}
// const refreshM = function (data2) {
//     first.innerText = data2.first
//     second.innerText = data2.second
//     sine.innerText = data2.sign
//     input.value = ""
//     input.focus()
// }
let sineMasiv = []
const checkBoxer = function () {
    const signCheckBoxes = document.getElementsByName("sign")
    for (let i = 0; i <= signCheckBoxes.length - 1; i++) {
        if (signCheckBoxes[i].checked) {
            sineMasiv.push(signCheckBoxes[i].value)
        }
    }

}
const getData = function () {
    let index = randomSum(0,sineMasiv.length - 1)
    const signMasiveIndex = sineMasiv[index];
    if(signMasiveIndex==="minus"){
        return getDataM()
    }
    if(signMasiveIndex==="plus"){
        return getDataPlus()
    }
}



const checkResalt = function () {
    const res = parseInt(input.value)
    if (data.checker(res)) {
        timeCounter = 11
        time()
        trueCounter += 1
        trueAnswer.innerText = "Правильних відповідей : " + trueCounter
        clearTimeout(timeout)
        data = getData()
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