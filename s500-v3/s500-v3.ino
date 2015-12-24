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
int a1[2]={0,0}; // chars for serial com and servo control
int a2[2]={0,0};
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
    Serial.print(a1[0]); Serial.print(", ");
    Serial.print(a1[1]); Serial.print(", ");
    Serial.print(a2[0]); Serial.print(", ");
    Serial.print(a2[1]); Serial.print(", ");
    Serial.println(laserOn);
    ang[0] = min(a1[0]+a1[1],180);
    ang[1] = min(a2[0]+a2[1],180);
    s[0].write(ang[0]);
    s[1].write(ang[1]);
    Serial.println("Servos going to: "
    +String(ang[0])+" and "+String(ang[1]));
    if (laserOn ) digitalWrite(13, LOW);
    else digitalWrite(13, HIGH);
  }
  delay(2);
}


void fetchAngles() {
  if (Serial.available()) {
    // get the new byte:
    a1[0] = (int)Serial.read();
    delay(2);
    a1[1] = (int)Serial.read();
    delay(2);
    a2[0] = (int)Serial.read();
    delay(2);
    a2[1] = (int)Serial.read();
    delay(2);
    laserOn = ((int)Serial.read()<60);//(boolean)Serial.read();
    receivedAngles=true;
  }
  else receivedAngles=false;
}

