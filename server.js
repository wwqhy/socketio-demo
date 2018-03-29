const express = require('express');
const app = express();

const port = process.env.PORT || 1234;

app.use(express.static('static'));

const server = app.listen(port, () => {
  console.log(`technode is on port ${port} |`);
});

const io = require('socket.io').listen(server);
var data = []
io.sockets.on('connection', (socket) => {
  socket.on('set nickname', (name) => {
    socket.nickname = name;
    socket.broadcast.emit('new user', {
      nickname: name,
      type: 'user',
    });
    socket.emit('login', {
      nickname: name,
      id: socket.id,
    });
  });
  socket.on('new dialog', (str) => {
    io.emit('new dialog', {
      value: str,
      nickname: socket.nickname,
      type: 'dialog',
    });
  });
  socket.on('getlist', () => {
    setInterval(() => {
      io.emit('getlist',{
        data: {"createTime":1521774701000,"ruleType":"按次定价","calculationRuleDetailedList":[],"ruleTypeNo":"1","rulename":"每次收费0.2","ruleId":"977020028294660096","ruleCode":"","rulemeno":"每次收费0.2元"}
      })
    },1000*6)
  })
});
