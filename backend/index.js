import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
// In your backend server configuration
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Vite dev server port here
    methods: ['GET', 'POST'],
  },
});

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

let status;

io.on('connection', (socket) => {
  console.log('a user connected');
  status = 'A user connected';
  socket.on('disconnect', () => {
    console.log('user disconnected');
    status = 'A user disconnected';
  });
});

app.get('/', (req, res) => {
  res.json(status);
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
