//var serialport = require(['src/js/serialport'], function (serialport) {});
var serialport = require("src/js/serialport.js");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")

});


var keysDown = {};

/*window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});
*/
sp.on("open", function () {
  // this is what is done when the port is open
  console.log('open'); // print 'open' in console
  sp.on('data', function(data) {
    // apparently this reads data from serial
    console.log(data);
  });
  sp.write('001\n');
  /*serialPort.write("ls\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
  });
  */
});

