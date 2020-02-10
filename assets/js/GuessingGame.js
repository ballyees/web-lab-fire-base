var guess_set = []
var PrevGuess = ''
var random_number = Math.floor((Math.random() * 100) + 1)
var isRight = false
console.log(random_number)

function show(id) {
    document.getElementById(id).style['visibility'] = ''
}

function disable(id) {
    document.getElementById(id).disabled = true
}

function checkEHL(number, guess) {
    if (number == guess) {
        let message1 = document.getElementById('message2userSoW')
        message1.className = 'bg-success color-palette'
        message1.innerText = 'Congratulation! You got right!'
        document.getElementById('message2user').innerText = ''
        show('restart')
        disable('InputGuess')
        disable('btn1')
    } else if (number > guess) {
        let message1 = document.getElementById('message2userSoW')
        message1.className = 'bg-danger color-palette'
        message1.innerText = 'Wrong!'
        document.getElementById('message2user').innerText = 'Last guess was too high!'
    } else {
        let message1 = document.getElementById('message2userSoW')
        message1.className = 'bg-danger color-palette'
        message1.innerText = 'Wrong!'
        document.getElementById('message2user').innerText = 'Last guess was too low!'
    }
    if (guess_set.length == 10 && !isRight) {
        let h6c = document.getElementById('message2userSoW')
        h6c.className = 'bg-danger color-palette'
        h6c.innerText = '!!!GAME OVER!!!'
        show('restart')
        disable('InputGuess')
        disable('btn1')
    }
}


function process() {
    value = document.querySelector('input').value
    console.log(value)
        // console.log(document.querySelector('input').value, typeof(value))
    if (guess_set.length < 10 && !isNaN(value)) {
        guess_set.push(value)
        PrevGuess += value + ' '
    } else {
        alert('can\'t checked because not number! or > 10')
    }

    document.querySelector('input').value = ''

    if (guess_set.length > 0) {
        show('GuessSubmit')
        if (guess_set.length <= 10 && !isNaN(value)) {
            document.getElementById('PreviosGuesses').innerText = PrevGuess
            checkEHL(value, random_number)
        }
    }
}

function reload() {
    location.reload()
}