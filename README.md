# Remote Arduino control with webRTC

## Structure

## Usage

## TODO
### Time stamping 
I want to time-stamp all data snippets transferred between the client and the robot node such that the temporal pattern of movements can be recreated in the movements. This is eesential because the packets arrive in packs and generally with times vastly different from when they were sent. 

### How?
for the motors, each JSON also contains a time stamp __tp__. On the robot side, time is different, but we can try to recreate the the temporal pattern using timeouts and the time differenc ebetween stamps.

Say __packet1__ has stamp __t1__. The the packet gets added to the arduinoBuffer. Now, when should this packet be executed? We can't compare its time stamp with the robot node's. We have to emit an initial time stamp __t0__ from the client right when the connection is established and acknoledgement must be sent back to client. After this, the task is standard: for each packet __p__ that is received, we just create a timeout for __tp-t0__, having the packet processed by the arduino at that time. 

But, what if the packets all arrive late and all the timeouts is negative(i.e. they all seem in the past and again get executed simultabeously by the arduino)? We can first test it by adding an extra delay to see if the timeouts work correctly for recreating the temporal pattern. 


