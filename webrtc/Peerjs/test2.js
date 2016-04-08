//Signaling Code Setup
 
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