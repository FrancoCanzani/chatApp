import { Router } from 'express';
import { Room } from '../db/schemas/roomSchema.js';

export const roomsRouter = Router();

roomsRouter.get('/rooms/participants/:participantId', async (req, res) => {
  const participantId = req.params.participantId;

  try {
    const rooms = await Room.find({ participants: participantId });

    if (rooms.length > 0) {
      res.status(200).json(rooms);
    } else {
      res.status(404).json({ message: 'No rooms found for this participant' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

roomsRouter.post('/rooms', async (req, res) => {
  const {
    roomName,
    roomId,
    roomType,
    participants,
    administrators,
    creatorId,
  } = req.body;

  // Validate input
  if (!roomName || !roomId || !roomType || !creatorId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newRoom = new Room({
      name: roomName,
      Id: roomId,
      type: roomType,
      participants: participants,
      administrators: administrators,
      createdBy: creatorId,
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
  '/rooms/:roomId/participants/:participantId',
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

      if (!room.participants.includes(participantId)) {
        return res
          .status(404)
          .json({ message: 'Participant not found in the room' });
      }

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
