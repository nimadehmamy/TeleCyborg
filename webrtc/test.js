var configuration = {
        'iceServers': [{
                'url': 'stun:stun.l.google.com:19302'
        }]
};
 
var rtcPeerConn;
 
var dataChannelOptions = {
        ordered: false, //no guaranteed delivery, unreliable but faster
        maxRetransmitTime: 1000, //milliseconds
};
 
var dataChannel;



var peerConnection = new RTCPeerConnection();

// Establish your peer connection using your signaling channel here
var dataChannel =
  peerConnection.createDataChannel("myLabel", dataChannelOptions);

dataChannel.onerror = function (error) {
  console.log("Data Channel Error:", error);
};

dataChannel.onmessage = function (event) {
  console.log("Got Data Channel Message:", event.data);
};

dataChannel.onopen = function () {
  dataChannel.send("Hello World!");
};

dataChannel.onclose = function () {
  console.log("The Data Channel is Closed");
};