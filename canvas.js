//for chrome: vo=.2 a = .01
//for safari: vo=.5 a = .05
var vo = 2;
var v1 = 1;
var a = 0.05;
var cloudX = 400;
var cloudY = 100;
var cloudX1 = 100;
var cloudY1 = 500;
var cloudX2 = 500;
var cloudY2 = 500;
var stillPlaying = true;
var pigY = 200;
var shouldDisplayApple = false;
var appleX = 600;
var appleY = 300;
var numApples = 0;
var numCloudsShot = 0;
var shouldDisplayCarrot = false;
var carrotX = 600;
var carrotY = 300;
var numLasers = 0;
var shouldDisplayLaser = false;
var laserX = 100;
var laserY = 500;
var carrotX = 600;
var carrotY = 300;
var haveMadeKeyListener = false;
var theme = new Audio('SuperPig-Music/SuperPig-Theme.m4a');
var fast = new Audio('SuperPig-Music/SuperPig-Fast.m4a');
var die = new Audio('SuperPig-Music/SuperPig-Die.m4a');
var carrotSpawnRate = 400;//use 5000 for chrome, 3000 for safari
var appleSpawnRate = 100;
var keyLog = "";
var hasCheated = false;
var score = 0;
var canvas;
var isLevel1 = true;
var infiniteMode = false;
//Changes speeds for chrome because chrome is weird and has a different refresh rate
//if(navigator.userAgent.indexOf('Chrome') > 0) {
  //vo = 1.5;
  //a = .01;
  //carrotSpawnRate = 5000;
//}
var instructionScreen = true;
var instructionScreen2 = false;
var displayLevelScreen = false;

