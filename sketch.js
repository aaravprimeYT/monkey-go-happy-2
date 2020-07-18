var monkey, monkeyanimation;
var ground, groundImage;
var PLAY=1,gameState = PLAY;
var bananagroup, bananaimage;
var rockgroup, rockimage;
var score;
var bg,bgimage;
var invisible;

function preload(){
  monkeyanimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png");
  bgimage = loadImage("jungle.jpg");
  
    groundImage = loadImage("ground.png");
  
  bananaimage = loadImage("banana.png");
  
  rockimage = loadImage("rock.png");
}

function setup() {
  createCanvas(600, 200);
  
  bg = createSprite(300,100,600,200)
  bg.addImage(bgimage);
  bg.scale = 0.6; 
  monkey = createSprite(50,150,20,50);
  monkey.addAnimation("monkey",monkeyanimation);
  monkey.scale = 0.05;

  
  invisible = createSprite(300,150,600,10);

  
  ground = createSprite(1000,180,600,20);
  ground.addImage("ground",groundImage);
  ground.velocityX = -4;
  ground.scale = 0.4;
  
  //monkey.debug = true;

  
  bananagroup = new Group();
  rockgroup = new Group();
  
  score = 0;
}

function draw() {
 
  
  if(gameState===PLAY){
  if(monkey.isTouching(bananagroup)){
bananagroup.destroyEach();
  score = score+1;
    monkey.scale = monkey.scale+0.01;
  }
  if(keyDown("space")&&monkey.y>=100){
    monkey.velocityY = -14 ;
  }
    monkey.velocityY = monkey.velocityY + 0.8
    
    spawnbanana();
  spawnrocks();
  if(monkey.isTouching(rockgroup)){
  monkey.scale = 0.05;
    score = 0;
  }
  }
  
  ground.debug = true;
  
  if(ground.x<-1){
  ground.x = ground.width/5;
  }
  
bananagroup.x = rockgroup.x;

  monkey.collide(invisible);

  //invisible.visible = false;
  
  drawSprites();
  fill("white");
  text("Score: "+ score, 500,50);
  
}

function spawnbanana() {
  //write code here to spawn the clouds
   
if(frameCount % 100 === 0){
 var banana = createSprite(600,100,10,10);
  banana.y = random(80,100);
  banana.addImage(bananaimage);
  banana.scale = 0.05;
  banana.velocityX = -4;
  banana.lifetime = 150;
  bananagroup.add(banana);
}
  
  //banana.debug = true;
  
  
}

function spawnrocks() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(600,130,10,40);
    rock.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    
    
    rock.addImage(rockimage);
    
    //rock.debug = true;
    
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.1;
    rock.lifetime = 300;
    //add each obstacle to the group
    rockgroup.add(rock);
    rock.depth = monkey.depth
    monkey.depth = monkey.depth + 1;

  }
}
