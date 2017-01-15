# Remote Arduino control with webRTC
Note: Latest version is in Peer_socket. You will only need that and the Arduino folder. Rest is old and experimental stuff.


This is a package that allows control of robot over the internet from inside your browser. It won't require any plugins and should run on Chrome and Firefox. It uses webRTC for transfer of data, including audio and video.
In the current stage, if syncing of timing between client and host is done correctly, you should be able to control the robot with less than ~500ms delay.
I haven't worked on the project for a while, but I might get back to it, once I have more time.

## Structure
The full structure is:
1. Client-side web-app  which establishes RTC with the host and send information about mouse movements and keypress data, used to control the robot, to the host.
1. Host server web-app, communicating with a remote client using webRTC and with a node.js app using socket.io.
1. Host-side Arduino app controlling the robot and trnasmitting data, over a serial connection, to the node.js app.
1. Host node.js app both hosting the web-app using socket.io and establishing serial connection with the arduino controlling the robot.

## Usage

you'll need node.js. Install socket.io and serialport using npm.
```
npm install socket.io
npm install serialport
```
For webRTC, I have used peer.js. The code uses my key, which allows up to 50 webRTC connections, but please go to their website and make your own username and key.

Connect your arduino and burn the arduino code (I think the last one that works properly is s500-v4, not s500-v5).
Linux/Mac OS, modify the run.sh so that the /dev/... refers to the address of your Arduino.
Then just execute peer_socket/run.sh (it asks for sudo pass as it is trying to `sudo chmod a+x /dev/...`  to be able to establish serial connection) to start the node server. This makes serial connection with arduino and serves the web app at localhost:8000.

On the client-side just host the page that's inside peer_socket/Peerjs/.


## TODO
### Time stamping
I want to time-stamp all data snippets transferred between the client and the robot node such that the temporal pattern of movements can be recreated in the movements. This is eesential because the packets arrive in packs and generally with times vastly different from when they were sent.

### How?
for the motors, each JSON also contains a time stamp __tp__. On the robot side, time is different, but we can try to recreate the the temporal pattern using timeouts and the time differenc ebetween stamps.

Say __packet1__ has stamp __t1__. The the packet gets added to the arduinoBuffer. Now, when should this packet be executed? We can't compare its time stamp with the robot node's. We have to emit an initial time stamp __t0__ from the client right when the connection is established and acknoledgement must be sent back to client. After this, the task is standard: for each packet __p__ that is received, we just create a timeout for __tp-t0__, having the packet processed by the arduino at that time.

But, what if the packets all arrive late and all the timeouts is negative(i.e. they all seem in the past and again get executed simultabeously by the arduino)? We can first test it by adding an extra delay to see if the timeouts work correctly for recreating the temporal pattern.


