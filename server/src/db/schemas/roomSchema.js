import { mongoose, model } from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
  id: String,
});

const roomSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true,
  },
  participants: [participantSchema],
  administrators: [String],
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Room = model('Room', roomSchema);
