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
        var cloud = new Image();
        cloud.addEventListener("load", function() {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 230);
          context.fillRect(0 , 500 , 600 , 100);

          context.translate(0.005*start.getSeconds() , 0);
          context.drawImage(cloud , 100 , 100);
          context.drawImage(cloud , 300 , 500);
          context.drawImage(cloud , 0 , 500);
          context.restore();
          window.requestAnimationFrame(moveClouds() , 50);
        }, false);
        cloud.src = 'Cloud2.png';
      } else {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('game').style.display = 'inline';
        game();
      }

    }
  }else alert('error');
}

var pigY = 200;
function game() {

  var keysDown = {};
  addEventListener("keydown", function (e) {
     var x = e.keyCode;
     keysDown[x] = true;
     if(x == 38){
       pigY -= 5;
       var intervalID = window.requestAnimationFrame(movePig() , 50);
     }
     if(x == 40){
       pigY += 5;
       var intervalID = window.requestAnimationFrame(movePig() , 50);
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
    var intervalID = window.requestAnimationFrame(movePig() , 50);
    function movePig() {
      var pig = new Image();
      pig.addEventListener('load' , function(){
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 600);
        context.drawImage(pig , 100 , pigY , 100 , 100);

      } , false);
      pig.src = 'unnamed.png';

    }
  } else alert('error!');
}

function doNothing(){}
