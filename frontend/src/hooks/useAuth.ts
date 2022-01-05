/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { SignInParams } from 'types/api/sign';
import { signInUrl } from 'url/index';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (params: SignInParams) => {
      setLoading(true);
      axios
        .post<User>(signInUrl, params)
        .then((res) => {
          showMessage({ title: 'ログインしました', status: 'success' });
          history.push('/restaurants');
        })
        .catch((res) => {
          console.log(res);
          console.log(params);
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
