#!/bin/bash
sudo chmod a+rw /dev/ttyACM0
echo "go to localhost:8000"
node app.js
