var peer = new Peer('nimi', {key: 'ihbxylb73u15rk9'});
// You can pick your own id or omit the id if you want to get a random one from the server.

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

var conn = peer.connect('kivi');
conn.on('open', function(){
  conn.send('hi!');
});

peer.on('connection', function(conn) {
  conn.on('data', function(data){
    // Will print 'hi!'
    console.log(data);
  });
});


/*
//for now without call
navigator.webkitGetUserMedia({video: true, audio: true}, function(mediaStream) {
  // Call a peer, providing our mediaStream
  var call = peer.call('kivi', mediaStream);
}, function(err) {
  console.log('Failed to get local stream' ,err);
});
*/


/*
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//getUserMedia(navigator,
navigator.webkitGetUserMedia({video: true, audio: true}, function(stream) {
  var call = peer.call('kivi', stream);
  call.on('stream', function(remoteStream) {
    // Show stream in some video/canvas element.
    var video = document.querySelector("#player");
    video.src = window.URL.createObjectURL(remotestream);
  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});

*/

var t0 = new Date().getTime();
var t_flag = new Date().getTime();
var dt = 300;

function time_up(dt) {
  var flag = false;
  t_flag = new Date().getTime();
  if (t_flag - t0 > dt ) {
    flag = true;
    t0 = t_flag;
  }
  return flag;
}

var div, con;
    
var fun = function(){
  div.innerHTML = 'Mouse here: '+ event.pageX+':'+event.pageY;
  if (time_up(dt)) {
    console.log(div.innerHTML);
    //socket.emit('echo data',  event.pageX+':'+event.pageY);
    var xr = parseInt(event.pageX/2 /127);
    var x = parseInt(event.pageX/2 % 127);
    var yr = parseInt(event.pageY/2 /127);
    var y = parseInt(event.pageY/2 % 127);
    console.log(127*xr,x,127*yr,y,1);
    //socket.emit('to arduino', String.fromCharCode(127*xr,x,127*yr,y,1));
    conn.send(String.fromCharCode(127*xr,x,127*yr,y,1))
  }
};

function canvasMouseMove( event ){
  div.innerHTML = 'Mouse here: '+ event.pageX+':'+event.pageY;
  if (time_up(dt)) {
    console.log(div.innerHTML);
    //socket.emit('echo data',  event.pageX+':'+event.pageY);
    var xr = parseInt(event.pageX/2 /127);
    var x = parseInt(event.pageX/2 % 127);
    var yr = parseInt(event.pageY/2 /127);
    var y = parseInt(event.pageY/2 % 127);
    console.log(127*xr,x,127*yr,y,1);
    //socket.emit('to arduino', String.fromCharCode(127*xr,x,127*yr,y,1));
    conn.send(String.fromCharCode(127*xr,x,127*yr,y,1))
  }
};

var ee;
function onDocumentTouchStart( event ) {
	
	event.preventDefault();
	//console.log('???::',event.touches[0].clientX,event.touches[0].clientY);
	event.pageX = event.touches[0].pageX;
	event.pageY = event.touches[0].pageY;
	//console.log('111?::',event.pageX,event.pageY);
	canvasMouseMove( event );
  
}

window.onload = function() {
  div = document.getElementById('hi');
  con = document.getElementById('con');
  con.addEventListener('mousemove', canvasMouseMove, false);
  //con.addEventListener( 'touchstart', onDocumentTouchStart, false );
  con.addEventListener( 'touchmove', onDocumentTouchStart, false );
  
};