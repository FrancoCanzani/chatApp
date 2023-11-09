import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// This is for when you're running your frontend and backend on the same domain and port
const URL =
  process.NODE_ENV === 'production'
    ? undefined // When in production, you'd probably have the frontend and backend on the same domain
    : 'http://localhost:3000'; // This should match the port of your backend server when in development

export const socket = io(URL);
