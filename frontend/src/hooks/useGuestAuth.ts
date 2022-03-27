/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { guestSignInUrl } from '../url';
import { useLoginUser } from './useLoginUser';

export const useGuestAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  // ゲストログイン
  const guestLogin = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(guestSignInUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resForUserName = await res.json();
      setLoginUser(resForUserName.data);
      const resForCookies = await axios.post<User>(guestSignInUrl);
      Cookies.set('_access_token', resForCookies.headers['access-token']);
      Cookies.set('_client', resForCookies.headers['client']);
      Cookies.set('_uid', resForCookies.headers['uid']);
      history.push('/');
      showMessage({ title: 'ゲストログインしました', status: 'success' });
    } catch (e) {
      showMessage({
        title: 'ゲストログインできませんでした',
        status: 'error',
      });
      setLoading(false);
    }
  }, [history, showMessage, setLoginUser]);
  return { guestLogin, loading };
};
