var http = require("http");
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")

});


http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.write("buhf");
  sp.on("open", function () {
  // this is what is done when the port is open
  console.log('open'); // print 'open' in console
  sp.on('data', function(data) {
    // apparently this reads data from serial
    console.log(data);
  });
  sp.write("hi");
  /*serialPort.write("ls\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
  });
  */
  response.write("why??");
  });
  
  response.end();
}).listen(8000);