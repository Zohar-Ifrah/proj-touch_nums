
var gNums = setArray(4)  // array to set the board on the HTML
var gNextNumClick = 1    // current num to click
var gStartTime = null     // for the interval
var gInterval = 0

function onInit() {
    renderBoard(Math.sqrt(gNums.length))
    updateNextNum()
}

function renderBoard(size) {  // sets the board equal to the array size. Res size = size**2
    var strHTML = ''
    for (var i = 0; i < size; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < size; j++) {
            strHTML += `<td onclick="cellClicked(this)">${gNums.pop()}</td>`
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.board-display')
    elBoard.innerHTML = strHTML
}

function setArray(size) {  // sets the array by size**2 >> SHUFFLE it >> then return
    var nums = []
    var count = 0
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            count++
            nums.push(count)
        }
    }
    nums = shuffleArray(nums)
    return nums
}

function cellClicked(elClickedNum) { // if pressed on currect num: adds class found num (cahnge color 2 red) + starting timer + finish game code..
    if (+elClickedNum.innerText === gNextNumClick) {
        elClickedNum.classList.add('found-num')
        gNextNumClick++
        updateNextNum()
        if (gNextNumClick === 2) { // when starting the game
            gStartTime = Date.now()
            gInterval = setInterval(updateGameTime, 85)
        }
        var elTableCells = document.querySelectorAll('tbody td')
        if (gNextNumClick > elTableCells.length) { // if last number clicked >> stops interval 
            clearInterval(gInterval)
            var gameTime = document.querySelector('.game-time')
            var finishTime = gameTime.innerText.split(': ')[1]
            alert(`Congratulations!! you have finish the game in ${finishTime} seconds.`)
            resetGameTime()
        }
    }

}

function newGame() {
    resetGame()
    updateNextNum()
    clearInterval(gInterval)
    resetGameTime()
}

function resetGame() { // Remove all found-num class and reset gNextNumClick to 1
    var elTableCells = document.querySelectorAll('tbody td')
    elTableCells.forEach((cell) => {
        if (cell.classList.contains('found-num')) {
            cell.classList.remove('found-num')
        }
        gNextNumClick = 1

    })

}

function selectMode(elBtn) { //reset the board to the mode request 
    gNextNumClick = 1
    clearInterval(gInterval)
    updateNextNum()
    resetGameTime()
    switch (elBtn.innerText) {
        case 'Easy(16)':
            gNums = setArray(4)
            renderBoard(4)
            break
        case 'Hard(25)':
            gNums = setArray(5)
            renderBoard(5)
            break
        case 'Extrem!(36)':
            gNums = setArray(6)
            renderBoard(6)
            break
        default:
            break;
    }
}

function updateNextNum() {
    var elTableCells = document.querySelectorAll('tbody td')
    var displayNextNum = document.querySelector('.next-num')
    if (gNextNumClick > elTableCells.length) {
        displayNextNum.innerText = 'Next Number: 1'
        return //  if finish last num >> return (checked by number of current tabel cell)
    }
    displayNextNum.innerText = `Next Number: ${gNextNumClick}`  // update text for next num
}

function updateGameTime() {
    var currTime = (Date.now() - gStartTime) / 1000;
    var gameTime = document.querySelector('.game-time')
    gameTime.innerText = `Game Time: ${currTime}`
}

function resetGameTime() {
    var gameTime = document.querySelector('.game-time')
    gameTime.innerText = `Game Time: 0`
    gNextNumClick =1
}

function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}