function loadCanvas() {
  var canvas = document.getElementById('canvas');

  if(canvas.getContext('2d')) {
    var startScreen = true;

    //Prints background and game title
    var context = canvas.getContext('2d');

    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    //handle keyboard inputs
    //up: 38 down: 40 space: 32
    var keysDown = {};
    addEventListener("keydown", function (e) {
       var x = e.keyCode;
       keysDown[x] = true;
       if(x == 32 || 67)startScreen = false;
       if(x == 76) displayLevelScreen = true;
       if(37 <= x && x <= 40 || x == 65 || x == 66 || x == 67 || x == 76) keyLog += x;
       if(keyLog.indexOf("38384040373937396665") >= 0) {
         keyLog = "";
         numLasers = Number.MAX_VALUE;
         hasCheated = true;
       }
     }, false);
     addEventListener("keyup", function (e) {
       delete keysDown[e.keyCode];
      }, false);


    context.textAlign = 'center';
    context.fillStyle = '#FFFFFF';
    context.font = '80px OCR A Std';
    context.textAlign = 'center';
    context.fillText('SuperPig' , 300 , 300);

    context.font = '20px OCR A Std';
    context.fillText('Press space to begin' , 300 , 450);
    context.fillText('Press c for credits' , 300 , 425);
    context.fillText('Press l for level select' , 300 , 475);
    /*var pigFront = new Image();
    pigFront.addEventListener('load' , function(){
      context.drawImage(pigFront , 236 , 305 , 128 , 100);
    } , false);
    pigFront.src = 'superpig-front.png';*/

    theme.play();
    theme.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);

    //date object for animation purposes
    var start = (new Date).getTime();
    context.save();
    var intervalID = window.requestAnimationFrame(moveClouds , 50);


    function moveClouds() {
      if(startScreen) {
        var cloud1 = new Image();
        var cloud2 = new Image();
        var cloud3 = new Image();
        cloud1.addEventListener("load", function() {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 230);
          context.fillRect(0 , 500 , 600 , 100);

          if(cloudX > -150) cloudX -= v1;
          else {
            cloudX = 600;

          }
          context.drawImage(cloud1 , cloudX , cloudY , 150 , 100);
          if(cloudX1 > -150) cloudX1 -= v1;
          else {
            cloudX1 = 600;

          }
          context.drawImage(cloud2 , cloudX1 , cloudY1 , 150 , 100);
          if(cloudX2 > -150) cloudX2 -= v1;
          else {
            cloudX2 = 600;

          }
          context.drawImage(cloud3 , cloudX2 , cloudY2 , 150 , 100);
          window.requestAnimationFrame(moveClouds , 50);
        }, false);
        cloud1.src = 'cloud1.png';
        cloud2.src = 'cloud2.png';
        cloud3.src = 'cloud3.png';
      }
      else{
        if(keyLog.indexOf('76') >= 0 && displayLevelScreen) {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 600);
          displayLevelScreen = false;
          var lv1 = new Image();
          var lv2 = new Image();
          lv2.addEventListener('load' , function(){
            context.drawImage(lv1 , 100 , 220);
            context.drawImage(lv2 , 340 , 220);
            context.font = '20px OCR A Std';
            context.textAlign = 'center';
            context.fillStyle = '#FFFFFF';
            context.fillText('Choose a level to play on free play', 295, 100);
            context.fillText('Press 1', 175, 440);
            context.fillText('Press 2', 415, 440);
            context.fillText('Press space to play adventure mode', 295, 500);


            addEventListener("keydown", function (e) {
              var x = e.keyCode;
              keysDown[x] = true;
              if(x==32){
                if(instructionScreen){
                  document.getElementById('canvas').style.display = 'none';
                  instructionScreen = false;
                  document.getElementById('game').style.display = 'inline';
                  game();
                }
              }
              if(x==49){
                infiniteMode = true;
                if(instructionScreen){
                  document.getElementById('canvas').style.display = 'none';
                  instructionScreen = false;
                  document.getElementById('game').style.display = 'inline';
                  game();
              }
            }
              if(x==50){
                infiniteMode = true;
                if(instructionScreen){
                  document.getElementById('canvas').style.display = 'none';
                  instructionScreen = false;
                  document.getElementById('game').style.display = 'inline';
                  levelTwo();
              }
            }

            }, false);
          } , false);
          lv1.src = 'level1.png';
          lv2.src = 'level2.png';

        }
        else if(keyLog.indexOf('67') >= 0) {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 600);
          context.font = '30 OCR A Std';
          context.textAlign = 'center';
          context.fillStyle = '#FFFFFF';
          context.fillText('Credits' , 300 , 50);
          context.font = '20 OCR A Std';
          context.fillText('Concept: Bryce' , 300 , 150);
          context.fillText('Coding: Sarah and Russell' , 300 , 200);
          context.fillText('Sprites: Jacque and Tyler' , 300 , 250);
          context.fillText('Music: Amari and Russell' , 300 , 300);
          context.fillText('Maracas: Amari' , 300 , 350);
          context.fillText('Want to contribute? Visit' , 300 , 400);
          context.fillText('github.com/russell-stewart/SuperPig-Game' , 300 , 430);
          context.fillText('Press space to begin' , 300 , 550);
          addEventListener("keydown", function (e) {
             var x = e.keyCode;
             keysDown[x] = true;
             if(x==32){
               if(instructionScreen){
                 document.getElementById('canvas').style.display = 'none';
                 instructionScreen = false;
                 document.getElementById('game').style.display = 'inline';
                 game();
             }
           }
           }, false);
        } else {
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 600);
        context.fillStyle = '#FFFFFF';
        context.font = '20px OCR A Std';
        context.textAlign = 'left';
        context.fillText("Instructions" , 200 , 50);
        var cloud = new Image();
        var apple = new Image();
        var carrot = new Image();
        var laser = new Image();
        var instructions = new Image();
        instructions.addEventListener("load", function(){
          /*context.drawImage(cloud, 50, 70, 100, 66);
          context.drawImage(apple, 75, 150, 50, 50 );
          context.drawImage(carrot, 85, 220, 25, 50);
          context.drawImage(laser, 70, 300, 50, 10);
          context.font = '12px OCR A Std';
          context.fillText("Use the up and down arrows to dodge clouds!", 160, 110);
          context.fillText("Eat apples to gain points!", 160, 180);
          context.fillText("Eat carrots to get laser vision!", 160, 250);
          context.fillText("Press the right arrow to fire a laser!", 160, 310);
          context.textAlign = 'center';
          context.font = '20 OCR A Std';
          context.fillText('Press space to begin' , 300 , 450);*/
          context.drawImage(instructions, 0, 0);

        }, false);

        addEventListener("keydown", function (e) {
           var x = e.keyCode;
           keysDown[x] = true;
           if(x==32){
             if(instructionScreen){
               document.getElementById('canvas').style.display = 'none';
               instructionScreen = false;
               document.getElementById('game').style.display = 'inline';
               doStuff();
           }
         }


         }, false);
         addEventListener("keyup", function (e) {
           delete keysDown[e.keyCode];
          }, false);


        cloud.src = 'cloud1.png';
        apple.src = 'apple.png';
        carrot.src = 'carrot.png';
        laser.src = 'laser.png';
        instructions.src = 'InstructionScreen.png';
      }



    }
    }
  }else alert('error');
}

