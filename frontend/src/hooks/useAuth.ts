/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { SignInParams } from 'types/api/sign';
import { signIn } from 'hooks/auth';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  //  const params: SignInParams = {
  //   email: email,
  //   password: password
  // }

  const login = useCallback(
    (params: SignInParams) => {
      setLoading(true);
      axios
        .post<User>(`http://localhost:3000/api/v1/auth/sign_in`, params)
        .then((res) => {
          console.log(res);
          console.log(params);
          console.log(login);
          showMessage({ title: 'ログインしました', status: 'success' });
          history.push('/restaurants');
        })
        .catch((res) => {
          console.log(res);
          console.log(params);
          console.log(login);
          showMessage({
            title:
              'ユーザID、パスワードの入力に誤りがあるか登録されていません。',
            status: 'error',
          });
        })
        .finally(() => setLoading(false));
    },
    [history, showMessage]
  );
  return { login, loading };
};
