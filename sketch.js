//Create variables here
var dogimg,dog,dogHappy;
var database;
var foodS;
var foodstock;
var feed,addFood;
var foodobj;
var fedTime,lastFed;
var bedroom,garden,washroom;
var gameState="hungry";
function preload()
{
  //load images here
  dogimg=loadImage("images/dogimg.png")
dogHappy=loadImage("images/dogimg1.png")
washroom=loadImage("images/virtual pet images/Wash Room.png")
garden=loadImage("images/virtual pet images/Garden.png")
bedroom=loadImage("images/virtual pet images/Bed Room.png")
}

function setup() {
  createCanvas(1000, 1000);
  database=firebase.database();

  foodobj=new Food();

  dog=createSprite(800,200,30,30)
  dog.addImage(dogimg)
  dog.scale=0.2

  feed=createButton("FEED ROCKY");
  feed.position(700,95);
  feed.mousePressed(feedDog);

 addFood=createButton("ADD FOOD");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);


  

  
}


function draw() {  
background(46,139,87)
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){lastFed=data.val();
});

readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
});

currentTime=hour();
if(currentTime==(lastFed+1)){
  update("playing");
  foodobj.garden();
}else if(currentTime==(lastFed+2)){
  update("Sleeping")
  foodobj.bedroom();
}else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update("Bathing");
  foodobj.washroom();
}else{
  update("hungry")
  foodobj.display();
}
  
if(gameState!=="hungry"){
  feed.hide();
  addFood.hide();
  dogHappy.remove();
  
}else{
  feed.show();
  addFood.show();
 dog.addImage(dogimg)
 //dog.addImage(dogHappy);
}

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("LAST FEED : "+lastFed%12+"PM",350,30);
  }else if(lastFed===0){
    text("LAST FEED : 12 AM ",350,30)
  }else{
    text("LAST FEED : "+lastFed+"AM",350,30)
  }
  foodobj.display();
  dog.display();

}


function readstock(data){
  foodS=data.val();
  foodobj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogHappy);


  
    
  
  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    //Food:foodobj.deductFood(),

    
    FeedTime:hour()
  })
}

function addFoods(){
 // foodS++;
  foodobj.updateFoodStock(foodobj.getFoodStock()+1);
  
  database.ref('/').update({
   Food:foodobj.getFoodStock(),
  
 //Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
