function doStuff(){
  game();

}


function game() {
  theme.pause();
  fast.play();
  fast.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  var start = (new Date).getTime();
  cloudX = 400;
  cloudY = Math.floor((Math.random() * 600) + 1);
  cloudX1 = 700;
  cloudY1 = Math.floor((Math.random() * 600) + 1);
  cloudX2 = 1000;
  cloudY2 = Math.floor((Math.random() * 600) + 1);
    var keysDown = {};
    var down = false;
    var up = false;
    addEventListener("keydown", function (e) {
      var x = e.keyCode;
      keysDown[x] = true;

      if(x == 38 && isLevel1){
        up = true;
      }
      if(x == 39 && numLasers > 0) shouldDisplayLaser = true;
      if(x == 40 && isLevel1){
        down = true;
      }

    }, false);
    addEventListener("keyup", function (e) {
      var x = e.keyCode;
      if(x == 38 && isLevel1) up = false;
      if(x == 40 && isLevel1) down = false;
      }, false);
      haveMadeKeyListener = true;

  var game = document.getElementById('game');
  if(game.getContext('2d')) {
    var context = game.getContext('2d');
    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    context.save();
    var intervalID = window.requestAnimationFrame(movePig);

  function movePig() {
      if(up) pigY -= 2;
      if(down) pigY += 2;

      if(pigY <= cloudY + 50 && pigY >= cloudY - 50 && cloudX <= 110 && cloudX >= 0) stillPlaying = false;
      if(pigY <= cloudY1 + 50 && pigY >= cloudY1 - 50 && cloudX1 <= 110 && cloudX1 >= 0) stillPlaying = false;
      if(pigY <= cloudY2 + 50 && pigY >= cloudY2 - 50 && cloudX2 <= 110 && cloudX2 >= 0) stillPlaying = false;
      if(shouldDisplayApple && pigY <= appleY + 25 && pigY >= appleY - 25 && appleX <= 110 && appleX >= 10) {
        numApples++;
        shouldDisplayApple = false;
        appleX += 600;
        appleY = Math.floor(Math.random() * 500 + 1);
      }
      if(shouldDisplayCarrot && pigY <= carrotY + 25 && pigY >= carrotY - 25 && carrotX <= 110 && carrotX >= 10) {
        numLasers += 3;
        laserX = 100;
        shouldDisplayCarrot = false;
        carrotX += 600;
        carrotY = Math.floor(Math.random() * 500 + 1);
      }
      if(!shouldDisplayApple) {
        var r1 = Math.floor(Math.random()*appleSpawnRate);
        var r2 = Math.floor(Math.random()*appleSpawnRate);
        if(r1 == r2) shouldDisplayApple = true;
      }
      if(!shouldDisplayCarrot) {
        var r1 = Math.floor(Math.random()*carrotSpawnRate);
        var r2 = Math.floor(Math.random()*carrotSpawnRate);
        if(r1 == r2) shouldDisplayCarrot = true;
      }
      if(shouldDisplayLaser && laserX >= cloudX && laserX <= cloudX + 150 && laserY >= cloudY && laserY <= cloudY + 100) {
        numLasers--;
        numCloudsShot ++;
        shouldDisplayLaser = false;
        laserX = 100;
        cloudX += 800;
        cloudY = Math.floor((Math.random() * 500) + 1);
      }
      if(shouldDisplayLaser && laserX >= cloudX1 && laserX <= cloudX1 + 150 && laserY >= cloudY1 && laserY <= cloudY1 + 100) {
        numLasers--;
        numCloudsShot ++;
        shouldDisplayLaser = false;
        laserX = 100;
        cloudX1 += 800;
        cloudY1 = Math.floor((Math.random() * 500) + 1);
      }
      if(shouldDisplayLaser && laserX >= cloudX2 && laserX <= cloudX2 + 150 && laserY >= cloudY2 && laserY <= cloudY2 + 100) {
        numLasers--;
        numCloudsShot ++;
        shouldDisplayLaser = false;
        laserX = 100;
        cloudX2 += 800;
        cloudY2 = Math.floor((Math.random() * 500) + 1);
      }
      if(laserX > 600) {
        numLasers--;
        shouldDisplayLaser = false;
        laserX = 100;
      }

      var pig = new Image();
      var cloud1 = new Image();
      var cloud2 = new Image();
      var cloud3 = new Image();
      if(shouldDisplayApple) var apple = new Image();
      if(shouldDisplayCarrot) var carrot = new Image();
      var laser = new Image();
      laser.addEventListener('load' , function(){
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 600);
        var now = (new Date).getTime();
        if(shouldDisplayLaser) {
          if(laserX == 100) laserY = pigY + 20;
          laserX += 10*vo;
        }
        if(shouldDisplayLaser) context.drawImage(laser , laserX , laserY , 42 , 12);

        if(pigY < 0) pigY = 0;
        if(pigY > 520) pigY = 520;
        context.drawImage(pig , 10 , pigY , 140 , 100);

        if(cloudX > -150) cloudX -= vo + a*(now - start)/1000;
        else {
          cloudX = 600;
          cloudY = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud1 , cloudX , cloudY , 150 , 100);
        if(cloudX1 > -150) cloudX1 -= vo + a*(now - start)/1000;
        else {
          cloudX1 = 600;
          cloudY1 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud2 , cloudX1 , cloudY1 , 150 , 100);
        if(cloudX2 > -150) cloudX2 -= vo + a*(now - start)/1000;
        else {
          cloudX2 = 600;
          cloudY2 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud3 , cloudX2 , cloudY2 , 150 , 100);


        if(shouldDisplayApple) {
          if(appleX > -50) appleX -= vo + a*(now - start) / 1000;
          else {
            appleX = 600;
            appleY = Math.floor(Math.random() * 500 + 1);
            shouldDisplayApple = false;
          }
        }
        if(shouldDisplayApple) context.drawImage(apple , appleX , appleY , 50 , 50);

        if(shouldDisplayCarrot) {
          if(carrotX > -50) carrotX -= vo + a*(now - start) / 1000;
          else {
            carrotX = 600;
            carrotY = Math.floor(Math.random() * 500 + 1);
            shouldDisplayCarrot = false;
          }
        }
        if(shouldDisplayCarrot) context.drawImage(carrot , carrotX , carrotY , 25 , 50);

        score = (Math.floor((now - start)/1000) + numApples*20 + numCloudsShot*10)
        context.fillStyle = '#000000';
        context.font = '20px OCR A Std';
        context.fillText('Score: ' +  score, 10 , 50);
        if(numLasers > 0) {
          context.fillStyle = 'rgb(255 , 0 , 0)';
          if(!hasCheated){
            context.fillText('Lasers: ' + numLasers , 10 , 70);
          }
          else context.fillText('Lasers: all of them', 10, 70);
        }

      if(stillPlaying && (score< 20 || infiniteMode)) window.requestAnimationFrame(movePig);
      else if(stillPlaying && score >= 20 && !infiniteMode) {
        instructionScreen2 = true;
        drawBackground(context);
        context.fillStyle = '#FFFFFF';
        context.font = '20px OCR A Std';
        context.textAlign = 'left';
        context.fillText("Level Two Instructions" , 150 , 50);
        var bush = new Image();
        var log = new Image();
        var corn = new Image();
        var mud = new Image();
        /*mud.addEventListener("load", function(){
          context.drawImage(bush, 50, 70, 100, 66);
          context.drawImage(log, 75, 160, 50, 30);
          context.drawImage(corn, 75, 220, 50, 50);
          context.drawImage(mud, 75, 300, 50, 20);
          context.font = '12px OCR A Std';
          context.fillText("Jump to dodge bushes!", 160, 110);
          context.fillText("Stand on logs!", 160, 180);
          context.fillText("Eat corn to get more time!", 160, 250);
          context.fillText("Avoid mud or you'll slow down!", 160, 310);
          context.font = '20px OCR A Std';
          context.fillText("Press space to begin", 150, 450);
        }, false);*/
        var is2 = new Image();
        is2.addEventListener('load' , function(){
          context.drawImage(is2 , 0 , 0 , 600 , 600);
        } , false);
        is2.src = 'is2.png';
        addEventListener('keydown' , function(e1){

          var key = e1.keyCode;
          if(key == 32 && instructionScreen2){
            levelTwo();
            isLevel1 = false;
            instructionScreen2 = false;
          }
        } , false);
        removeEventListener('keydown', function(e1){}, false);
        bush.src = 'bush.png';
        log.src = 'log.png';
        corn.src = 'corn.png';
        mud.src = 'mud.png';
      }
      else {
        instructionScreen = true;
        fast.pause();
        fast.currentTime = 0;
        die.play();
        context.fillStyle = '#000000';
        context.font = '80px OCR A Std';
        context.textAlign = 'left';
        context.fillText('Game over!' , 30 , 300);
        context.font = '20px OCR A Std';
        context.fillText('Press space to try again' , 125 , 450);

        addEventListener('keydown' , function(e1){

          var key = e1.keyCode;
          if(key == 32 && !stillPlaying){
            stillPlaying = true;
            die.pause();
            die.currentTime = 0;
            numApples = 0;
            numLasers = 0;
            numCloudsShot = 0;
            shouldDisplayLaser = false;
            laserX = 100;
            shouldDisplayApple = false;
            shouldDisplayCarrot = false;
            appleX = 600;
            hasCheated = false;
            carrotX = 600;

            game;
          }
        } , false);
      }
      } , false);
      pig.src = 'superpig.png';
      cloud1.src = 'cloud1.png';
      cloud2.src = 'cloud2.png';
      cloud3.src = 'cloud3.png';
      if(shouldDisplayApple) apple.src = 'apple.png';
      if(shouldDisplayCarrot) carrot.src = 'carrot.png';
      laser.src = 'laser.png';

    }
  } else alert('error!');
}

