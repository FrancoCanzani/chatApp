type Message = {
  name: string;
  message: string;
  room: string;
};

type RoomType = 'private' | 'group';

interface Room {
  name: string;
  Id: string;
  type: RoomType;
  participants: string[]; // Array of participant IDs
  administrators: string[]; // Array of administrator IDs
  createdBy: string; // Creator ID
  createdAt: Date;
  updatedAt: Date;
}

type NewRoom = {
  roomName: string;
  roomId: string;
  roomType: 'private' | 'group';
  participants: string[];
  administrators: string[];
  creatorId: string;
};

export type { Message, Room, NewRoom, RoomType };
