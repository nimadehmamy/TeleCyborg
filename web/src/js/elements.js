
function Scores(){
  this.player1 = 0 ;
  this.player2 = 0 ;
  this.up1 = function(){
    this.player1 +=1;
  }
}

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;

  this.render = function(pad_color) {
    if (!pad_color){
      context.fillStyle = "#FFFFFF";
    }
    else context.fillStyle = pad_color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };
  
  this.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) { // all the way to the left
      this.x = 0;
      this.x_speed = 0;
    } else if (this.x + this.width > canvas.width) { // all the way to the right
      this.x = canvas.width - this.width;
      this.x_speed = 0;
    }
    
    if(this.y < 0) { // all the way to the top
      this.y = 0;
      this.y_speed = 0;
    } else if (this.y + this.height > canvas.height) { // all the way to the bottom
      this.y = canvas.height - this.height;
      this.y_speed = 0;
    }
  };

}


function Agar(x, y, r) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 0;
  this.radius = r;
  
  this.render = function(pad_color) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    if (!pad_color){
      context.fillStyle = "#FFFFFF";
    }
    else context.fillStyle = pad_color;
    context.fill();
  };
  
  this.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x -this.radius < 0) { // all the way to the left
      this.x = this.radius;
      this.x_speed = 0;
    } else if (this.x + this.radius > canvas.width) { // all the way to the right
      this.x = canvas.width - this.radius;
      this.x_speed = 0;
    }
    if(this.y -this.radius < 0) { // all the way to the left
      this.y = this.radius;
      this.y_speed = 0;
    } else if (this.y + this.radius > canvas.height) { // all the way to the right
      this.y = canvas.height - this.radius;
      this.y_speed = 0;
    }
    
  };
  
  this.grow = function(r, b){ // b: 1= grow, -1=shrink
    this.radius = 1*Math.sqrt( this.radius*this.radius + b*10*r*r);
    this.speed= this.get_speed();
    
  };
  
  this.get_speed = function(){
    return 1+ 4.0*25*25/ (this.radius*this.radius);
  };
  
  this.speed = this.get_speed();

}





function Player(radius) {
  //this.paddle = new Paddle(canvas.width/2 - 25, canvas.height - 15 , 50, 10);
  this.paddle = new Agar(canvas.width/2 - radius, canvas.height - radius , radius);
   
  this.render = function() {
    this.paddle.render();
  };
  
  this.update = function() {
    for(var key in keysDown) {
      var value = Number(key);
      if(value == 37) { // left arrow
        this.paddle.move(-this.paddle.speed, 0);
      } else if (value == 39) { // right arrow
        this.paddle.move(this.paddle.speed, 0);
      } else if (value == 38) { // right arrow
        this.paddle.move(0, -this.paddle.speed);
      } else if (value == 40) { // right arrow
        this.paddle.move(0, this.paddle.speed);
      } else {
        this.paddle.move(0, 0);
      }
    }
  };

}

function Computer() {
  this.paddle = new Paddle(canvas.width/2 - 25, 15 , 50, 10);
  
  // the unbeatable AI!!
  this.update = function(ball) {
    var x_pos = ball.x+ 4*(Math.random()-0.5); //error in measuring x pos of ball
    var y_pos = ball.y;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
    var diffy = y_pos - this.paddle.y ;
    if(diff < 0 && diff < -4) { // max speed left
      diff = -4;
    } else if(diff > 0 && diff > 4) { // max speed right
      diff = 4;
    }
    // move randomly toward ball in y
    if(diffy > 0 && this.paddle.y < canvas.height - 50  ) { // max speed left
      diffy = diffy/100+4*(Math.random()-0.5);
    } else if(diffy < 0 && this.paddle.y >10 ) { // max speed right
      diffy = -5;
    }
    
  //  this.paddle.move(diffy);
    this.paddle.move(diff, diffy);
    if(this.paddle.x < 0) {
      this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > canvas.width) {
      this.paddle.x = canvas.width - this.paddle.width;
    }
  };
  
  this.render = function(comcol) {
    if (comcol) this.paddle.render(comcol);
    else this.paddle.render("#FFFF00");
  };
}