var loops = 0;
function levelTwo(){

  var timeLimit = 100;
  var start = (new Date).getTime();
  var g = -9.8;
  vo = 6;
  var t;
  pigY = 400;
  pigX = 10;
  var isTouchingBush = false;
  var translation = 0;//how far over the pig has moved
  var canJump = true;
  var game = document.getElementById('game');
  if(game.getContext('2d')) {
    var context = game.getContext('2d');
    //drawBackground(context);

    context.save();
    var space = false;
    var right = false;
    var left = false;
    addEventListener("keydown", function (e) {
      var x = e.keyCode;
      if(x == 32 || x == 38) space = true;
      if(x == 39) right = true;
      if(x == 37) left = true;
      //alert(x);
    }, false);
    addEventListener("keyup" , function(e1) {
      var x = e1.keyCode;
      if(x == 39) right = false;
      if(x == 37) left = false;
    } , false);

    function Bush(x , y , width , height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.isTouchingPig = function() {
        if(pigX + 120 >= this.x - translation && pigX <= this.x + this.width - translation - 30) {
          if(pigY <= this.y + this.height && pigY >= this.y) {
            return true;
          }
          else return false;
        }
        else return false;
      }
    }
    function Log(x , y , width , height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.isPigStandingOn = function() {
        if(pigX + 65 >= this.x - translation && pigX + 65 <= this.x + width - translation) {
          if(pigY + 60 >= this.y - 5 && pigY + 60 <= this.y + 5) {
            return true;
          }else return false;
        }else return false;
      }
    }
    function Corn(x , y , display) {
      this.x = x;
      this.y = y;
      this.display = display;

      this.isTouchingPig = function() {
        if(this.display && pigX + 120 >= this.x - translation && pigX <= this.x + 50 - translation) {
          if(pigY <= this.y + 50 && pigY >= this.y) {
            return true;
          }else return false;
        }
        else return false;
      }
    }
    function Mud(x , y , width , height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.isTouchingPig = function() {
        if(pigX + 120 >= this.x - translation && pigX <= this.x + this.width - translation - 30) {
          if(pigY == 400) {
            return true;
          }
          else return false;
        }
        else return false;
      }
    }
    var b1 = new Bush(300 , 400 , 200 , 100);
    var b2 = new Bush(700 , 400 , 200 , 100);
    var b3 = new Bush(1500 , 250 , 200 , 100);
    var b4 = new Bush(2000 , 400 , 150 , 100);
    var b5 = new Bush(3300 , 400 , 200 , 100);
    var b6 = new Bush(4100 , 420 , 150 , 75);
    var b7 = new Bush(4700 , 400 , 200 , 100);
    var b8 = new Bush(5200 , 400 , 200 , 100);
    var b9 = new Bush(5400 , 400 , 200 , 100);
    var b10 = new Bush(5600 , 400 , 200 , 100);
    var b11 = new Bush(5800 , 400 , 200 , 100);
    var b12 = new Bush(6000 , 400 , 200 , 100);
    var bushes = [b1 , b2 , b3 , b4 , b5 , b6 , b7 , b8 , b9 , b10 , b11 , b12];

    var l1 = new Log(1100 , 350 , 200 , 50);
    var l2 = new Log(1300 , 350 , 200 , 50);
    var l3 = new Log(1500 , 350 , 200 , 50);
    var l4 = new Log(1300 , 240 , 200 , 50);
    var l5 = new Log(2700 , 350 , 200 , 50);
    var l6 = new Log(5000 , 360 , 100 , 50);
    var l7 = new Log(5200 , 280 , 100 , 50);
    var l8 = new Log(5400 , 210 , 100 , 50);
    var l9 = new Log(5600 , 140 , 100 , 50);
    var l10 = new Log(5800 , 140 , 200 , 50);
    var logs = [l1, l2 , l3 , l4 , l5 , l6 , l7 , l8 , l9 , l10];

    var c1 = new Corn(1450 , 150 , true);
    var c2 = new Corn(2725 , 400 , true);
    var c3 = new Corn(6300 , 300 , true);
    var corns = [c1 , c2 , c3];

    var m1 = new Mud(1500 , 450 , 200 , 50);
    var m2 = new Mud(2500 , 450 , 200 , 50);
    var m3 = new Mud(2700 , 450 , 200 , 50);
    var m4 = new Mud(2900 , 450 , 200 , 50);
    var m5 = new Mud(3500 , 450 , 200 , 50);
    var m6 = new Mud(3900 , 450 , 200 , 50);
    var m7 = new Mud(4600 , 450 , 100 , 50);
    var m8 = new Mud(4900 , 450 , 100 , 50);
    var muds = [m1 , m2 , m3 , m4 , m5 , m6 , m7 , m8];


    var intervalID = window.requestAnimationFrame(runGame);
    function runGame() {
      vo = 6;
      var now = (new Date).getTime();
      var mud = new Image();
      var pig = new Image();
      var bush = new Image();
      var log = new Image();
      var corn = new Image();
      var isOnALog = false;
      var logPigisOn = -1;

      for(var i = 0; i < logs.length; i++){
        if(logs[i].isPigStandingOn()){
          isOnALog = true;
          logPigisOn = i;
        }
      }

      for(var i = 0 ; i < corns.length ; i++) {
        if(corns[i].isTouchingPig()) {
          timeLimit += 10;
          corns[i].display = false;
        }
      }

      for(var i = 0 ; i < muds.length ; i++) {
        if(muds[i].isTouchingPig()) {
          vo = 1;
          space = false;
        }
      }

      if(right && pigX <= 350) {
        pigX += vo;

      }
      if(left && pigX > vo) {
        pigX -= vo;
      }

      if(pigY < 400 && !isOnALog) {
        //pigY -= 4;
        space = false;
        pigY -= g*(now - t)/1000 + vo;
        if(pigY >= 400) {
          pigY = 400;
          canJump = true;
        }
      }
      if(pigY == 400 && space && canJump) {
        t = (new Date).getTime();
        pigY -= vo;
        space = false;
        canJump = false;
      }
      if(isOnALog && space){
        t = (new Date).getTime();
        pigY -= vo;
        space = false;
        canJump = false;
      }
      if(pigX >= 350 && right) translation += vo;
      pig.addEventListener("load", function(){
        drawBackground(context);
        context.textAlign = 'left';
        context.fillStyle = '#000000';
        context.font = '20px OCR A Std';
        var now = (new Date).getTime();
        context.fillText('Time Left: ' + Math.floor(timeLimit - (now - start)/1000) , 10 , 50);
        for(var i = 0 ; i < bushes.length ; i++) context.drawImage(bush , bushes[i].x-translation , bushes[i].y , bushes[i].width , bushes[i].height);
        for(var i = 0 ; i < logs.length ; i++) context.drawImage(log , logs[i].x-translation , logs[i].y , logs[i].width , logs[i].height);
        for(var i = 0 ; i < corns.length ; i++) if(corns[i].display) context.drawImage(corn , corns[i].x - translation , corns[i].y , 50 , 50);
        for(var i = 0 ; i < muds.length ; i++) context.drawImage(mud , muds[i].x-translation , muds[i].y , muds[i].width , muds[i].height);
        context.drawImage(pig , pigX , pigY , 140 , 100);

        for(var i = 0; i < bushes.length; i++) if(bushes[i].isTouchingPig()) isTouchingBush = true;
        if(Math.floor(timeLimit - (now - start)/1000) <= 0) isTouchingBush = true;
        if(isTouchingBush) {
          fast.pause();
          fast.currentTime = 0;
          die.play();
          context.fillStyle = '#000000';
          context.font = '80px OCR A Std';
          context.textAlign = 'center';
          context.fillText('Game over!' , 300 , 300);
          context.font = '20px OCR A Std';
          context.fillText('Press space to try again' , 300 , 450);
          addEventListener('keydown' , function(e1){

            var key = e1.keyCode;
            if(key == 32 && isTouchingBush){
              isTouchingBush = false;
              die.pause();
              die.currentTime = 0;
              fast.play();
              loops++;
              levelTwo();
            }
          } , false);
        }
      }, false);
      pig.src = 'superpig.png';
      bush.src = 'bush.png';
      log.src = 'log.png';
      corn.src = 'corn.png';
      mud.src = 'mud.png';


      if(!isTouchingBush) window.requestAnimationFrame(runGame);
    }
  }
}

function drawBackground(context) {
  var lingrad = context.createLinearGradient(0,0,0,600);
  lingrad.addColorStop(0, '#417AFC');
  lingrad.addColorStop(1, '#CCF8FF');
  context.fillStyle = lingrad;
  context.fillRect(0 , 0 , 600 , 600);

  lingrad.addColorStop(.66, '#009933');
  lingrad.addColorStop(1, '#00e64d');
  context.fillStyle = lingrad;
  context.fillRect(0, 400, 600, 400);
  //draw hills
  context.beginPath();
  context.moveTo(0, 400);
  context.quadraticCurveTo(50, 350, 100, 400);
  context.moveTo(100, 400);
  context.quadraticCurveTo(200, 300, 300, 400);
  context.moveTo(280, 400);
  context.quadraticCurveTo(355, 325, 430, 400);
  context.moveTo(430, 400);
  context.quadraticCurveTo(480, 350, 530, 400);
  context.moveTo(520, 400);
  context.quadraticCurveTo(620, 300, 720, 400);
  context.strokeStyle = '#00b33c';
  context.stroke();
  context.fillStyle = '#00b33c';
  context.fill();
}

function doNothing(){}
