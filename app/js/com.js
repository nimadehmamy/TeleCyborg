var http = require('http');
var express = require('express');
var app = express();
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
//var SerialPort = require("serialport").SerialPort;

//var server = http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));});

var server = http.createServer(app).listen(8000);

var io = require('socket.io').listen(server);

// app.use(function (req, res, next) {
//         res.setHeader('Access-Control-Allow-Origin', "http://"+req.headers.host+':8000');

//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//         next();
//     }
// );
app.use(express.static(__dirname + './'));
//http.listen(8000, "127.0.0.1");


//  setTimeout(function(){ 1;}, 2000);
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var wr = function(err, results) {
      if (err){console.log('Error: ' + err);}
      console.log('Writing ' + results + ' chars');
  };

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
    console.log(line);
});



var serialport = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")

});//new SerialPort("/dev/ttyACM0"); // replace this address with your port address


serialport.on("open", function () {
  console.log('open');
  console.log('Serial port opened');

  io.sockets.on('connection', function (socket) {
    //Connecting to client
    console.log('Socket connected');
    socket.emit('connected');
    /*serialport.on('data', function(data){
		var dat = data[0];
        socket.emit('data', dat);
        console.log('data sent:', dat);
      });
      serialport.on('data', function(data) {
      console.log('got:');
      console.log(data);
      var l = data.split(', ');
      var ch = [];
      for (i in l){
        ch+=String.fromCharCode(l[i]);
      }
      console.log(ch);
    });
    
    //sleep(1000);
    console.log('now:');
    rl.on('line', function(line){
      serialport.write(line,wr );
    });
    */
  });
  /*
  serialport.on('data', function(data) {
      console.log('got:');
      console.log(data);
      var l = data.split(', ');
      var ch = [];
      for (i in l){
        ch+=String.fromCharCode(l[i]);
      }
      console.log(ch);
  });
  
  //sleep(1000);
  console.log('now:');
  rl.on('line', function(line){
    serialport.write(line,wr );
  });
  */
});


/*
serialport.on('open', function(){
  // Now server is connected to Arduino
  console.log('Serial port opened');

  var lastValue;
  io.sockets.on('connection', function (socket) {
      //Connecting to client
      console.log('Socket connected');
      socket.emit('connected');
      serialport.on('data', function(data){
		var dat = data[0];
        socket.emit('data', dat);
        console.log('data sent:', dat);
      });
  });
});
*/