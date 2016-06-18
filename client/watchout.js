// start slingin' some d3 here.

var enemies = [];

var numEnemies = 15;
for (var i = 0; i < numEnemies; i++) {
  var enemy = {
    id: i,
    x: Math.random() * 1000,
    y: Math.random() * 1000
  };
  enemies.push(enemy);
}



var svg = d3.select('.board')
      .append('svg')
      .attr('width', 800)
      .attr('height', 750);

/*var circles = d3.select('svg').selectAll('g').data(enemies).enter()
                .append('circle')
                .attr('cx', Math.random() * 750)
                .attr('cy', Math.random() * 750)
                .attr('r', 50).attr('fill', 'blue');
*/


var circles = svg.selectAll("image").data(enemies);

circles.enter()
.append("svg:image")
.attr("xlink:href", "http://bit.ly/1UFrEeQ")
                .attr("width", "60")
                .attr("height", "60");


//var playerCircle = d3.select('svg').selectAll('g').data(player, function(d) { return d; }).append('circle').attr('cx', d.x).attr('cy', d.y).attr('r', 50).attr('fill', 'red');

var transitions = function() {
  circles.transition().duration(2000).ease('linear')
  .attr('x', function(d) { return d.x = Math.random() * 750})
  .attr('y', function(d) { return d.y = Math.random() * 750})
  // .attr('r', 50)
  .each('end', transitions);
};

transitions();

///////////////////////////////////////////////////////////////////////
//                      DONUT FUNCTIONS                              //
///////////////////////////////////////////////////////////////////////
var donutPosition = [{'x' : 300, 'y' : 275}];
var Donut = function() {
  var donut = svg
  .data(donutPosition)
  .append('image')
  .attr('class', 'donut')
  .attr('transform', 'translate(300,275)')
  .attr('height', 80)
  .attr('width', 80)
  .attr('xlink:href', 'http://bit.ly/1ZYKy4J');

  return donut;
};
var newDonut = Donut();

var moveDonut = function() {
  newDonut.transition().duration(Math.random() * 4000).ease('linear')
  .attr('x', function(d) { return d.x = Math.random() * 150})
  .attr('y', function(d) { return d.y = Math.random() * 150})
  // .attr('r', 50)
  .each('end', moveDonut);
};

moveDonut();



var donutCollision = function () {
  var pX = playerPosition[0].x;
  var pY = playerPosition[0].y;
  var dX = donutPosition[0].x;
  var dY = donutPosition[0].y;
  // do some math
  var distanceX =  Math.abs(dX - pX);   //Math.sqrt(Math.pow((pX - dX), 2) + (Math.pow((pY - dY), 2)));
  var distanceY =  Math.abs(dY - pY);
  // if too close to each other (less than 2x radius?, b/c x and y is center)
  if ((distanceX < 60) && (distanceY < 600)) {
    //scoreCount();
    gameStats.score += 100;
  } 
};  


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

var playerPosition = [{'x' : 400, 'y' : 400}];

var Player = function() {
	var newPlayer = svg
	.data(playerPosition)
	.append('image')
	.attr('class', 'player')
	.attr('r', 50)
	.attr('transform', 'translate(400,400)')
	.attr('height', 60)
	.attr('width', 50)
	.attr('xlink:href', 'http://bit.ly/1UBsMnG');

  return newPlayer;
};

var drag = d3.behavior.drag().on('drag', function(d) {
  d.x = d.x + d3.event.dx;
  d.y = d.y + d3.event.dy;

  d3.select(this).attr('transform', function(d) {
    return 'translate(' + [d.x, d.y] + ')';
  });
});

var myPlayer = Player();
drag.call(myPlayer);

// Need to keep score
   // reset score on collision


var updateScore = function () { 
  d3.select('.current')
    .text('Current score: ' + gameStats.score.toString());
  d3.select('.highscore')
    .text('High score: ' + gameStats.highScore.toString());
  d3.select('.collisions')
    .text('Collisions: ' + gameStats.collisions.toString());
};

var gameStats = {
  score: 0,
  highScore: 0,
  collisions: 0
};


var scoreCount = function() {
  gameStats.score++;
  updateScore();
};

var checkCollision = function () {
  for (var i = 0; i < enemies.length; i++) {
    var pX = playerPosition[0].x;
    var pY = playerPosition[0].y;
    var eX = enemies[i].x;
    var eY = enemies[i].y;
   // do some math
    // var collision = Math.sqrt(Math.pow((pX - eX), 2) + (Math.pow((pY - eY), 2)));
    var distanceX =  Math.abs(eX - pX);   //Math.sqrt(Math.pow((pX - dX), 2) + (Math.pow((pY - dY), 2)));
    var distanceY =  Math.abs(eY - pY);
   // if too close to each other (less than 2x radius?, b/c x and y is center)
    if (distanceX <= 60 && distanceY <= 60) {
      gameStats.collisions++;
     
      if (gameStats.score > gameStats.highScore) {
        gameStats.highScore = gameStats.score;
      }
    
      gameStats.score = -1;
    }
  }  
};

// $('body').toggleClass('toggle');
setInterval(donutCollision, 500);
setInterval(checkCollision, 500);
setInterval(scoreCount, 1000);

d3.select('body').style('fill', 'green');









