import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  administrators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Room = model('Room', roomSchema);
