const playerInfo= document.querySelector(".player");
const boxes= document.querySelectorAll(".box");
const newgame= document.querySelector(".new-game");
const board= document.querySelector(".playboard");


let currentPlayer;
let gameGrid= ["","","","","","","","",""];
let gameWin= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initialize(){
    currentPlayer= "X";
    playerInfo.innerText= `Current Player- ${currentPlayer}`;
    boxes.forEach((cell,index)=>{
        cell.innerText= "";
        // console.log(cell);
        // console.log(index);
        cell.classList= `box b${index+1}`;
        cell.style.pointerEvents= "all";
    })
    for( let i in gameGrid){
        gameGrid[i]= "";
    }
    // remove green bg color
    newgame.classList.remove("active");
}
initialize();

function swapPlayer(){
    if( currentPlayer=== "X") currentPlayer= "0";
    else currentPlayer= "X";
    playerInfo.innerText= `Current Player- ${currentPlayer}`;
}
function checkGameOver(){
    let winner="";
    gameWin.forEach(position=>{
        if( gameGrid[position[0]]!="" && gameGrid[position[1]]!="" && gameGrid[position[2]]!= "" && gameGrid[position[0]]=== gameGrid[position[1]] && gameGrid[position[1]]=== gameGrid[position[2]]){
            // found winner
            winner= gameGrid[position[0]];
            console.log("winner", winner);
            playerInfo.innerText= `Winner- ${winner}`;
            boxes.forEach((box)=>{
                box.style.pointerEvents= "none";
            });
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
            // set bg color green
            newgame.classList.add("active");
            //break;
        }
    })
    if( winner!= ""){
        return;
    }

    // if all boxes filled and no winner found ie match tied
    let filledCount=0;
    gameGrid.forEach(index=>{
        if(index != ""){
            filledCount++;
        }
    })
    if( filledCount===9 && winner== ""){
        playerInfo.innerText= "Match Tie";
        newgame.classList.add("active");
        return;
    }

}
function handleClick(index){
    if( boxes[index].innerText == ""){
        boxes[index].innerText= currentPlayer;
        boxes[index].style.pointerEvents= "none";
        gameGrid[index]= currentPlayer;
        
        swapPlayer();
        checkGameOver();
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>handleClick(index));
})

newgame.addEventListener("click",()=>{
    initialize();
})