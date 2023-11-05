import { useState, FormEvent } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (input && user) {
      const formattedMessage = `${user}: ${input}`;
      socket.emit('chat message', formattedMessage); // Emit the composed message directly
      setInput('');
      setIsLoading(false);
    }
  };

  return (
    <form id='form' onSubmit={handleSubmit}>
      <input
        id='user'
        value={user}
        onChange={(e) => setUser(e.target.value)}
        autoComplete='off'
      />
      <input
        id='input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete='off'
      />
      <button type='submit' disabled={isLoading}>
        Send
      </button>
    </form>
  );
}
