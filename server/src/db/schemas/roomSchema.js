import { mongoose, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
  joinLink: { type: String },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

roomSchema.methods.generateJoinLink = function () {
  this.joinLink = uuidv4().toString().replaceAll('-', '');
};

export const Room = model('Room', roomSchema);
