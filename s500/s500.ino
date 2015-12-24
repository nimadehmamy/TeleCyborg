/*
 * Nima Dehmamy, Dec 2015
 * we sent chars to arduino to control servos
 * but they seem to go only up to 127
 * so now I'll use two bytes
 */

#include <Servo.h>
Servo s1,s2;
int a1=0;
int a2=0;
boolean receivedAngles=false;
boolean laserOn=false;


void setup() {
  // put your setup code here, to run once:
  s1.attach(9);
  s2.attach(10);
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  Serial.println("I'm ready!");
}

void loop() {
  //Serial.println("hello world!!");
  fetchAngles();
  // put your main code here, to run repeatedly:
  if (receivedAngles){
    Serial.print(a1); Serial.print(", ");
    Serial.print(a2); Serial.print(", ");
    Serial.println(laserOn);
    s1.write(a1);
    s2.write(a2);
    if (laserOn ) digitalWrite(13, LOW);
    else digitalWrite(13, HIGH);
  }
  delay(2);
}


void fetchAngles() {
  if (Serial.available()) {
    // get the new byte:
    a1 = (int)Serial.read();
    delay(2);
    a2 = (int)Serial.read();
    delay(2);
    laserOn = ((int)Serial.read()<60);//(boolean)Serial.read();
    receivedAngles=true;
  }
  else receivedAngles=false;
}

