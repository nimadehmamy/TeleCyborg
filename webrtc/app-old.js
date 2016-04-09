var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8003);
console.log('Got here?');

function handler (req, res) {
  //console.log('dir is: ',__dirname);
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

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 57600, //9600,
  parser: serialport.parsers.readline("\n")

});

var write = function(err, results) {
      if (err){console.log('Error: ' + err);}
      console.log('Writing ' + results + ' chars');
  }

//string.indexOf(substring) > -1 // to check if substring present

// serialPort.on("open", function () {
//   console.log('open');
//   serialPort.on('data', function(data) {
//       console.log('log: ', data);
      
//       var l = data.split(', ');
//       //socket.emit('news', l);
//       var ch = [];
//       for (i in l){
//         ch+=String.fromCharCode(l[i]);
//       }
//       //console.log(ch);
//   });
  
// });


//socket.emit('news', data);
/*I want to use data with socket.
Inside this function, socket is not defined.
socket is the object created when io.on('connection',..) happens.
We must create and event that gets updated and when data is received
and makes a connection with io.
The objects in app.js are not defined in the webpage...

Right Now everything goes one way...

We'll make a smart data handler called insid io.on(connection,...)
*/



// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('echo data', function (data) {
//     console.log(data);
//   });
//   socket.on('to arduino', function (data) {
//     //console.log('hehe:',data);
//     serialPort.write(data,write );
//   });
// });


//var my = require('./my.js');


/*New way*/



var handle ={
    serial: function () {
        console.log('open');
        serialPort.on('data', function(data) {
            console.log('log: ', data);
    
            var l = data.split(', ');
            //socket.emit('news', l);
            var ch = [];
            for (i in l) {
                ch += String.fromCharCode(l[i]);
            }
            //console.log(ch);
        });
    },
        
    socket: function (socket) {
        socket.emit('news', {
            hello: 'world'
        });
        socket.on('echo data', function(data) {
            console.log(data);
        });
        socket.on('to arduino', function(data) {
            //console.log('hehe:',data);
            serialPort.write(data, write);
        });
    }
    
};


//serialPort.on("open", handle.serial);
io.on('connection', handle.socket);


