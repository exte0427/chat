var express = require('express');
var app = express();
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1
var users=new Array();
var userss=new Array();
var pss=new Array();
var userr=new Array();
var dod=new Array();
var roomnames=new Array("main");
var roomplss=new Array("");
var roomusers=new Array("exmuh");
var roommessage=new Array("");
var roomchannelf=new Array("");
var roomiso=new Array("배정받지 못한자들의 방");
var roomchannel=new Array("Main Chat");
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
    dod[userss.indexOf(name)]=0;
  });
  socket.on('take', function(){ //3-2
    io.emit('calltake',userr,pss);
  });
  socket.on('makeronm', function(name,user,miso){ //3-2
    if(name!=null){
    roomnames.push(name);
    roomchannel.push("Main Chat");
    roomusers.push(user);
    roommessage.push("");
    roomchannelf.push("");
    roomiso.push(miso)
    }
  });
  socket.on('makechannel', function(room,channel,name){ //3-2
    if(channel!=null){
      if(name==roomusers[roomnames.indexOf(channel)]){
        roomchannel[roomnames.indexOf(channel)]=roomchannel[roomnames.indexOf(channel)]+"asdf2903u"+room;
      }
    }
  });

  socket.on('send message', function(name,text,roomname,channelname){ //3-3
    var isso=0;
    var yourname="";
    if(name.indexOf("<<<<<<<%:")!=-1){
      isso=1;
      var ji=name.split("<<<<<<<%:");
      name=ji[1];
      yourname=ji[0];
    }
    var msg = name + ':></324  ' + text+':></324'+roomname;
    if(isso==0){console.log(msg);}
    var is=0;
    if(text!=""){
      for(var i=0;i<text.length;i++){
        if(text[i]!=" "){
          is++;
        }
      }
    }
    if(msg.indexOf('<script>')!=-1){is==0}
    if(msg.indexOf('</script>')!=-1){is==0}
    if(msg.indexOf('<a>')!=-1){is==0}
    if(msg.indexOf('<ruby>')!=-1){is==0}
    if(msg.indexOf('eval')!=-1){is==0}
    if(is!=0){
      if(isso==0){
        roommessage[roomnames.indexOf(roomname)]=roommessage[roomnames.indexOf(roomname)]+"asdf!@#$%"+name+":><:"+text;
        roomchannelf[roomnames.indexOf(roomname)]=roomchannelf[roomnames.indexOf(roomname)]+"asdf!@#$%"+channelname;
        io.emit('receive message', msg,channelname);
      }
      else{
        io.emit('receive message', yourname+"asdf"+msg,channelname);
      }
    }
  });
  socket.on('mention1', function(namedd){
    io.emit('mention',namedd);
  });
  socket.on('joinn', function(name,ps,num){ //3-2
    io.emit('join',name);
    users.push(name);
    dod.push("온라인");
    if(num==1){
      userr.push(name);
      pss.push(ps);
    }
  });
  socket.on('online', function(nicnmae,doo){ //3-3
    dod[users.indexOf(nicnmae)]=doo;
    io.emit('receive online', users,userss,dod,roomnames,roomusers,roommessage,roomiso,roomchannel,roomchannelf);
  });

});

http.listen(3000, function(){ //4
  console.log('server on!');
  console.log(pss,userr);
});
