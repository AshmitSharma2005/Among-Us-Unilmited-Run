var player , imposter , obstacle , background_ , dead , logo , start ,restart, ground;
var player_image , imposter_image , obstacle_image ,dead_player , background_image , dead_image  , logo_image , start_image , restart_image;
var background_sound;
var score;
var START = 1
var PLAY = 2;
var END = 3;
var gamestate = 1;
var obstacleGroup;

function preload(){

player_image = loadImage("player.png");
imposter_image = loadImage("imposter.png");
obstacle_image = loadImage("obstacle.png");
dead_image = loadImage("dead.png");
background_image = loadImage("background.png"); 
start_image = loadImage("start.png");
logo_image = loadImage("logo.png") 
restart_image = loadImage("restart.png");  
dead_player = loadImage("deadplayer.png");
background_sound = loadSound("music.mp3");  
  
}

function setup() {
createCanvas( 600,200 ); 
 
background_sound.loop();  
  
background_= createSprite(600,20,20,20);
background_.addImage(background_image); 
background_.scale = 0.5;
background_.visible = false;  
  
ground = createSprite(300,190,600,5);
ground.visible = false;  
  
logo = createSprite(300,75,20,20);
logo.addImage(logo_image);  
logo.scale = 1;  
logo.visible = false;  
  
start = createSprite(300,150,20,20);
start.addImage(start_image);
start.scale = 0.075 ; 
start.visible = false;  
    
player = createSprite(150,150,20,20);  
player.addImage(player_image);
player.scale= 0.05; 
player.visible = false;
player.setCollider("circle",0,0,700);  
    
imposter = createSprite(75,150,20,20);  
imposter.addImage(imposter_image) ;
imposter.scale = 0.055;
imposter.visible = false;  
imposter.setCollider("rectangle",1000,0,player.X,player.Y);   
  
dead = createSprite(300,60,20,20);
dead.addImage(dead_image);
dead.scale = 0.09 ; 
dead.visible = false  
  
restart = createSprite(300,160,20,20);
restart.addImage(restart_image);  
restart.scale = 0.06   
restart.visible = false  
   
score = 0  
  
obstacleGroup = new Group();  
  
}

function draw() {
background("black") 
      
if (gamestate === START){

logo.visible = true;
start.visible = true;

if(mousePressedOver(start)){
  
gamestate = PLAY;  
logo.visible = false;
start.visible = false;
    
}  
}  
  
if (gamestate === PLAY){
    
createObstacles();  
   
background_.visible = true;
player.visible = true;
imposter.visible = true;  
  
player.velocityY = player.velocityY + 2; 
imposter.velocityY = imposter.velocityY + 2;
    
player.collide(ground);
imposter.collide(ground);
  
score = score + Math.round(getFrameRate()/60);  
    
background_.velocityX = -5;  
  
if(background_.x < -60){
 
background_.x = 600;  
   
}  
  
if (keyDown("space")&&player.y > 50){  
  
player.velocityY = -10;  

}
  
if(obstacleGroup.isTouching(imposter)){
  
imposter.velocityY = -15  
  
}      
  
if(obstacleGroup.isTouching(player)){

gamestate = END;  
  
  
}  
  
}  
  
if (gamestate === END){

dead.visible = true;
restart.visible = true;
    
background_.velocityX = 0;

player.velocityY = 0;
player.addImage(dead_player);  
player.scale = 0.27  

imposter.velocityY = 0;  

obstacleGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)) {
     
  reset();
  
}
  
}
  
    
drawSprites(); 

stroke("black")  
fill("black")  
textSize(20);  
text("SCORE : "+score,450,80);
  
}

function createObstacles(){
  
if(frameCount% 100 === 0){
  
obstacle = createSprite(600,150,20,20);
obstacle.addImage(obstacle_image);
obstacle.scale = 0.05  
obstacle.velocityX = -10; 
obstacle.lifetime = 70 ;  
obstacle.setCollider("circle",0,0,600);
      
obstacleGroup.add(obstacle);  
}    
}


function reset(){

gamestate = PLAY;
dead.visible = false;
restart.visible = false;
  
player.addImage(player_image) 
player.scale = 0.05  
  
score = 0
  
obstacleGroup.destroyEach();
  
}

