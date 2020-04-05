var express = require('express');
var app = express();
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1
var users=new Array();
var userss=new Array();
var pss=new Array();
var userr=new Array();
app.get('/',function(req, res){  //2
  res.sendFile(__dirname + '/index.html');
});

var count=1;
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  var name = "유저" + count++;                 //3-1
  userss.push(name);

  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
    io.emit('out',users[userss.indexOf(name)]);
    users[userss.indexOf(name)]=0;
    userss[userss.indexOf(name)]=0;
  });
  socket.on('take', function(){ //3-2
    io.emit('calltake',userr,pss);
  });

  socket.on('send message', function(name,text){ //3-3
    var msg = name + ':></324  ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });

  socket.on('joinn', function(name,ps,num){ //3-2
    io.emit('join',name);
    pss.push(ps);
    if(num==1){
      userr.push(name);
      users.push(name);
    }
  });
  socket.on('online', function(){ //3-3
    io.emit('receive online', users,userss);
  });

});

http.listen(3000, function(){ //4
  console.log('server on!');
  console.log(pss,userr);
});
