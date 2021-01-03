var PLAY = 1 ;
var END =  0 ; 
var gameState ;
var monkey , monkey_running , monkey_stop; 
var banana ,bananaImage, obstacle, obstacleImage ;
var foodGroup, obstacleGroup ;
var score = 0 ; 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
   monkey_stop = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("8.jpg") ;
  obstacleGroup = createGroup() ; 
  foodGroup = createGroup() ;
 
}



function setup() {
  createCanvas(750,600);
  score = 0 ;
  gameState = PLAY ;
  
  monkey = createSprite(width/5 , height-120 , 40 , 40) ; 
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("coll", monkey_stop);
  monkey.scale = 0.2  ;
  
  ground = createSprite(width/2,height-10,width, 100) ;
  
  monkey.setCollider("rectangle",0,0,monkey.width-10,monkey.height-10);
}


function draw() {
  background(bg);                 
  if (gameState === PLAY ){
    ground.velocityX = 5 ; 
    
    if (ground.x > 0){
      ground.x = width/2 ;
    }

    // console.log(monkey.y);
    if(keyDown("space")&& monkey.y >= 478) {
      monkey.velocityY = -12 ;
    }
    
    monkey.velocityY = monkey.velocityY + 0.3 ;
    
    if (foodGroup.isTouching(monkey)) {
      score +=  1 ;
      foodGroup.destroyEach();
    }
    if (obstacleGroup.isTouching(monkey)){
      gameState = END ; 
    }
    fruits() ;
    obstacles();  
  }
  else {
    monkey.velocityY = 0 ; 
    foodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    ground.velocityX = 0 ; 
    monkey.changeAnimation("coll" , monkey_stop) ;
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  monkey.collide(ground);
  drawSprites() ;
  
  textSize(30);
  score += Math.round(getFrameRate()/60);
  text("Survival Time : " + score , 50 , 40) ; 
}

function obstacles(){
  if (frameCount % 300 === 0 ){
    obstacle = createSprite(width+10 , ground.y-100 , 40,40) ; 
    obstacle.addImage(obstacleImage) ; 
    obstacle.scale = 0.25 ;
    obstacle.velocityX = -7 - (score/100) ; 
    obstacle.lifetime = (width / 5); 

    obstacleGroup.add(obstacle) ; 
}
}
function fruits(){
  if (frameCount % 80 === 0 ){
    obstacle = createSprite(width+10 , ground.y-60-random(150,200) , 30,30) ; 
    obstacle.addImage(bananaImage) ; 
    obstacle.scale = 0.15 ;
    obstacle.velocityX = -7 - (score/100) ; 
    obstacle.lifetime = (width / 5); 

    foodGroup.add(obstacle) ; 
}
}