import visual as vp
import serial
import time
from math import *

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=10000)

def move_mouse(pos, laser_on):
    x,z,y = pos.x, pos.y, pos.z
    r = sqrt(x**2 + y**2)
    theta = int(asin(r) * 180/pi)
    phi = int(acos(x)*180/pi)
    
    theta = theta if (theta < 180) else 180
    theta = theta if (theta > 0) else 0
    phi = phi if (phi < 180) else 180
    phi = phi if (phi > 0) else 0

    command = chr(theta)+chr(phi)+chr(int(laser_on))
    print command
    ser.write(command)


def spherical(pos):
    x,z,y = pos.x, pos.y, pos.z
    r = sqrt(x**2 + y**2)
    theta = int(asin(r) * 180/pi)
    phi = int(acos(x)*180/pi)
    theta = theta if (theta < 180) else 180
    theta = theta if (theta > 0) else 0
    phi = phi if (phi < 180) else 180
    phi = phi if (phi > 0) else 0
    return theta, phi
    


def move_keyboard(theta, phi, laser_on):
    print "{}--{}--{}".format(theta, phi, laser_on)
    ser.write(chr(theta)+chr(phi)+chr(int(laser_on)))



disp = vp.display(background = vp.color.black, width = 800,height=800,title='fullscreen')

for x in range(11):
    vp.curve(pos = [(x - 5, 0, -5),(x - 5, 0, 5)], color = vp.color.red, radius=0.02)
    vp.curve(pos = [(-5, 0, x-5),(5, 0, x-5)], color = vp.color.blue, radius=0.02)

vp.arrow(pos=(0,0,0),axis=(0,0,1),length = 1,shaftwidth = 1/20.0*1)
vp.arrow(pos=(0,0,0),axis=(1,0,0),length = 1,shaftwidth = 1/20.0*1)

arrow = vp.arrow(pos=(0,0,0),axis=(0,1,0),length = 2,shaftwidth = 1/2.0*1, color = vp.color.white)

paused = False
is_dragging = False


theta = 100
phi = 100
dead = False
laser_on = True

while not dead: 
    vp.rate(30)
    if is_dragging:
        drag_pos = disp.mouse.pos
        drag_pos = vp.norm(drag_pos)
        arrow.axis = drag_pos
        theta, phi = spherical(drag_pos)
        move_keyboard(theta, phi, laser_on) 

    if disp.mouse.events: 
        m1 = disp.mouse.getevent() # get event
        if m1.drag: 
            is_dragging = True
        if m1.drop:
            is_dragging = False

    if disp.kb.keys: # event waiting to be processed?
        s = disp.kb.getkey() # get keyboard info
        if s == 'w' and phi >= 5:
            phi -= 5         
        if s == 's' and phi <=175:
            phi += 5         
        if s == 'd' and theta <=175:
            theta += 5         
        if s == 'a' and theta >= 5:
            theta -= 5         
        if s == 'backspace':
            ser.close()
            dead = True
        if s == 'z':
            laser_on = not laser_on
        #update_vec(theta,phi,arrow)

        move_keyboard(theta, phi, laser_on) 
            
quit()


