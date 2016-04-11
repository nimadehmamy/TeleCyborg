#!/bin/bash
sudo chmod a+rw /dev/ttyACM*
echo "go to localhost:8003"
node app.js
