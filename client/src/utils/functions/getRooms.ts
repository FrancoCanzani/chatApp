export default async function getRooms(userId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/rooms/participants/${userId}`
    );
    if (res.ok) {
      const rooms = await res.json();
      return rooms;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
