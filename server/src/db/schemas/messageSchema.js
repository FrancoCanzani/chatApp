import { mongoose, model } from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    ref: 'Room',
    required: true,
  },
  senderId: {
    type: String,
    ref: 'User',
    required: true,
  },
  senderDisplayName: {
    type: String,
    ref: 'User',
    required: true,
  },
  text: String,
  readBy: [
    {
      userId: { type: String, ref: 'User' },
      readAt: { type: Date, default: Date.now },
    },
  ],
  sentAt: { type: Date, default: Date.now },
  editedAt: Date,
});

export const Message = model('Message', messageSchema);
