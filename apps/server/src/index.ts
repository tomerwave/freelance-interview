import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  const interval = setInterval(() => {
    socket.emit("request-counter");
  }, 1000);

  socket.on("counter-value", (value: number) => {
    console.log(`Client ${socket.id} has a counter value of ${value}`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected ${socket.id}`);
    clearInterval(interval);
  });
});

// Start the server
httpServer.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
