import axios from 'axios';
import { useCallback } from 'react';

import { User } from 'types/api/user';

export const useAuth = () => {
  const login = useCallback((id: string) => {
    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }, []);
  return { login };
};
