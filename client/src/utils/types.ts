type Message = {
  roomId: string;
  senderId: string;
  senderDisplayName: string;
  text: string;
  sentAt: Date;
  _id: string;
};

type RoomType = 'private' | 'group';

interface Participant {
  name: string;
  email: string;
  photo: string | null;
  id: string;
}

interface Room {
  name: string;
  type: 'private' | 'group';
  participants: Participant[]; // Array of participant IDs
  administrators: string[]; // Array of administrator IDs
  createdBy: string; // Creator ID
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

type NewRoom = Omit<
  Room,
  'createdAt' | 'updatedAt' | '_id' | 'name' | 'type' | 'createdBy'
> & {
  name: string;
  type: 'private' | 'group';
  creatorUid: string;
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

export type { DbUser, Message, NewRoom, Participant, Room, RoomType };
