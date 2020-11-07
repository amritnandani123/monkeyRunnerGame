var jungle, jungle_img;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score1=0;
var score2=0;
var gameState= "play";
var gameover,gameover_img;
var bananaeat;


function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungle_img = loadImage("jungle.jpg"); 

 
}



function setup() {
 createCanvas(500,500)
 
 jungle=createSprite(250,250);
 jungle.addImage("jungle",jungle_img);
 
   monkey=createSprite(80,310); 
   monkey.addAnimation("moving",monkey_running);
   monkey.scale=0.15;
   
   ground=createSprite(250,480,500,8);
   ground.visible=false;
  
   
 // creating groups for obasticle and bananas
  obstacleGroup = createGroup();
  bananaGroup = createGroup();


}


function draw() {
  background(220);
  jungle.velocityX=-5;
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }


  //adding gravity
    monkey.velocityY = monkey.velocityY + 3;
  
 //make monkey collide with invisible ground
    monkey.collide(ground);
 
  if(gameState === "play") {
    if(frameCount % 10 ===0) {
      score1=score1+1;
    }
    Spanbanana();
    //adding obasticles
    obstacles();
    
    
   

    
    //adding jump 
    if(keyWentDown("space")) {
             monkey.velocityY=-40;
      
           }
    if(monkey.isTouching(obstacleGroup)) {
       gameState= "end";
      
  
    }
     if(bananaGroup.isTouching(monkey)) {  
      bananaGroup.destroyEach();
      score2=score2+1;
      monkey.scale=(0.15+1*score2/50);

      

    }
   
  
    
     } else if(gameState==="end") {
       
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        jungle.velocityX=0;
        obstacleGroup.setLifetimeEach(-1);
       bananaGroup.setLifetimeEach(-1);
        monkey.addAnimation("moving",monkey_running);
        monkey.scale=0.12;
        if(keyDown("space")) {
          reset();
        }
               
               }
  
  drawSprites();
  text("Survival Time: "+score1,400,50)
  text("Score:"+score2,50,50);
}

function obstacles() {
  if (frameCount % 150 === 0) {

    obstacle = createSprite(600, 450);
    obstacle.addAnimation("rock", obstaceImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX=-8;
    obstacle.lifetime = 130;
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -(8 + 2*score1/5);

  }
}
//function for banana
function Spanbanana() {
  if(frameCount % 80 ===0){
    banana=createSprite(600,200);
    banana.velocityX=-10;
    banana.addImage("banana",bananaImage)
    banana.scale=0.1;
    var rand;
    rand= Math.round(random(200,120))
    banana.y=rand;
    console.log(banana.y)
   
    banana.velocityX = -(10 + 2*score1/5);

    banana.lifetime=70;
    bananaGroup.add(banana);
  } 
}



function reset() {
  gameState="play";
  obstacleGroup.setVelocityXEach(-8); 
  bananaGroup.setVelocityXEach(-8);
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score1=0;
  score2=0;
  monkey.scale=0.15;
}


