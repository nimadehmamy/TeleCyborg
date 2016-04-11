var myid = 'nimi';
var peer = new Peer(myid,
  {key: 'ihbxylb73u15rk9'},
  options ={
    config: {
      'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]
    }
  });
// You can pick your own id or omit the id if you want to get a random one from the server.

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

var otherPeer = 'kivi',
    conn = peer.connect(otherPeer);

conn.on('open', function() {
    // Receive messages
    conn.on('data', function(data) {
        console.log('Peer '+otherPeer+' says:\n', data);
    });
    
    // Send messages
    conn.send({client: {
        id: myid,
        t0: new Date().getTime()
    }
    });
});

peer.on('connection', function(conn1) {
    conn1.on('data', function(data){
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

var t0 = new Date().getTime(),
    t_flag = new Date().getTime(),
    dt = 200,
    laserOn = 1;

function time_up(dt) {
    var flag = false;
    t_flag = new Date().getTime();
    if (t_flag - t0 > dt ) {
        console.log(t_flag-t0);
        flag = true;
        t0 = t_flag;
        
    }
    return flag;
}

var div, con;

// function canvasMouseMove( event ){
//   div.innerHTML = 'Mouse here: '+ event.pageX+':'+event.pageY;
//   if (time_up(dt)) {
//     console.log(div.innerHTML);
//     //socket.emit('echo data',  event.pageX+':'+event.pageY);
//     var xr = parseInt(event.pageX/2 /127);
//     var x = parseInt(event.pageX/2 % 127);
//     var yr = parseInt(event.pageY/2 /127);
//     var y = parseInt(event.pageY/2 % 127);
//     console.log(127*xr,x,127*yr,y,1);
//     //socket.emit('to arduino', String.fromCharCode(127*xr,x,127*yr,y,1));
//     //conn.send(String.fromCharCode(127*xr,x,127*yr,y,1));
//     sendData('arduino', String.fromCharCode(127*xr,x,127*yr,y,1))
//   }
// }

function canvasMouseMove( event ){
    div.innerHTML = 'Mouse here: '+ event.pageX+':'+event.pageY;
    if (time_up(dt)) {
        console.log(div.innerHTML);
        var data = {
            motors: [event.pageX / 2, event.pageY / 2],
            laser: laserOn,
            time: new Date().getTime()
        };
        //console.log(data);
        sendData('arduino', data);
    }
}

function sendData(label, data){
    if (label == 'arduino'){
        console.log('sending binary to arduino');
        conn.send({'arduino': data});
    }
}

function onDocumentTouchStart( event ) {
	event.preventDefault();
	event.pageX = event.touches[0].pageX;
	event.pageY = event.touches[0].pageY;
	canvasMouseMove( event );
  
}

window.onload = function() {
    div = document.getElementById('hi');
    con = document.getElementById('con');
    con.addEventListener('mousemove', canvasMouseMove, false);
    //con.addEventListener( 'touchstart', onDocumentTouchStart, false );
    con.addEventListener( 'touchmove', onDocumentTouchStart, false );
  
};