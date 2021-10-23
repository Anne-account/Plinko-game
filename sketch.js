const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events
const Bodies = Matter.Bodies; 

var particles = [];
var plinkos = [];
var divisions =[];
var particle;

var divisionHeight=300;
var score =0;
var count = 0;
var gameState ="start";

function setup() {

  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,375));
    }   
}
 
function draw() {

  background("black");
  textSize(35)
  text("Score : "+score,20,40);
  fill("white");
 
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);

  Engine.update(engine);
  ground.display();
  
  if ( gameState =="end") {
    textSize(100);
    text("GameOver", 150, 250);
  }

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }

  for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }

    if(particle!=null)
    {
     var p= particle.body.position;
       particle.display();  
        if (p.y>760)
        {
              if (p.x < 300) 
              {
                  score=score+500;      
                  scoreg();                         
              }
              else if (p.x < 600 && p.x > 301 ) 
              {
                    score = score + 100;
                    scoreg();
              }
              else if (p.x < 900 && p.x > 601 )
              {
                    score = score + 200;
                    scoreg();
              }      
        }
   }
}

function scoreg(){
  particle=null;
  if (count>= 5) 
  gameState ="end";
}

function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
      particle=new Particle(mouseX, 10, 10, 10); 
  }   
}