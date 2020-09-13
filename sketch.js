var dog,dogImage;
var doghImage;
var database,foods,foodStock;
var fedT,lastFed;
var feed,addFood,foodObj;
function preload()
{
  dogImage=loadImage("images/dogImg.png");
  doghImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database();
  foodObj=new Food();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(dogImage);
  dog.scale=0.2;
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("lightgreen");
foodObj.display();
fedT=database.ref("feedTime");
fedT.on("value",function(data){
  lastFed=data.val();
});
textSize(15);
if(lastFed>=12){
  text("lastfeed:"+lastFed%12+"pm",350,30);
}
else if(lastFed===0){
  text("lastfeed:12am",350,30);
}
else{
  text("lastfeed:"+lastFed+"am",350,30);

}
//if(keyWentDown(UP_ARROW)){
//writeStock(foods);
//dog.addImage(doghImage);

//}
  drawSprites();
  //add styles here
//text("food remaining"+foods,170,200);
}
function readStock(data){
  foods=data.val();
foodObj.updateFS(foods);
}
function feedDog(){
dog.addImage(doghImage);
foodObj.updateFS(foodObj.getFS()-1);
database.ref("/").update({
  Food:foodObj.getFS(),
  feedTime:hour()
})

}
function addFoods(){
  foods++;
  database.ref("/").update({
    Food:foods
  })
}
