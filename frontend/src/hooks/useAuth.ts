/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { User } from 'types/api/user';

export const useAuth = () => {
  const history = useHistory();
  const login = useCallback(
    (id: string) => {
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            history.push('/restaurants');
          } else {
            alert('ユーザーが見つかりません');
          }
        })
        .catch(() => alert('ログインできません'));
    },
    [history]
  );
  return { login };
};
