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
    context.fillText('Click to begin' , 200 , 475);

    var start = new Date();
    context.save();
    var intervalID = window.requestAnimationFrame(moveClouds() , 50);

    function moveClouds() {
      var cloud = new Image();
      cloud.addEventListener("load", function() {
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 230);
        context.fillRect(0 , 500 , 600 , 100);

        context.translate(0.0023*start.getSeconds() , 0);
        context.drawImage(cloud , 100 , 100);
        context.drawImage(cloud , 300 , 500);
        context.drawImage(cloud , 0 , 500);
        context.restore();
        window.requestAnimationFrame(moveClouds() , 50);
      }, false);
      cloud.src = 'Cloud2.png';
    }

  }else alert('error');
}

function doNothing(){}
