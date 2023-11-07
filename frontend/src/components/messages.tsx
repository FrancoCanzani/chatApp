import { message } from '../utils/types';

export function Messages({
  messages,
  user,
}: {
  messages: message[];
  user: string;
}) {
  console.log(messages);
  console.log(user);

  return (
    <ul className='pb-9 w-4/5'>
      {messages.map((message, index) => (
        <li
          key={index}
          className={`flex w-full mb-1 space-x-2  py-1 rounded-md items-center ${
            user == message.name ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.name != user && (
            <span className='bg-purple-100 px-2 py-0.5 rounded-md'>
              {message.name}
            </span>
          )}
          <p>{message.message}</p>
        </li>
      ))}
    </ul>
  );
}
