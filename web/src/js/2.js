var x =1;
var y =3;
require(['node_modules/serialport/serialport.js'], function() {
    // Configuration loaded now, safe to do other require calls
    // that depend on that config.
    console.log("yes!!");
    y = this.SerialPort;
});