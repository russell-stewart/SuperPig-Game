function loadCanvas() {
  var canvas = document.getElementById('canvas');

  if(canvas.getContext('2d')) {
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
    context.fillText('Click to begin' , 200 , 500);

    var cloud = new Image();
    cloud.addEventListener("load", function() {
      context.drawImage(cloud, 200 , 100);
      context.drawImage(cloud, 400 , 400 , 200 , 100);
      context.drawImage(cloud , 25 , 500 , 200 , 100);
    }, false);
    cloud.src = 'Cloud2.png';


  }else alert('error');
}

/*context.fillStyle = 'rgb(245 , 245 , 245)';
context.globalAlpha = '0.7';

context.beginPath();
context.moveTo(200 , 200);
context.quadraticCurveTo(200 , 125 , 250 , 175);
context.quadraticCurveTo(300 , 50 , 350 , 150);
context.quadraticCurveTo(400 , 100 , 400 , 200);
//context.lineTo(300 , 125);
//context.lineTo(400 , 200);
context.fill();*/
