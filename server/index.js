import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Vite dev server port here
    methods: ['GET', 'POST'],
  },
});

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle when the user disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Server-side code to handle joining a room
  socket.on('joinRoom', ({ roomName }) => {
    socket.join(roomName);
  });

  // Server-side code to emit a message to a room
  socket.on('messageToRoom', ({ roomName, message }) => {
    socket.to(roomName).emit('messageToRoom', message);
  });

  // ... any other event listeners related to this socket
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
