import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: String,
  attachments: [
    {
      url: String,
      filename: String,
      mime_type: String,
      size: Number,
    },
  ],
  read_by: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      read_at: { type: Date, default: Date.now },
    },
  ],
  sent_at: { type: Date, default: Date.now },
  edited_at: Date,
});

export const Message = model('Message', messageSchema);
