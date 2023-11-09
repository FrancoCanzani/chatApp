import { User } from '@firebase/auth';
import { message } from '@/utils/types';

export function Messages({
  messages,
  user,
  currentRoom,
}: {
  messages: message[];
  user: User | null | undefined;
  currentRoom: string;
}) {
  console.log(messages);
  console.log(user);

  const roomMessages = messages.filter(
    (message) => message.room == currentRoom
  );

  return (
    <ul className='pb-9 w-4/5'>
      {roomMessages.map((message, index) => (
        <li
          key={index}
          className={`flex w-full mb-1 space-x-2  py-1 rounded-lg items-center ${
            user?.displayName == message.name ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.name != user?.displayName && (
            <span className='bg-purple-100 px-2 py-0.5 rounded-lg'>
              {message.name}
            </span>
          )}
          <p>{message.message}</p>
        </li>
      ))}
    </ul>
  );
}
