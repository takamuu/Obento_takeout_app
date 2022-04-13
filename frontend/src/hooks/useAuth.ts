/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { SignInParams } from 'types/api/sign';
import { signOutUrl, signInUrl } from '../url';
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
        const res = await fetch(signInUrl, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        setLoginUser(result.data);
        // TODO:access-tokenに保持するのは良くないので、サーバーサイドでsession.idを付与する方式に移行するまでの暫定
        const res2 = await axios.post<User>(signInUrl, params);
        Cookies.set('_access_token', res2.headers['access-token']);
        Cookies.set('_client', res2.headers['client']);
        Cookies.set('_uid', res2.headers['uid']);
        history.push('/');
        showMessage({ title: 'ログインしました', status: 'success' });
      } catch (e) {
        alert(e);
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
    const logoutResult = confirm('ログアウトしてよろしいですか？');
    if (logoutResult)
      try {
        await axios.delete(signOutUrl, {
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
        history.push('/');
        showMessage({
          title: 'ログアウトしました',
          status: 'error',
        });
      } catch (e) {
        showMessage({
          title: 'ログアウトできませんでした',
          status: 'error',
        });
      }
  }, [history, setLoginUser, showMessage]);
  return { login, logout, loading };
};
