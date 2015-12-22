var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")

});

var write = function(err, results) {
      if (err){console.log('Error: ' + err);}
      console.log('Writing ' + results + ' chars');
  }


serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
      console.log(data);
      var l = data.split(', ');
      var ch = [];
      for (i in l){
        ch+=String.fromCharCode(l[i]);
      }
      console.log(ch);
  });
  
  
  
});

app.listen(8080);
console.log('Got here?');

function handler (req, res) {
  
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log('1 here?');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('to arduino', function (data) {
    console.log('hehe:',data);
    serialPort.write(data,write );
  });
});