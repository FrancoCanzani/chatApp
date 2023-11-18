import { mongoose, model } from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: String,
  Id: { type: String, required: true },
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true,
  },
  participants: [{ type: String, ref: 'User' }],
  administrators: [{ type: [String], ref: 'User' }],
  createdBy: { type: String, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Room = model('Room', roomSchema);
