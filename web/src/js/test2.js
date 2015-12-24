var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")

});

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
  }

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
    console.log(line);
})

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
  
  sleep(1000);
  console.log('now:');
  rl.on('line', function(line){
    serialPort.write(line,wr );
  });
});