function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;


  this.render = function() {
    context.beginPath();
  //context.fillRect(this.x, this.y, this.width, this.height);
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#ffffff";
    context.fill();
  };
  
  this.update = function(paddle1, paddle2, scores) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;
  
    if(this.x - 5 < 0) { // hitting the left wall
      this.x = 5;
      this.x_speed = -this.x_speed;
    } else if(this.x + 5 > canvas.width) { // hitting the right wall
      this.x = canvas.width - this.radius;
      this.x_speed = - this.x_speed;
    }
  
    if(this.y < 0 || this.y > canvas.height) { // a point was scored
      if(this.y<0){ scores.up1();}
      if(this.y> canvas.height){ scores.player2+=1;}
      this.x_speed = 3*Math.cos(2*Math.PI*(Math.random()-0.5));
      this.y_speed = 3*Math.sin(2*Math.PI*(Math.random()-0.5));
      this.x = canvas.width/2;
      this.y = canvas.height/2;
      
      
    }
  
    //if(top_y > 300) {
      if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
        // hit the player's paddle
        this.y_speed = -3;
        this.x_speed += (paddle1.x_speed / 2);
        this.y += this.y_speed;
      }
    //} else {
      if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
        // hit the computer's paddle
        this.y_speed = 3;
        this.x_speed += (paddle2.x_speed / 2);
        this.y += this.y_speed;
      }
    //}
  };

}

function Rotate(x,y, cos_theta){
  // provide location vetors and
  var c = cos_theta;
  var s = Math.sqrt(1 - c*c);
  return [c*x - s*y, s*x + c*y];
}

function Dods(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
  this.in=0; // check if it's inside Agar
  this.agar_x = 0;
  this.agar_y = 0;

  this.render = function() {
    context.beginPath();
  //context.fillRect(this.x, this.y, this.width, this.height);
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#ff0000";
    context.fill();
  };
  
  this.get_reflection_angle = function(v,r){
    var c = (v[0]*r[0] + v[1]*r[1])/ Math.sqrt((v[0]*v[0] + v[1]*v[1])* (r[0]*r[0] + r[1]*r[1]));
    return 1 - 2*c*c ; // the cosine of reflection angle
  }
  
  this.bounce = function(agar, damping){
    var vax = agar.x - this.agar_x;
    var vay = agar.y - this.agar_y;
    // calculate the angle with the wall of agar and reflect
    // basically, it's the angle of Dod speed with line connecting
    //this.x_speed = 2*vax - this.x_speed;
    //this.y_speed = 2*vay - this.y_speed;
    // get angle of relative speed with agar wall
    this.x_speed -= vax;
    this.y_speed -= vay;
    var c = this.get_reflection_angle([this.x_speed,this.y_speed],[this.x-agar.x,this.y-agar.y]);
    // rotate to reflection angle
    var v = Rotate(this.x_speed,this.y_speed, c);
    this.x_speed = (1-damping)*v[0];
    this.y_speed = (1-damping)*v[1];
    // go back to ref frame
    this.x_speed += vax;
    this.y_speed += vay;
    
  }
  
  this.is_inside = function(agar,tol){// tol: tolerance
    return ((this.x-agar.x)*(this.x-agar.x) + (this.y-agar.y)*(this.y-agar.y) < (agar.radius-this.radius-tol)*(agar.radius-this.radius-tol));
  }
  
  this.update = function(agar, scores) {
    
    this.x += this.x_speed;
    this.y += this.y_speed;
    
    if(this.x - 5 < 0) { // hitting the left wall
      this.x = 5;
      this.x_speed = -this.x_speed;
    } else if(this.x + 5 > canvas.width) { // hitting the right wall
      this.x = canvas.width - this.radius;
      this.x_speed = - this.x_speed;
    }
    
  
    if(this.y < 0 || this.y > canvas.height) { // a point was scored
      if(this.y<0){ scores.up1();}
      if(this.y> canvas.height){ scores.player2+=1;}
      this.x_speed = 3*Math.cos(2*Math.PI*(Math.random()-0.5));
      this.y_speed = 3*Math.sin(2*Math.PI*(Math.random()-0.5));
      this.x = canvas.width/2;
      this.y = canvas.height/2;
      this.in = 0; // reset
      
      
    }
    
    if((!this.in) && this.is_inside(agar,0) ){
      // hit the computer's paddle
      /*this.y_speed = 3;
      this.x_speed += (agar.x_speed / 2);
      this.y += this.y_speed;
      */
      this.in = 1;
      this.agar_x = agar.x;
      this.agar_y = agar.y;
      agar.grow(this.radius, 1);
      
      
    }
    
    if (this.in){
      if(!this.is_inside(agar,2)){
        //try fixing by bouncing
        this.bounce(agar,.1);
      }
      this.agar_x = agar.x;
      this.agar_y = agar.y;
    }
    
    if (this.in && (!this.is_inside(agar,-5))){
      //escaped, shrink and in -> 0
      this.in=0;
      agar.grow(this.radius, -1)
    }
  };

}









