
function Chart_Path(chart1) {
  this.ctx = chart1.getContext("2d");
  this.x=[0];
  this.y=[50];
  var npoints = 200;
  for (ii = 1 ; ii < npoints ; ii++) {
    this.x.push( ii* chart1.width/npoints );
    this.y.push(50);
  }
  
  
  this.width= 30;
  this.height=20;
  this.render = function(lcolor) {
    //var ctx = chart_ctx;
    //chart_ctx.fillStyle = "#aa0000";
    //chart_ctx.fillRect(this.x[0], this.y[0], this.width, this.height);
    //chart_ctx.stroke();
    this.ctx.beginPath();
    if (lcolor) {
      this.ctx.strokeStyle=lcolor;
    } else this.ctx.strokeStyle="green";
    this.ctx.lineWidth="2";
    this.ctx.moveTo(this.x[0],this.y[0]);
    var len = this.y.length;
    for (var ii =1; ii < len; ii++) {
      this.ctx.lineTo(this.x[ii],this.y[ii]);
    }
    this.ctx.stroke();
  }
  this.update = function(posx, posy) {
    //this.y=[pos];
    if (posx != "no") {
      this.x.shift();
      this.x.push(50+(posx-150)/3);
    }
    this.y.shift();
    this.y.push(50+(posy-400)/10);
    
  }
  
}

