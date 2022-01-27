/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { SignInParams } from 'types/api/sign';
import { signOutUrl, signInUrl } from 'url/index';
import { useLoginUser } from './useLoginUser';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  // ログイン
  const login = useCallback(
    async (params: SignInParams) => {
      setLoading(true);
      try {
        const res = await axios.post<User>(signInUrl, params);
        setLoginUser(res.data);
        showMessage({ title: 'ログインしました', status: 'success' });
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);
        history.push('/restaurants');
      } catch (e) {
        showMessage({
          title: 'ユーザID、パスワードの入力に誤りがあるか登録されていません。',
          status: 'error',
        });
        setLoading(false);
      }
    },
    [history, showMessage, setLoginUser]
  );

  // ログアウト
  const logout = useCallback(async () => {
    try {
      axios.delete(signOutUrl, {
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      });
      Cookies.remove('_access_token');
      Cookies.remove('_client');
      Cookies.remove('_uid');
      setLoginUser(null);
      showMessage({
        title: 'ログアウトしました',
        status: 'error',
      });
      history.push('/login');
    } catch (e) {
      showMessage({
        title: 'ログアウトできませんでした',
        status: 'error',
      });
    }
  }, [history, showMessage, setLoginUser]);
  return { login, logout, loading };
};
