import { Router } from 'express';
import { Message } from '../db/schemas/messageSchema.js';

export const messagesRouter = Router();

messagesRouter.get('/messages/:roomId/:page', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const page = parseInt(req.params.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const totalMessages = await Message.countDocuments({ roomId });
    const isEndOfList = startIndex + limit >= totalMessages;

    const messages = await Message.find({ roomId })
      .sort({ _id: -1 }) // Sort by ID in descending order as the db is already in creation order
      .skip(startIndex)
      .limit(limit);

    res.json({
      messages: messages.reverse(), // reverse to maintain chronological order
      isEndOfList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

messagesRouter.post('/messages', async (req, res) => {
  try {
    const { roomId, senderId, senderDisplayName, text } = req.body;

    if (!roomId || !senderId || !senderDisplayName || !text) {
      return res.status(400).send('Missing required fields');
    }

    const newMessage = new Message({
      roomId,
      senderId,
      senderDisplayName,
      text,
      sentAt: new Date(),
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send('Internal Server Error');
  }
});
