function loadCanvas() {
  var canvas = document.getElementById('canvas');

  if(canvas.getContext('2d')) {
    var startScreen = true;

    //handle keyboard inputs
    //up: 38 down: 40 space: 32
    var keysDown = {};
    addEventListener("keydown", function (e) {
       var x = e.keyCode;
       keysDown[x] = true;
       if(x == 32) startScreen = false;
     }, false);
     addEventListener("keyup", function (e) {
       delete keysDown[e.keyCode];
      }, false);

    //Prints background and game title
    var context = canvas.getContext('2d');

    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    context.fillStyle = '#FFFFFF';
    context.font = '80px OCR A Std';
    context.textAlign = 'left';
    context.fillText('SuperPig' , 65 , 300);

    context.font = '20px OCR A Std';
    context.fillText('Press space to begin' , 150 , 475);

    //date object for animation purposes
    var start = new Date();
    context.save();
    var intervalID = window.requestAnimationFrame(moveClouds() , 50);

    function moveClouds() {
      if(startScreen) {
        var cloud1 = new Image();
        var cloud2 = new Image();
        var cloud3 = new Image();
        cloud1.addEventListener("load", function() {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 230);
          context.fillRect(0 , 500 , 600 , 100);

          context.translate(0.01*start.getSeconds() , 0);
          context.drawImage(cloud1 , 100 , 100, 150, 100);
          context.drawImage(cloud2 , 300 , 500, 150, 100);
          context.drawImage(cloud3 , 0 , 500, 150, 100);
          context.restore();
          window.requestAnimationFrame(moveClouds() , 50);
        }, false);
        cloud1.src = 'cloud1.png';
        cloud2.src = 'cloud2.png';
        cloud3.src = 'cloud3.png';
      } else {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('game').style.display = 'inline';
        game();
      }

    }
  }else alert('error');
}

var stillPlaying = true;
var pigY = 200;
var cloudX = 400;
var cloudY = Math.floor((Math.random() * 600) + 1);
var cloudX1 = 600;
var cloudY1 = Math.floor((Math.random() * 600) + 1);
var cloudX2 = 800;
var cloudY2 = Math.floor((Math.random() * 600) + 1);

function game() {

  var keysDown = {};
  addEventListener("keydown", function (e) {
     var x = e.keyCode;
     keysDown[x] = true;

     if(x == 38){
       pigY -= 5;
     }
     if(x == 40){
       pigY += 5;
     }

   }, false);
   addEventListener("keyup", function (e) {
     delete keysDown[e.keyCode];
    }, false);

  var game = document.getElementById('game');
  if(game.getContext('2d')) {
    var context = game.getContext('2d');
    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    context.save();
    var intervalID = window.requestAnimationFrame(movePig());
    function movePig() {
      if(pigY <= cloudY + 50 && pigY >= cloudY - 50 && cloudX <= 110 && cloudX >= 10) stillPlaying = false;
      if(pigY <= cloudY1 + 50 && pigY >= cloudY1 - 50 && cloudX1 <= 110 && cloudX1 >= 10) stillPlaying = false;
      if(pigY <= cloudY2 + 50 && pigY >= cloudY2 - 50 && cloudX2 <= 110 && cloudX2 >= 10) stillPlaying = false;
      var pig = new Image();
      var cloud1 = new Image();
      var cloud2 = new Image();
      var cloud3 = new Image();
      cloud3.addEventListener('load' , function(){
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 600);
        if(pigY < 0) pigY = 0;
        if(pigY > 520) pigY = 520;
        context.drawImage(pig , 10 , pigY);
        if(cloudX > 0) cloudX -= 1;
        else {
          cloudX = 600;
          cloudY = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud1 , cloudX , cloudY , 150 , 100);
        if(cloudX1 > 0) cloudX1 -= 1;
        else {
          cloudX1 = 600;
          cloudY1 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud2 , cloudX1 , cloudY1 , 150 , 100);
        if(cloudX2 > 0) cloudX2 -= 1;
        else {
          cloudX2 = 600;
          cloudY2 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud3 , cloudX2 , cloudY2 , 150 , 100);
      if(stillPlaying) window.requestAnimationFrame(movePig());
      else {
        context.fillStyle = '#FFFFFF';
        context.font = '80px OCR A Std';
        context.textAlign = 'left';
        context.fillText('Game over!' , 40 , 300);
      }
      } , false);
      pig.src = 'superpig.png';
      cloud1.src = 'cloud1.png';
      cloud2.src = 'Cloud2.png';
      cloud3.src = 'cloud3.png';

    }
  } else alert('error!');
}

function doNothing(){}
