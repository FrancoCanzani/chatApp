import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { app } from '../../firebase';

export function useAuth() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  return { user, loading, error };
}
