let boxes=document.querySelectorAll(".box");
let reset_btn=document.querySelector("#reset-btn");
let new_btn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let count=0;

let turn_O=true;

const winning_patterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const resetgame=()=>{
    count=0;
    turn_O=true;
    enableboxes();
    msgcontainer.classList.add("hide");
}

const draw=()=>{
    msg.innerText="Game is a draw!";
    msgcontainer.classList.remove("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box was clicked");
        if(turn_O)
        {
            box.innerText="O";
            turn_O=false;
        }
        else
        {
            box.innerText="X";
            turn_O=true;
        }
        box.disabled=true;
        count++;

        let valid=check_winner();
        if(count==9 && !valid) draw();
    });
});

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}


const showWinner=(pos1)=>{
    msg.innerText=`Winner is ${pos1}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const check_winner=()=>{
    for(let pattern of winning_patterns)
    {
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                console.log("winner");
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
}

new_btn.addEventListener("click",resetgame);
reset_btn.addEventListener("click",resetgame);