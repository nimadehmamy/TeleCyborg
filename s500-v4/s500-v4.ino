/*
 * Nima Dehmamy, Dec 2015
 * We used Chars to control servos 
 * but in communication they seem to only go up to 127
 * higher than that is misinterpreted
 * Thus I will use two chars for each servo to allow 
 * 180 degrees
 * 
 */


#include <Servo.h>
const int n = 2;
Servo s[n];
int ang[n];
int a[2*n]; // chars for serial com and servo control

boolean receivedAngles=false;
boolean laserOn=false;


void setup() {
  // put your setup code here, to run once:
  s[0].attach(9);
  s[1].attach(10);
  Serial.begin(57600);
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  Serial.println("I'm ready!");
}

void loop() {
 
  fetchAngles();
  // put your main code here, to run repeatedly:
  if (receivedAngles){
    Serial.print("Received: ");
    for (int i; i<2*n; i++){
      Serial.print(a[i]); Serial.print(", ");
      // group two chars to make angle for servos
      if (i % 2 == 0) ang[i/2] = a[i];
      else ang[i/2] = min(ang[i/2] + a[i],180);
    }
    Serial.println(laserOn);
    for (int i; i < n; i++){
      s[i].write(ang[i]);      
    }
    Serial.println("Servos going to: "
    +String(ang[0])+" and "+String(ang[1])+ ". Laser is " + 
    ((laserOn) ? "on" : "off"));
    if (laserOn ) digitalWrite(13, LOW);
    else digitalWrite(13, HIGH);
  }
  delay(2);
}


void fetchAngles() {
  if (Serial.available()) {
    // get the new byte:
    a[0] = (int)Serial.read();
    delay(2);
    a[1] = (int)Serial.read();
    delay(2);
    a[2] = (int)Serial.read();
    delay(2);
    a[3] = (int)Serial.read();
    delay(2);
    laserOn = ((int)Serial.read()<60);//(boolean)Serial.read();
    receivedAngles=true;
  }
  else receivedAngles=false;
}

