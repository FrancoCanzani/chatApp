import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: false },
  display_name: String,
  avatar: String,
  status: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'online',
  },
  last_seen: Date,
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  blocked_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = model('User', userSchema);
