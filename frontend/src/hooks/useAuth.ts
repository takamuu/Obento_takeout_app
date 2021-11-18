import axios from 'axios';
import { useCallback } from 'react';

export const useAuth = () => {
  const login = useCallback((id: string) => {
    axios.get<>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }, []);
  return { login };
};
