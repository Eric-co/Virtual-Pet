//Create variables here
var dog, happyDog,sadDog;
var foodObj,database, foodS, foodStock;
var fedTime,lastFed,feed,lastFed; 

function preload()
{
  happyDog = loadImage("images/dogImg.png")
  sadDog = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  database = firebase.database();
	createCanvas(100, 400);
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  add.position(800,95);
  addFood.mousePressed(addFood);
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  fill(255,255,254)
  textSize(15);
  if (lastFed>12){
    text("Last Feed : "+lastFed%12 + "PM",350,30); 
  }
  else if (lastFed==0){
    text("Last Fed : 12AM ",350,30);
  }
  else {
    text("Last Fed : " + lastFed + "AM",350,30);
  }

  drawSprites();
  //Prem Ka Tillo Badiya Se (Yeah Baby);
  

}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function FeedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock()
    //FeedTime : hour()
  })
}

function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })

}



