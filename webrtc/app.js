var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var SerialPort, serialPort,
    serialport = require("serialport"),
    baudrate = 57600,
    dataLog;

app.listen(8003);

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

var socketG;

var handle ={
    
    serial: function () {
        console.log('open');
        serialPort.on('data', function(data) {
            console.log('log: ', data);
            dataLog = data; //to make it available globally
            // first send data to browser, then use send to peer with conn.send
            socketG.emit('to peer', dataLog);
            var l = data.split(', ');
            //socket.emit('news', l);
            var ch = [];
            for (i in l) {
                ch += String.fromCharCode(l[i]);
            }
        });
    },
        
    socket: function (socket) {
        socket.emit('news', { hello: 'world, from socket!' });
        socket.on('echo data', function(data) { console.log(data);});
        socket.on('to arduino', function(data) {
            serialPort.write(handle.data(data), write);
        });
    },
    
    data: function(data) {
        //return 0;//data;
        // convert JSON data to series of bytes to be parsed by Arduino
        var motors = handle.angleBytes(data.motors);
        console.log('data: ', data.motors, motors);
        // the last byte must be the laser
        var res = String.fromCharCode.apply(this,motors.concat([data.laser])); // makes string of bytes
        console.log('converted: ', res);
        return res;
    },
    
    angleBytes: function(ar){
        // takes and array of angles 0-180. returns 2 bytes for each
        var l = [];
        for (i in ar){
            l = l.concat([127 * parseInt(ar[i] / 127), parseInt(ar[i] % 127)]);
        }
        console.log('conv: ', l);
        return l;
    }
    
};

var make = {
    serial: function(device){
        console.log('Using this device:');
        console.log(device);
        
        SerialPort = serialport.SerialPort;
        serialPort = new SerialPort(device.comName, {
            baudrate: baudrate, //9600,
            parser: serialport.parsers.readline("\n")
        });
        console.log('Connected to ', device.serialNumber);
    }
};

//serialPort.on("open", handle.serial);
io.on('connection', startAll);

function startAll(socket){
    socketG = socket; // make globally available (needed for handle.serial)
    // choose the arduino device from serialports
    var device;
    serialport.list(function(err, ports){
        console.log('errors:', err);
        for (i in ports){
            //console.log(ports[i]);
            try{
                if (ports[i].manufacturer.includes('Arduino')) {
                    device = ports[i];
                    //console.log(ports[i]);
                }
            }catch(err){}
        }
        startSerial();
    });
    
    function startSerial(){
        make.serial(device);
        serialPort.on("open", handle.serial);
        //socket.emit('to peer', dataLog);
        handle.socket(socket);
        
    };
}
