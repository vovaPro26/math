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
let howManyExamples = document.getElementById("examplesSolved")
let timeoutStop


let stopAll
const reset = function() {
    // clearTimeout(timeout)
    stopAll = true
    falseAnswer.innerText = ""
    trueAnswer.innerText = ""
    input.value = ""
    falseCounter = 0
    trueCounter = 0
    start.classList.remove("hiden")
    conteiner.classList.add("hiden")
    return 
}

const randomSum = function (from, to) {
    let range = to - from + 1
    let random = Math.floor(Math.random() * 1000)
    random = random % range + from
    console.log(random)
    return random
}
const getDataPlus = function () {
    let skladTo = document.getElementById("skladTo")
    let skladFrom = document.getElementById("skladFrom")
    let skladFromValue = parseInt(skladFrom.value)
    let skladToValue = parseInt(skladTo.value)
    skladFromValue = Math.floor(skladFromValue)
    skladToValue = Math.floor(skladToValue)
    if(skladFromValue <= 1 || skladToValue <= 1) {
        reset()
        if(skladToValue <= 1) skladTo.focus()
        if(skladFromValue <= 1) skladFrom.focus()
        alert("Не не не. Дуже просто")
        return
    }
    if(skladToValue < skladFromValue) {
        reset()
        alert("Число яке вказано у Від не повинно бути більше ніж число яке вказане в До")
    }
    let sum = randomSum(parseInt(skladFrom.value), parseInt(skladTo.value))
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
    let skladFrom = document.getElementById("skladFrom")
    let skladTo = document.getElementById("skladTo")
    let skladFromValue = parseInt(skladFrom.value)
    let skladToValue = parseInt(skladTo.value)
    skladFromValue = Math.floor(skladFromValue)
    skladToValue = Math.floor(skladToValue)
    if(skladFromValue <= 1 || skladToValue <= 1) {
        reset()
        if(skladToValue <= 1) skladTo.focus()
        if(skladFromValue <= 1) skladFrom.focus()
        alert("Не не не. Дуже просто")
        return
    }
    if(skladToValue < skladFromValue ) {
        reset()
        alert("Число яке вказано у Від не повинно бути більше ніж число яке вказане в До")
    }
    let first = randomSum(parseInt(skladFrom.value), parseInt(skladTo.value))
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
    clearTimeout(timeout)
    if (timeCounter === 0) {
        checkResalt()
        return
    }
    timeout = setTimeout(time, 1000)
    if(timeoutStop){
        return
    }
}


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
    sineMasiv = []
    const signCheckBoxes = document.getElementsByName("sign")
    for (let i = 0; i <= signCheckBoxes.length - 1; i++) {
        if (signCheckBoxes[i].checked) {
            sineMasiv.push(signCheckBoxes[i].value)
        }
    }

}
const getData = function () {
    let count = 0
    let index = randomSum(0, sineMasiv.length - 1)
    const signMasiveIndex = sineMasiv[index];
    if (signMasiveIndex === "minus") {
        count++
        return getDataM()
    }
    if (signMasiveIndex === "plus") {
        count++
        return getDataPlus()
    }
    if (count === 0) {
        alert("Стоп, вибери шось")
        return false
    }
}



const exersise = function () {
    timeoutStop = true
    reset()
}

const checkResalt = function () {
    const res = parseInt(input.value)
    if (data.checker(res)) { 
        timeCounter = 11
        trueCounter += 1
        trueAnswer.innerText = "Правильних відповідей : " + trueCounter
        if (howManyExamples.value == falseCounter + trueCounter) {
            exersise()
            return
        }
        clearTimeout(timeout)
        time()
        data = getData()
        refresh(data)
    }
    else {
        timeCounter = 11
        falseCounter += 1
        falseAnswer.innerText = "НЕ правильних відповідей : " + falseCounter
        if (howManyExamples.value == falseCounter + trueCounter) {
            exersise()
            return
        }
        clearTimeout(timeout)
        time()
        data = getData()
        refresh(data)
    }
}

let data
const startTest = function () {
    start.classList.add("hiden")
    conteiner.classList.remove("hiden")
    checkBoxer()
    data = getData()
    if (data === false) {
        start.classList.remove("hiden")
        conteiner.classList.add("hiden")
        return
    }
    if(stopAll) {
        return
    }
    clearTimeout(timeout)
    time()
    refresh(data)
}

const keyDown = function (e) {
    if (e.keyCode === 13) {
        checkResalt()
    }
}
const keyDownStart = function (e) {
    if (e.keyCode === 13) {
        startTest()
    }
}
let startButomn




let skladTo = document.getElementById("skladTo")
skladTo.onkeydown = keyDownStart;
input.onkeydown = keyDown;