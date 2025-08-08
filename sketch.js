let database;
let spritePosition;
let sprite, position;
let estrelas=[]
let estrelasPosition
let scoreRef
let score=0

function setup() {
   database = firebase.database();
   console.log("banco de dados="+ database);


   createCanvas(600,600)

  
   sprite = createSprite(300,250,20,20);
    sprite.shapeColor="blue"
   estrelas = createSprite(random(0,600), random(0,600), 20, 20);
    estrelas.shapeColor="yellow"

    scoreRef=database.ref('score')
  scoreRef.on("value", function(data){   //on=onvite, puxando os dados
  score = data.val();
   })
  

    spritePosition = database.ref('sprite/position');


    spritePosition.on("value", readPosition, showError);


}


function draw() {
    background("Pink")
    fill("black")
    textSize(25)
    text("Pontuação = "+score, 400,500)
    

    
    if(position !=  undefined){




    if(keyDown("a")){
        writePosition(-5,0)
    }


      if(keyDown("d")){
        writePosition(5,0)
    }


      if(keyDown("w")){
        writePosition(0,-5)
    }


      if(keyDown("s")){
        writePosition(0,5)
    }}

if (sprite.overlap(estrelas)){
  score+=2;
  scoreRef.set(score)
 estrelas.destroy(); 
 estrelas=estrela();
}

    drawSprites();
}

function estrela () {

  var estrelas= createSprite(random(0,400),random(0,400), 20,20);
  estrelas.shapeColor="yellow"
return estrelas;

}

function writePosition(x,y){
if(position){
    spritePosition.set({
        'x': position.x+x,
        'y':position.y+y
    });
}
}
function readPosition(data){
    position=data.val();
    console.log(position.x)
    sprite.x=position.x;
    sprite.y=position.y;
}


function showError() {
console.log("Erro ao acessar o banco de dados");
}

