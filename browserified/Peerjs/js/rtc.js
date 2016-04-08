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
    //to_arduino(data);
    socket.emit('to arduino', data);
  });
});




/*
// for now without video
var video;
video = document.querySelector("#player");
peer.on('call', function(call) {
  // Answer the call, providing our mediaStream
  //call.answer(mediaStream);
  call.answer(null);
  console.log("Video call!");
  call.on('stream', function(stream) {
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
    //video = document.querySelector("#player");
    console.log(video);
    video.src = window.URL.createObjectURL(stream);
  });
});


function success(stream){
  var video = document.querySelector("#player");
  video.src = window.URL.createObjectURL(stream);
}

*/


/*
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function(call) {
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      var video = document.querySelector("#player");
      video.src = window.URL.createObjectURL(remotestream);
    });
  
  //getUserMedia(
  
  navigator.webkitGetUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      var video = document.querySelector("#player");
      video.src = window.URL.createObjectURL(remotestream);
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
  
});
*/








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
