import { mongoose, model } from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true,
  },
  participants: [String],
  administrators: [String],
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Room = model('Room', roomSchema);
