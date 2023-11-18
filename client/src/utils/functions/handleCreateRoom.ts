import { NewRoom } from '../types';

export default async function handleCreateRoom(newRoomData: NewRoom) {
  try {
    const newRoom = await fetch('http://localhost:3000/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoomData),
    });

    const response = await newRoom.json();
    if (newRoom.ok) {
      console.log('Room created successfully:', response);
      return response;
    } else {
      console.log('Error creating room:', response);
      return null;
    }
  } catch (error) {
    console.error('Error in handleCreateRoom:', error);
    return null;
  }
}
