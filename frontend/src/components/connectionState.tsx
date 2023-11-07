import { socket } from '../socket';
import { cn } from '../utils/cn';

export function ConnectionState({ isConnected }: { isConnected: boolean }) {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <button
      onClick={isConnected == true ? disconnect : connect}
      className={cn(
        'rounded-md px-1 mx-auto text-sm mb-8',
        {
          'bg-red-200': !isConnected,
        },
        {
          'bg-green-200': isConnected,
        }
      )}
    >
      {isConnected == true ? 'Connected' : 'Disconnected'}
    </button>
  );
}
