const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
const { port } = require('./config');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    method: ['GET', 'POST']
  }
});

let socketList = {};
const users = {};

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));

//   app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });
// }

app.get('/', (req, res) => {
  res.send("Server is running.");
});

io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    Object.fromEntries(
      Object.entries(socketList).filter(([key, value]) => {
        const index = value.findIndex((userArr) => userArr.socket === socket.id);
        if (index > -1) {
          socketList[key].splice(index, 1);
        }
      })
    )

    socket.disconnect();
    console.log('User disconnected!');
  });

  socket.on('VIDEO-check-user', ({ roomID, userName }) => {
    if (!roomID) {
      socket.emit("VIDEO-error", { error: 'Room name is empty' });
      return;
    }

    if (!userName) {
      socket.emit("VIDEO-error", { error: 'User name is empty' });
      return;
    }

		if (socketList[roomID]) {
			const length = socketList[roomID].length;
			if (length === 4) {
				socket.emit("VIDEO-error", { error: 'Room is full. 4/4' });
				return;
			}

      const duplicateUserName = socketList[roomID].filter((user) => user.userName === userName);
      if (duplicateUserName.length > 0) {
        socket.emit("VIDEO-error", { error: 'User name already exist' });
        return;
      }

			socketList[roomID].push({socket: socket.id, userName});
		} else {
			socketList[roomID] = [{socket: socket.id, userName}];
		}

    socket.emit("VIDEO-response");
  });

  socket.on('VIDEO-join-room', ({ roomID, userName }) => {
    console.log('join!')
    socket.join(roomID);

    try {
      const user = socketList[roomID].find(x => x.socket === socket.id);
      Object.assign(user, { userName, video: true, audio: true });
      socket.emit('VIDEO-user-join', {data: socketList[roomID]});
    } catch {
      io.sockets.in(roomID).emit('VIDEO-error', { err: 'User exist' });
    }
  });

  socket.on('VIDEO-call-user', ({ userToCall, userID, signal, roomID }) => {
    io.to(userToCall).emit('VIDEO-receive-call', {
      signal,
      userID,
      info: socketList[roomID],
    });
  });

  socket.on('VIDEO-accept-call', ({ signal, to }) => {
    io.to(to).emit('VIDEO-call-accepted', {
      signal,
      answerID: socket.id,
    });
  });

  socket.on('CHAT-send-message', ({ roomID, message, sender }) => {
    io.sockets.in(roomID).emit('CHAT-receive-message', { message, sender });
  });
});

server.listen(port, () => console.log(`server... ${port}`));