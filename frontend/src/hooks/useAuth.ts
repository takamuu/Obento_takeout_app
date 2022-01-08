/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { SignInParams } from 'types/api/sign';
import { signInUrl } from 'url/index';
import { useLoginUser } from './useLoginUser';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (params: SignInParams) => {
      setLoading(true);
      axios
        .post<User>(signInUrl, params)
        .then((res) => {
          showMessage({ title: 'ログインしました', status: 'success' });
          // ログインに成功した場合はCookieに各値を格納
          Cookies.set('_access_token', res.headers['access-token']);
          Cookies.set('_client', res.headers['client']);
          Cookies.set('_uid', res.headers['uid']);
          setLoading(false);
          history.push('/restaurants');
        })
        .catch((res) => {
          showMessage({
            title:
              'ユーザID、パスワードの入力に誤りがあるか登録されていません。',
            status: 'error',
          });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};
