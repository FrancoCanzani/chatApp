import { Router } from 'express';
import { User } from '../db/schemas/userSchema.js';

export const usersRouter = Router();

usersRouter.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.find({ userId: userId });

    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'No user found with this Id' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

usersRouter.post('/users', async (req, res) => {
  const { displayName, userId, email } = req.body;

  if (!userId || !displayName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newUser = new User({
      displayName: displayName,
      userId: userId,
      email: email,
      createdAt: new Date(),
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error);
  }
});
