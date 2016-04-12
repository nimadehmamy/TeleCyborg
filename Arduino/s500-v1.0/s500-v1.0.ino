/*
 * Nima Dehmamy, Dec 2015
 * We used Chars to control servos
 * but in communication they seem to only go up to 127
 * higher than that is misinterpreted
 * Thus I will use two chars for each servo to allow
 * 180 degrees
 *
 */

#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

// called this way, it uses the default address 0x40
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
// you can also call it with a different address you want
//Adafruit_PWMServoDriver pwm = Adaerent address you want
//Adafruit_PWMServoDriver pwm = Adaerent address you want
//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x41);

// Depending on your servo make, the pulse width min and max may vary, you 
// want these to be as small/large as possible without hitting the hard stop
// for max range. You'll have to tweak them as necessary to match the servos you
// have!
#define SERVOMIN  150 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  600 // this is the 'maximum' pulse length count (out of 4096)

// our servo # counter
uint8_t servonum = 0;
uint16_t pulselen = SERVOMIN;

const int n = 16;
int m = 0; // to read from serial how many motors are controlled

//const byte numPins = 7;
//byte pins[] = {13, 14, 15, 16, 17, 18, 19};


//Servo s[n];
int ang[n];
int a[2*n]; // chars for serial com and servo control
// use bitRead(num, which_bit) for dig and ai
byte dig; // used for setting 8 digital outputs
byte ai; // used for 6 analog ins
String s;
// sensors
int sensor[] = {A0,A1,A2,A3};// 4,5 needed for servo shield ,A4,A5};


//flags
boolean allset=false;
boolean receivedAngles=false;
boolean laserOn=false;

void setup() {
  // put your setup code here, to run once:
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  //yield();  // 1600 is the maximum PWM frequency
  delay(1000);
  // at this point all servos are defined.
  Serial.begin(57600);
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  Serial.println("I'm ready!");
}

void loop() {
  processData();
  // put your main code here, to run repeatedly:
  if (receivedAngles){
    
    for (int i; i < m-1; i++){
      //s[i].write(ang[i]);
      if (ang[i]>0){
        pulselen = map(ang[i], 0, 180, SERVOMIN, SERVOMAX);
        pwm.setPWM(i, 0, pulselen); // servo i 
      }
    }
    
    if (laserOn ) digitalWrite(13, LOW);
    else digitalWrite(13, HIGH);
    Serial.println(s);
    
  }
  delay(2);
}


void processData() {
  if (Serial.available()) {
    if (allset){
      // get the new byte:
      s =" {motors:[";
      //Serial.print("Received:");// Serial.println(m);
      for (int i=0; i<m; i++){
        //Serial.print(a[i]); Serial.print(", ");
        a[2*i] = (int)Serial.read();
        delay(2);
        a[2*i+1] = (int)Serial.read();
        delay(2);
        ang[i] = min(a[2*i] + a[2*i+1],180);
        //Serial.print(ang[i]); Serial.print(", ");
        s += (int)(ang[i]);
        s +=((i<m-1) ? ",": "]");
      }
      s+=", sensors:[";
      for (int i=0; i<4;i++){
        s+= analogRead(sensor[i]);
        s +=((i<4-1) ? ",": "]");
      }
      // read state of digital pins and set them
      s+=", digital:[";
      dig = Serial.read();
      for (int i=0; i<8;i++){
        byte state = bitRead(dig, i);
        digitalWrite(2+i,state);
        s += (boolean)(state);
        s +=((i<8-1) ? ",": "]");
      }
      //Serial.println(laserOn);
      laserOn = ((int)Serial.read()<60);//(boolean)Serial.read();
      s+=", laseron:" +String((laserOn) ? "true" : "false"); 
      s+="}";
      receivedAngles=true;
    }else{
      m = 2;//(int)Serial.parseInt();
      
      allset = true;
    }
  }
  else receivedAngles=false;
}

