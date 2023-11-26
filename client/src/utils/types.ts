type Message = {
  roomId: string;
  senderId: string;
  senderDisplayName: string;
  text: string;
  sentAt: Date;
};

type RoomType = 'private' | 'group';

interface Room {
  name: string;
  type: RoomType;
  participants: string[]; // Array of participant IDs
  administrators: string[]; // Array of administrator IDs
  createdBy: string; // Creator ID
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

type NewRoom = {
  roomName: string;
  roomType: 'private' | 'group';
  participants: string[];
  administrators: string[];
  creatorId: string;
};

export type { Message, Room, NewRoom, RoomType };
