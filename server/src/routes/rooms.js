import { Router } from 'express';
import { Room } from '../db/schemas/roomSchema.js';
import { Message } from '../db/schemas/messageSchema.js';

export const roomsRouter = Router();

roomsRouter.get('/rooms/participants/:participantId', async (req, res) => {
  const participantId = req.params.participantId;

  // Todo: add validation for participantId here

  try {
    const rooms = await Room.find({ 'participants.id': participantId });

    // if no rooms are found, return an empty array with a 200 status code
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

roomsRouter.post('/rooms', async (req, res) => {
  const { name, type, participants, administrators, creatorUid } = req.body;

  // Validate input
  if (!name || !type || !creatorUid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newRoom = new Room({
      name,
      type,
      participants,
      administrators,
      createdBy: creatorUid,
      createdAt: new Date(),
    });

    await newRoom.save();

    // todo: switch to a message
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
});

roomsRouter.patch(
  '/rooms/:roomId/remove-participant/:participantId',
  async (req, res) => {
    const roomId = req.params.roomId;
    const participantId = req.params.participantId;

    try {
      if (!roomId) {
        return res.status(400).json({ error: 'Room ID is required' });
      }

      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      // Check if the participant exists in the room
      if (!room.participants.includes(participantId)) {
        return res
          .status(404)
          .json({ error: 'Participant not found in the room' });
      }

      // Remove participant from the room
      await Room.updateOne(
        { _id: roomId },
        { $pull: { participants: participantId } }
      );

      res.status(200).json({
        message: `Participant ${participantId} removed from room ${roomId}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

roomsRouter.patch('/rooms/:roomId/participants', async (req, res) => {
  const roomId = req.params.roomId;
  const { participant } = req.body;

  if (!roomId || !participant) {
    return res
      .status(400)
      .json({ error: 'Room ID and Participant data are required' });
  }

  try {
    await Room.updateOne(
      { _id: roomId },
      { $addToSet: { participants: participant } }
    );

    res.status(200).json({ message: 'Participant added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
