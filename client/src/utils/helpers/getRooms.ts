import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function getRooms(userId: string) {
  try {
    const res = await fetch(`${API_URL}/rooms/participants/${userId}`);
    if (res.ok) {
      const rooms = await res.json();
      return rooms;
    }
    return [];
  } catch (error) {
    toast.error('There was an error loading Rooms. Please try again!');
    return [];
  }
}
