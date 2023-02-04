if (!localStorage.getItem('won')) {
    localStorage.setItem('won', 0)
}
if (!localStorage.getItem('draw')) {
    localStorage.setItem('draw', 0)
}
if (!localStorage.getItem('lost')) {
    localStorage.setItem('lost', 0)
}

document.getElementById('won').textContent = localStorage.getItem('won')
document.getElementById('draw').textContent = localStorage.getItem('draw')
document.getElementById('lost').textContent = localStorage.getItem('lost')


function resetStats() {
    localStorage.removeItem('won')
    localStorage.removeItem('draw')
    localStorage.removeItem('lost')
    localStorage.setItem('won', 0)
    localStorage.setItem('draw', 0)
    localStorage.setItem('lost', 0)
    window.location.reload()
}

let gameoverstatus = "";

let map = [
    "a1", "a2", "a3",
    "b1", "b2", "b3",
    "c1", "c2", "c3"
]
// Setting up player and opponent boxes
let playerBoxes = []
let opponentBoxes = []

// Setting player as the first turn
let currTurn = 0;

function init() {
    // Initialising map of board
    map = [
        "a1", "a2", "a3",
        "b1", "b2", "b3",
        "c1", "c2", "c3"
    ]
    // Setting up player and opponent boxes
    playerBoxes = []
    opponentBoxes = []

    // Setting player as the first turn
    currTurn = 0;
    // console.log(currTurn)

    document.querySelectorAll('.box').forEach((box) => {
        box.classList.remove('selected');
        box.innerHTML = "";
    })
}
init()

// Listing all possible win combinations
let wincombos = [
    ["a1", "b1", "c1"],
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
    ["a2", "b2", "c2"],
    ["a3", "b3", "c3"],
    ["a1", "b2", "c3"],
    ["c1", "b2", "a3"]
]


// console.log(wincombos)

// A function to check if a player has won or not
function findIfMatch(boxes) {
    let matches = 0;
    for (let i = 0; i < wincombos.length; i++) {
        matches = 0
        for (let x = 0; x < wincombos[i].length; x++) {
            if (boxes.includes(wincombos[i][x])) {
                matches += 1;
            }
        }
        if (matches == 3) {
            return true
        }
    }
    return false
}

function analyzeMove(moves) {
    let m = 0;
    let bm = 0;
    for (let i = 0; i < wincombos.length; i++) {
        m = 0;
        for (let x = 0; x < wincombos[i].length; x++) {
            if (moves.includes(wincombos[i][x])) {
                m += 1;
            }
        }

        if (m > bm) {
            bm = m;
        } 
        else if (m == bm){
            let pick = Math.floor(Math.random() * 2);
            if (pick == 0) {
                bm = m;
            }
        }
    }
    if (moves.length == 1) {
        bm = Math.floor(Math.random() * map.length)
    }
    if (map.includes("b2")) {
        bm = "b2";
    }
    return bm
}

function opponentMove() {
    document.getElementById("thinking").textContent = ""
    let rand = map[Math.floor(Math.random() * map.length)]
    let temp;
    let bmove = 0;
    let bmm = map[bmove]
    for (i in map) {
        temp = opponentBoxes;
        temp.push(map[i])
        // console.log(analyzeMove(temp))
        if (analyzeMove(temp) > bmove) {
            bmove = analyzeMove(temp);
            bmm = map[i]
        }
        if (analyzeMove(temp) == "b2") {
            bmm = "b2"
            temp.pop(map[i]);
            break
        }
        temp.pop(map[i])
        // console.log(temp)
        // console.log(opponentBoxes)
    }
    rand = bmm;
    if (analyzeMove(playerBoxes) == 2) {

        for (i in map) {
            temp = playerBoxes;
            temp.push(map[i])
            // console.log(analyzeMove(temp))
            if (analyzeMove(temp) > bmove) {
                bmove = analyzeMove(temp);
                bmm = map[i]
            }
            if (analyzeMove(temp) == "b2") {
                bmm = "b2"
                temp.pop(map[i]);
                break
            }
            temp.pop(map[i])
            // console.log(temp)
            // console.log(opponentBoxes)
        }
        rand = bmm;
    }
    let move = document.getElementById(rand)
    move.innerHTML += `<img src="o.png" alt="o">`
    move.classList.add('selected')
    opponentBoxes.push(rand)
    let index = map.indexOf(rand);
    if (index !== -1) {
        map.splice(index, 1);
    }
    if (map.length == 0) {
        currTurn = "gameover";
        gameoverstatus = "Draw!"
        gameover()
    }
    if (findIfMatch(opponentBoxes)) {
        currTurn = "gameover";
        gameoverstatus = "Defeat!"
        gameover()
    }

    currTurn += 1;

}

function gameover() {
    // window.location.reload()
    let playerStats = analyzeMove(playerBoxes);
    let oppStats = analyzeMove(opponentBoxes)
    if (playerStats == oppStats && playerStats == 3) {
        gameoverstatus = "Victory!";
    }

    if (gameoverstatus == "Victory!") {
        let won = JSON.parse(localStorage.getItem('won')) +1;
        localStorage.removeItem('won');
        localStorage.setItem('won', won)
    }
    if (gameoverstatus == "Draw!") {
        let draw = JSON.parse(localStorage.getItem('draw')) +1;
        localStorage.removeItem('draw');
        localStorage.setItem('draw', draw)
    }
    if (gameoverstatus == "Defeat!") {
        let lost = JSON.parse(localStorage.getItem('lost')) +1;
        localStorage.removeItem('lost');
        localStorage.setItem('lost', lost)
    }
    document.getElementById('gos').textContent = gameoverstatus;
    document.getElementById('gom').classList.add('active')
}

if (currTurn == 1) {
    opponentMove()
}

// Event listener for boxes
document.querySelectorAll('.box').forEach((box) => {
    box.addEventListener('click', () => {
        if (currTurn % 2 == 0) {
            if (!box.classList.contains('selected')) {
                box.classList.add('selected');
                let index = map.indexOf(box.id);
                if (index !== -1) {
                    map.splice(index, 1);
                }
                if (map.length == 0) {
                    currTurn = "gameover";
                    gameoverstatus = "Draw!"
                    gameover()
                }
                playerBoxes.push(box.id);
                playerBoxes.sort()
                box.innerHTML += `<img src="./x.png" alt="x">`;
    
                if (findIfMatch(playerBoxes)) {
                    currTurn = "gameover";
                    gameoverstatus = "Victory!"
                    gameover()
                }
    
                currTurn += 1;
                // console.log(currTurn)
                if (!currTurn % 2 == 0) {
                    document.getElementById("thinking").textContent = "Thinking..."
                    setTimeout(() => {
                        opponentMove()
                    }, Math.floor(Math.random() * 100)+ 150)
                }
            }
        }
    })
})
