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
  const { roomName, roomType, participants, administrators, creatorId } =
    req.body;

  // Validate input
  if (!roomName || !roomType || !creatorId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newRoom = new Room({
      name: roomName,
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

roomsRouter.patch(
  '/rooms/:roomId/add-participant/:participantId',
  async (req, res) => {
    const roomId = req.params.roomId;
    const participantId = req.params.participantId;

    try {
      if (!roomId) {
        return res.status(400).json({ error: 'Room ID is required' });
      }

      const room = await Room.findOne({ _id: roomId });
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      await Room.updateOne(
        { _id: roomId },
        { $addToSet: { participants: participantId } }
      );

      res.status(200).json({
        message: `Participant ${participantId} added to room ${roomId}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);
