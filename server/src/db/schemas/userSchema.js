import { mongoose, model } from 'mongoose';

const userSchema = new mongoose.Schema({
  displayName: String,
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: false },
  avatar: String,
  status: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'online',
  },
  lastSeen: Date,
  contacts: [String], // Array of Firebase UIDs
  blockedUsers: [String], // Array of Firebase UIDs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = model('User', userSchema);
