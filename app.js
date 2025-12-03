let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#newGame");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");

/* to decide whose turn it is, playerX or playerO
so as to ensure alternate values */
let turnX = true;

let isWon = false;

//adding the winning patterns, all horizontal, vertical and diagonal possibilities
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnX = true;
    isWon = false;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnX === true){ 
            box.classList.add("playerO");
            box.classList.remove("playerX");
            box.innerText = "X"; //playerO
            turnX = false;
        }
        else{
            box.classList.add("playerX");
            box.classList.remove("playerO");
            box.innerText = "O"; //playerX
            turnX = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const enableBoxes = () =>{
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

const disableBoxes = () =>{
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const showWinner = (winnerVal) => {
    msg.innerText = `Congratulations, ${winnerVal} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!=="" && pos2Val!=="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner is ", pos1Val);
                isWon = true;
                showWinner(pos1Val);
                return;
            }
        }
    }

     // DRAW CONDITION (no winner found in loop)
    if (!isWon && [...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "Oops! It's a draw! Try again!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}



newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
