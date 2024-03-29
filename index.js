let MOrP
let testPage = document.getElementById("testPage")
let startPage = document.getElementById("startPage")
let timeout
let timeDiv = document.getElementById("time")
let timeCounter = 11
let trueCounter = 0
let falseCounter = 0
let timeRefresh = 10
let trueAnswer = document.getElementById("true")
let falseAnswer = document.getElementById("false")
let first = document.getElementById("first")
let sine = document.getElementById("sign")
let second = document.getElementById("second")
let input = document.getElementById("input")
let timeoutStop
let mark = document.getElementById("mark")
let stopAll
let defaltSettings = {
    plus: true,
    minus: true,   
    multiplication: true,
    howManyExamples: 30,
    from: 5,
    to: 10,
    multiplicationOn: 2
}


const setSettings = function(sets) {
    let plusCheck = document.getElementById("plusCheck")
    plusCheck.checked = sets.plus
    let minusCheck = document.getElementById("minusCheck")
    minusCheck.checked = sets.minus
    let multiplicationCheck = document.getElementById("multiplicationCheck")
    multiplicationCheck.checked = sets.multiplication
    let howManyExamples = document.getElementById("examplesSolved")
    howManyExamples.value = sets.howManyExamples
    let skladFrom = document.getElementById("skladFrom")
    skladFrom.value = sets.from
    let skladTo = document.getElementById("skladTo")
    skladTo.value = sets.to
    let multiplicationNumber = document.getElementById("multiplicationNumber")
    multiplicationNumber.value = sets.multiplicationOn
}

setSettings(defaltSettings)


let getSettings = function() {
    let newSettings = {
        plus: document.getElementById("plusCheck").checked,
        minus: document.getElementById("minusCheck").checked,       
        multiplication: document.getElementById("multiplicationCheck").checked,
        howManyExamples: parseInt(document.getElementById("examplesSolved").value),
        from: parseInt(document.getElementById("skladFrom").value),
        to: parseInt(document.getElementById("skladTo").value),
        multiplicationOn: parseInt(document.getElementById("multiplicationNumber").value)
    }
    return newSettings
}

let allSettings = defaltSettings


const setResult = function(res) {
    let corectAnswers = document.getElementById("answCorrect")
    let wrongAnswers = document.getElementById("anwswWrong")
    let allAnswers = document.getElementById("allAnswers")
    let mark = document.getElementById("mark")

    corectAnswers.innerText = res.correctAnswers
    wrongAnswers.innerText = res.wrongAnswers
    allAnswers.innerText = res.allAnswers
    mark.innerText = res.mark
}


const reset = function() {
    stopAll = true
    falseAnswer.innerText = ""
    trueAnswer.innerText = ""
    input.value = ""
    falseCounter = 0
    trueCounter = 0
    timeRefresh = 10
    changePage(pages.startPage)
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
    let skladFromValue = allSettings.from
    let skladToValue = allSettings.to
    skladFromValue = Math.floor(skladFromValue)
    skladToValue = Math.floor(skladToValue)
    if(skladFromValue <= 1 || skladToValue <= 1) {
        reset()
        stopAll = false
        alert("Не не не. Дуже просто")
        return
    }
    if(skladToValue < skladFromValue) {
        reset()
        stopAll = false
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
    let skladFromValue = allSettings.from
    let skladToValue = allSettings.to
    skladFromValue = Math.floor(skladFromValue)
    skladToValue = Math.floor(skladToValue)
    if(skladFromValue <= 1 || skladToValue <= 1) {
        reset()
        stopAll = false
        if(skladToValue <= 1) skladTo.focus()
        if(skladFromValue <= 1) skladFrom.focus()
        alert("Не не не. Дуже просто")
        return
    }
    if(skladToValue < skladFromValue ) {
        reset()
        stopAll = false
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

const getDataMult = function () {
    let multOn = allSettings.multiplicationOn
    multOn = Math.floor(multOn)
    
    let first = getSettings().multiplicationOn
    let second = Math.floor(Math.random() * 10)
    let sign = "*"
    const checker = res => first * second === res
    return {
        sign,
        first,
        second,
        checker
    }
}


const time = function () {
    if(timeoutStop){
        return
    }
    timeCounter -= 1
    timeDiv.innerText = "Часу залишилося " + timeCounter
    clearTimeout(timeout)
    if (timeCounter === 0) {
        checkResalt()
        return
    }
    timeout = setTimeout(time, 1000)
}


const refresh = function (data) {
    first.innerText = data.first
    second.innerText = data.second
    sine.innerText = data.sign
    input.value = ""
    input.focus()
}
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

let plusTrue = ""
let minusTrue = ""
let multiplicationTrue = ""

const getData = function () {
    let count = 0
    let index = randomSum(0, sineMasiv.length - 1)
    const signMasiveIndex = sineMasiv[index];
    if(Math.floor(allSettings.multiplicationOn) <= 1){
        alert("Не не не. Дуже просто")
        reset()
        stopAll = false
    }
    if (signMasiveIndex === "minus") {
        minusTrue = ",Мінус"
        count++
        return getDataM()
    }
    if (signMasiveIndex === "plus") {
        plusTrue = ",Плюс"
        count++
        return getDataPlus()
    }
    if (signMasiveIndex === "multiplication") {
        multiplicationTrue = ",Множення"
        count++
        return getDataMult()
    }
    
    if (count === 0) {
        alert("Стоп, вибери шось")
        return false
    }
}

let resultPage = document.getElementById("resultPage")
let allAnswers = document.getElementById("allAnswers")

let shareData

const exersise = function () {
    timeoutStop = true
    let markResalt = trueCounter * 12 / allSettings.howManyExamples
    markResalt = Math.floor(markResalt)
    if(markResalt > 12) {
        markResalt -= 1
    }
    shareData = {
        title: "MDN",
        text: `Правильних вдповідей ${trueCounter}.\n\rНеправильних відповідей ${falseCounter}.\n\rОцінка ${markResalt}.\n\rПриклади на ${plusTrue} ${minusTrue} ${multiplicationTrue}.\n\r Діапазон чисел від ${skladFrom.value} до ${skladTo.value}.\n\r Число на яке множили - ${getSettings().multiplicationOn}.`
      };

    let resultModel = {
        correctAnswers: trueCounter,
        wrongAnswers: falseCounter,
        allAnswers: allSettings.howManyExamples,
        mark: markResalt
    }
    changePage(pages.resultPage)
    setResult(resultModel)
    
}

let btm = document.getElementById("shareButton")

btm.addEventListener("click", async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
    }
  });
  

const checkResalt = function () {
    const res = parseInt(input.value)
    if (data.checker(res)) { 
        timeCounter = 11
        trueCounter += 1
        trueAnswer.innerText = "Правильно : " + trueCounter
        if (allSettings.howManyExamples === falseCounter + trueCounter) {
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
        falseAnswer.innerText = "Неправильно : " + falseCounter
        if (allSettings.howManyExamples === falseCounter + trueCounter) {
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
    allSettings = getSettings()
    timeCounter = 11
    timeoutStop = false
    changePage(pages.testPage)
    checkBoxer()
    data = getData()
    if (data === false) {
        changePage(pages.startPage)
        return
    }
    if(stopAll === true) {
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

const lastContinue = function() {
    falseAnswer.innerText = ""
    trueAnswer.innerText = ""
    falseCounter = 0
    trueCounter = 0
    changePage(pages.startPage)
}


skladTo = document.getElementById("skladTo")
skladTo.onkeydown = keyDownStart;
input.onkeydown = keyDown;