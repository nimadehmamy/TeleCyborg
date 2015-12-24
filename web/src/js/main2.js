var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };
//

var lastLoop = new Date;
    
var data = '{"x":["January", "February", "March", "April", "May", "June", "July"],' +
'"y":[65, 59, 80, 81, 56, 55, 40]}';

var text = '{"employees":[' +
'{"firstName":"John","lastName":"Doe" },' +
'{"firstName":"Anna","lastName":"Smith" },' +
'{"firstName":"Peter","lastName":"Jones" }]}';

var obj1 = JSON.parse(data);
//#####

var canvas = document.createElement('canvas');

var main_div = "haha"; // just placeholder till it loads document.getElementById("main");

var width = 400;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
obj1.x= [1,2,3,4,5,6,7];


var score = 0 ;

// for the chart
var myNewChart = 10; // new Chart(ctx).PolarArea(data);
var chart = 0;
var chart_context = 20;
var pdot= 0; //new Chart_Path(score, chart_context);
var chart2 = 0;
var chart2_context = 20;
var chart3 = 0;
var chart3_context = 20;
var bx = 0; //ball x loc
var xy = 0;

window.onload = function() {
  canvas = document.getElementById("mygame");
  //main_div.innerHTML ="Did it work??";
  canvas.width = width;
  canvas.height = height;
  context = canvas.getContext('2d');
  main_div = document.getElementById("main");
  main_div.appendChild(canvas);
  
  // /* 11/16/15
  chart = document.getElementById("myChart");
  chart_context = chart.getContext("2d");
  chart2 = document.getElementById("myChart2");
  chart2_context = chart2.getContext("2d");
  chart3 = document.getElementById("myChart3");
  chart3_context = chart3.getContext("2d");
  // */
  pdot= new Chart_Path(chart);
  
  bx = new Chart_Path(chart2);
  xy = new Chart_Path(chart3);
  //*/
  
  //new Chart(ctx).Line(data);
  /*var c=document.getElementById("");
  var ctx=c.getContext("2d");
  
  var grd=ctx.createLinearGradient(0,0,170,0);
  grd.addColorStop(0,"black");
  grd.addColorStop(1,"white");
  
  ctx.fillStyle=grd;
  ctx.fillRect(20,20,150,100);
  */
  animate(step);
  //animate(step_chart);
};


var step = function() {
  update();
  render();
  //test();
  animate(step);
  
};


var player = new Player(25);
var computer = new Computer();
var computer2 = new Computer();

var ball = new Dods(200, 300);//Ball(200, 300);
var ball2 = new Dods(200, 300);
//var pdot= new Chart_Path(score, chart_context);
var scores = new Scores();


var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});


var render = function() {
  context.fillStyle = "#333355";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  computer2.render('#ff0000');
  ball.render();
  ball2.render();
  //Now for the chart area
  /*
  chart_context.fillStyle = "#ffff00";
  chart_context.fillRect(0, 0, chart.width, chart.height);
  chart2_context.fillStyle = "#ffffff";
  chart2_context.fillRect(0, 0, chart2.width, chart2.height);
  chart3_context.fillStyle = "#ffffff";
  chart3_context.fillRect(0, 0, chart3.width, chart3.height);
  pdot.render();
  bx.render("#ff0000");
  xy.render("#ff00ff");
  */
};


var update = function() {
  player.update();
  //computer.update(ball);
  //computer2.update(ball);
  //ball.update(player.paddle, computer.paddle, scores);
  ball.update(player.paddle, scores);
  ball2.update(player.paddle, scores);
  //ball.update(player.paddle, computer2.paddle, scores);
  //var st = "Computer @ ";
  //var cy = computer.paddle.y;
  //var res = st.concat(cy.toString());
   // to get fps
  var thisLoop = new Date;
  var fps = 1000 / (thisLoop - lastLoop);
  lastLoop = thisLoop;
  document.getElementById("demo").innerHTML = "You: "+scores.player1.toFixed()
  +", Com: "+scores.player2.toFixed()
  +"<br>Fps : "+fps.toFixed()
  +" <br>Computer y @ "+(computer.paddle.y).toFixed();
  //"Computer y @ ".concat(Math.floor(computer.paddle.y).toString());// res;
  pdot.update("no", computer.paddle.y);
  bx.update("no", ball.x);
  xy.update( ball.x, computer.paddle.y);
  //plot();
};

