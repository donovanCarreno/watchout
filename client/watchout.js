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
      .attr('width', 1000)
      .attr('height', 1000);

var circles = d3.select('svg').selectAll('g').data(enemies).enter()
                .append('circle')
                .attr('cx', Math.random() * 750)
                .attr('cy', Math.random() * 750)
                .attr('r', 50).attr('fill', 'blue');

//var playerCircle = d3.select('svg').selectAll('g').data(player, function(d) { return d; }).append('circle').attr('cx', d.x).attr('cy', d.y).attr('r', 50).attr('fill', 'red');

var transitions = function() {
  circles.transition().duration(2000).ease('linear')
  .attr('cx', function(d) { return d.x = Math.random() * 750})
  .attr('cy', function(d) { return d.y = Math.random() * 750})
  .attr('r', 50)
  .each('end', transitions);
};

transitions();

var playerPosition = [{'x' : 400, 'y' : 400}];
var Player = function() {
	var newPlayer = svg
	.data(playerPosition)
	.append('image')
	.attr('class', 'player')
	.attr('r', 50)
	.attr('transform', 'translate(400,400)')
	.attr('height', 50)
	.attr('width', 50)
	.attr("xlink:href","asteroid.png");

  return newPlayer;
};

var drag = d3.behavior.drag().on('drag', function(d) {
  d.x = d.x + d3.event.dx;
  d.y = d.y + d3.event.dy;

  d3.select(this).attr('transform', function(d) {
    return "translate(" + [d.x, d.y] + ")";
  });
});

var myPlayer = Player();
drag.call(myPlayer);

// Need to keep score
   // reset score on collision


var updateScore = function () { 
  d3.select('.current')
    .text('Current score: ' + gameStats.score.toString());
};

var gameStats = {
  score: 0,
  highScore: 0
};


var scoreCount = function() {
  gameStats.score++;
  updateScore();
  console.log(gameStats.score); 
};

var checkCollision = function () {
  for (var i = 0; i < enemies.length; i++) {
    var pX = playerPosition[0].x;
    var pY = playerPosition[0].y;
    var eX = enemies[i].x;
    var eY = enemies[i].y;
   // do some math
    var collision = Math.sqrt(Math.pow((pX - eX), 2) + (Math.pow((pY - eY), 2)));
   // if too close to each other (less than 2x radius?, b/c x and y is center)
    if (collision <= 100) {
      console.log('COLLISION!!!');
      gameStats.score = -1;
    }
  }  
};



setInterval(checkCollision, 50);
setInterval(scoreCount, 1000);











