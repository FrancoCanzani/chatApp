import { Router } from 'express';
import { Message } from '../db/schemas/messageSchema.js';

export const messagesRouter = Router();

messagesRouter.get('/messages/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const lastMessageId = req.query.lastMessageId;
    const limit = parseInt(req.query.limit, 10) || 20; // default to 20 messages

    const query = { roomId };
    if (lastMessageId) {
      query._id = { $lt: lastMessageId };
    }

    const messages = await Message.find(query)
      .sort({ sentAt: -1 })
      .limit(limit);

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

messagesRouter.post('/messages', async (req, res) => {
  try {
    const { roomId, senderId, senderDisplayName, text } = req.body;

    // Validate required fields
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
