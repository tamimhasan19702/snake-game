//game constants
let inputDir = {x: 0 ,y: 0};
let foodSound =  new Audio('./music/food.mp3');
let gameOverSound = new Audio('./music/gameover.mp3');
let moveSound = new Audio('./music/move.mp3');
let musicSound =  new Audio('./music/music.mp3');
let speed = 11;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
      {x: 13 , y: 15}
];
food = { x: 6,y:7};






//game functions



function main(ctime){
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if((ctime - lastPaintTime)/1000 < 1/speed){
   return;
}
lastPaintTime = ctime;
gameEngine();
}

// ---------------------------------------

function isCollide (snake){

  // if you bump into yourself

 for(let i = 1; i < snakeArr.length; i++){
  if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
    return true;
  }
}

//if you bump into the wall

if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
  }

}














// ---------------------------------------

function gameEngine(){

  // part:1 updating the snake array

if(isCollide(snakeArr)){
  gameOverSound.play();
  musicSound.pause();
  inputDir = {x: 0, y: 0};
  alert("Game Over. Press any key to play again!");
  snakeArr = [{x: 13, y: 15}];
  musicSound.play();
  score = 0;
}

// -----------------------------------------------

if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
    foodSound.play();
    score += 1;
    
    

    scoreBox.innerHTML = "score:" +" " + score;
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y:Math.round(a + (b-a)*Math.random())}
  }

  // moving the snake

  for (let i = snakeArr.length - 2; i >= 0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part:2 Render the snake 
  // display snake
  board.innerHTML = "";

  snakeArr.forEach((e,index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0){
      snakeElement.classList.add('head')
    }else{
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });


  // display food element
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}








// main logic start

musicSound.play();



window.requestAnimationFrame(main); 
window.addEventListener('keydown',e => {
   inputDir = {x : 0,y :1} //start the game
   musicSound.play();
   moveSound.play();
   switch(e.key){
    case "ArrowUp":
       console.log("ArrowUp");
       inputDir.x = 0;
       inputDir.y = -1;
       break;

    case "ArrowDown":
         console.log("ArrrowDown");
         inputDir.x = 0;
         inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x =-1 ;
      inputDir.y = 0;
      break;

      case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x =1 ;
        inputDir.y = 0;
        break;

      default:
       break;
   }
   
});