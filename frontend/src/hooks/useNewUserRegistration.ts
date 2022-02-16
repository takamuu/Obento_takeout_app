/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { SignUpParams } from 'types/api/sign';
import { signInUrl, signUpUrl } from '../url';
import { useLoginUser } from './useLoginUser';

export const useNewUserRegistration = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [newUserRegistrationLoading, setNewUserRegistrationLoading] =
    useState(false);

  // ユーザー新規登録
  const newUserRegistration = useCallback(
    async (params: SignUpParams) => {
      setNewUserRegistrationLoading(true);
      try {
        // TODO:access-tokenに保持するのは良くないので、サーバーサイドでsession.idを付与する方式に移行するまでの暫定
        const res2 = await axios.post<User>(signUpUrl, params);
        Cookies.set('_access_token', res2.headers['access-token']);
        Cookies.set('_client', res2.headers['client']);
        Cookies.set('_uid', res2.headers['uid']);

        const res = await fetch(signInUrl, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        setLoginUser(result.data);
        showMessage({
          title: '新規登録完了＆ログインしました',
          status: 'success',
        });
        history.push('/');
      } catch (e) {
        showMessage({
          title:
            '既に登録があるか入力に誤りがある為、新規登録できませんでした。',
          status: 'error',
        });
        setNewUserRegistrationLoading(false);
      }
    },
    [history, showMessage, setLoginUser]
  );
  return { newUserRegistration, newUserRegistrationLoading };
};
