import { toast } from 'sonner';

import { socket } from '@/socket';

export async function handleSendMessage(messageData: {
  roomId: string;
  senderId: string;
  senderDisplayName: string | null;
  text: string;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newMessage = await response.json();
    socket.emit('messageToRoom', {
      roomId: newMessage.roomId,
      message: newMessage,
    });
  } catch (error) {
    toast.error('Failed to send message');
  }
}
