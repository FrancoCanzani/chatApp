type Message = {
  roomId: string;
  senderId: string;
  senderDisplayName: string;
  text: string;
  sentAt: Date;
  _id: string;
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

type DbUser = {
  _id: string;
  displayName: string;
  userId: string;
  email: string;
  status: 'online' | 'offline' | 'away';
  contacts: string[];
  blockedUsers: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { DbUser, Message, NewRoom, Room, RoomType };
