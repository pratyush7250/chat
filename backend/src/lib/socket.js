import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chatty-lzfz.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId]
}


//used to store online users
const userSocketMap = {} //{userId:socketId}

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id)
  const userId = socket.handshake.query.userId; //extract userId from socket query paramas being sennt form th clinet side
  if (userId) {
    userSocketMap[userId] = socket.id; //then we store userId and socketid in map
  }

  //io.emit() is used to send events to all the connected clients in frontend 
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id)
    delete userSocketMap[userId]; // when user disconnects we remove him form the userSocketMap and emit to all the clinets in frontend
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

  })
})


export { io, app, server };
