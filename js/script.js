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
    console.log(currTurn)

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


console.log(wincombos)

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

function opponentMove() {
    setTimeout(() => {
        let rand = map[Math.floor(Math.random() * map.length)]
    let move = document.getElementById(rand)
    move.innerHTML += `<img src="./o.png" alt="o">`
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
        console.log('Opponent has won!')
        currTurn = "gameover";
        gameoverstatus = "Defeat!"
        gameover()
    }

    currTurn += 1;
      }, 0)

}

function gameover() {
    // window.location.reload()
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
            console.log('clicked')
            if (!box.classList.contains('selected')) {
                console.log('clicked1')
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
                console.log(map)
                playerBoxes.push(box.id);
                playerBoxes.sort()
                box.innerHTML += `<img src="./x.png" alt="x">`;
    
                if (findIfMatch(playerBoxes)) {
                    console.log('Player Won!')
                    currTurn = "gameover";
                    gameoverstatus = "Victory!"
                    gameover()
                }
    
                currTurn += 1;
                console.log(currTurn)
                if (!currTurn % 2 == 0) {
                    opponentMove()
                }
            }
        }
    })
})
