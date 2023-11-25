import {mongoose, model} from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: false },
  displayName: String,
  avatar: String,
  status: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'online',
  },
  lastSeen: Date,
  contacts: [{ type: String, ref: 'User' }],
  blockedUsers: [{ type: String, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = model('User', userSchema);
