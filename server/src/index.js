import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { roomsRouter } from './routes/rooms.js';
import { usersRouter } from './routes/users.js';
import { messagesRouter } from './routes/messages.js';
import { connectDB } from './db/connectDB.js';
import 'dotenv/config';

const app = express();
const httpServer = createServer(app);

connectDB();

const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ], // ports here
    methods: ['GET', 'POST', 'PATCH'],
  },
});

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  // Handle when the user disconnects
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });

  // Server-side code to handle joining a room
  socket.on('joinRoom', ({ roomId, user }) => {
    socket.join(roomId);
    console.log(`${user.name} joined room ${roomId}`);
  });

  // Server-side code to handle leaving a room
  socket.on('leaveRoom', ({ roomId, user }) => {
    socket.leave(roomId);
    console.log(`${user.id} left room ${roomId}`);
  });

  // Server-side code to emit a message to a room
  socket.on('messageToRoom', ({ roomId, message }) => {
    io.to(roomId).emit('messageToRoom', message);
  });
});

app.use('/', roomsRouter);
app.use('/', usersRouter);
app.use('/', messagesRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

export { httpServer, app, io };
