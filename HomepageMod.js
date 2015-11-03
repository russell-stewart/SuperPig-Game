//creates hidden link
var footer = document.getElementById("footer-links").innerHTML;
var link = "<a onclick = loadGame()>Click here</a>"
footer = footer + link;
document.getElementById('footer-links').innerHTML = footer;

//loads the game
function loadGame() {
  var container = document.getElementById("DashboardCard_Container");
  container.innerHTML = "<canvas id = 'game' width = '600' height = '600'>We're sorry! Your browser is not supported!</canvas>";
  var game = document.getElementById('game');
  var context = game.getContext('2d');

  var lingrad = context.createLinearGradient(0,0,0,600);
  lingrad.addColorStop(0, '#417AFC');
  lingrad.addColorStop(1, '#CCF8FF');
  context.fillStyle = lingrad;
  context.fillRect(0 , 0 , 600 , 600);

  context.fillStyle = '#FFFFFF';
  context.textAlign = 'left';
  context.font = '80px OCR A Std';
  context.fillText('Super Pig' , 65 , 300);

  context.font = '20px OCR A Std';
  context.fillText('Click to begin' , 200 , 500);

}
