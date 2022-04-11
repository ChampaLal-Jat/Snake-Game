//Game variables and constants

let inputDir = {x:0, y:0};//Initial position of snake
const foodSound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:12, y:10}
]

let food = {x:10, y:11};

//Here we use gameloop 
//Game function
function main(currtime){
    window.requestAnimationFrame(main);
    // console.log(currtime);
    if((currtime-lastPaintTime)/1000 < 1/speed)
        return;
    lastPaintTime=currtime;
    gameEngine();    
}

function isCollode(snake){
    //If you hump ito yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }    
    //If you hump into diwar
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine(){
    //Part:1 Updating the snake array
    if(isCollode(snakeArr)){
        gameOver.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over Press Any Key to Play Again");
        let a=2;
        let b=16;
        snakeArr=[{x:1,y:2}];
        musicSound.play();
        score=0;
    }
    //If you we eaten the food  then increament the score and regenerate the foog
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score++;
        if(score>highScore){
            highScoreVal=score;
            localStorage.setItem('highScore',JSON.stringify(highScoreVal));
            highScoreBox.innerHTML="Highest Score: "+highScoreVal;
        }
        scoreBox.innerHTML="Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x +inputDir.x,y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),
              y:Math.round(a+(b-a)*Math.random())
        }
    }

    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //Part:2 Display the snake
    board.innerHTML = " ";
    snakeArr.forEach((element,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=element.y;
        snakeElement.style.gridColumnStart=element.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{

            snakeElement.classList.add('sanke');
        }

        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//Main logic start from here
let highScore = localStorage.getItem('highScore');
if(highScore === null){
    highScoreVal=0;
    localStorage.setItem('highScore',JSON.stringify(highScoreVal));
}
else{
    highScoreVal=JSON.parse(highScore);
    highScoreBox.innerHTML = "Highest Score: "+highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x:0,y:1};//Start the game
    // moveSound.play();

    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            console.log("ArrowUp");
            break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            console.log("ArrowDown");
            break;

        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            console.log("ArrowLeft"); 
            break; 
            
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            console.log("ArrowRight"); 
            break;
            
        default:
            break;    
    }
})






