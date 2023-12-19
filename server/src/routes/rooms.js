import { Router } from 'express';
import { Room } from '../db/schemas/roomSchema.js';

export const roomsRouter = Router();

roomsRouter.get('/rooms/participants/:participantId', async (req, res) => {
  const participantId = req.params.participantId;

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

    // Generate a unique join link
    newRoom.generateJoinLink();

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
      const participantIndex = room.participants.findIndex(
        (p) => p.id === participantId
      );
      if (participantIndex === -1) {
        return res
          .status(404)
          .json({ error: 'Participant not found in the room' });
      }

      // Remove participant from the room
      room.participants.splice(participantIndex, 1);
      await room.save();

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
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check if the participant is already in the room
    const isParticipantExists = room.participants.some(
      (part) => part.id === participant.id
    );

    if (isParticipantExists) {
      return res
        .status(409)
        .json({ message: 'Participant already exists in the room' });
    }

    // Add the participant to the room
    room.participants.push(participant);
    await room.save();

    res.status(200).json({ message: 'Participant added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

roomsRouter.get('/join/:joinLink', async (req, res) => {
  const joinLink = req.params.joinLink;

  try {
    const room = await Room.findOne({ joinLink });
    if (!room) {
      return res.status(404).json({ error: 'Invalid link' });
    }

    res.status(200).json({ message: 'Joined room successfully', room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
