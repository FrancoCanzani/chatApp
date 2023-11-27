import { useState, useEffect } from 'react';

export default function useFetchUser(userId: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch user data
    async function fetchUser() {
      if (!userId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else if (response.status === 404) {
          setError('User not found');
        } else {
          setError('An error occurred');
        }
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}
