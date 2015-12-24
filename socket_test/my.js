

//  setTimeout(function(){ 1;}, 2000);
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


console.log('run this?');
var socket = io('http://localhost:8080');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'you hear me??!!!data' });
});
var div, con;
var fun = function(){
  div.innerHTML = 'Mouse here: '+ event.pageX+':'+event.pageY;
};
window.onload = function() {
  div = document.getElementById('hi');
  con = document.getElementById('con');
  con.addEventListener('mousemove', fun);
};