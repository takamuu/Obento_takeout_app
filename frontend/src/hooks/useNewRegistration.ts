/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { User } from 'types/api/user';
import { useMessage } from './useMessage';
import { SignUpParams } from 'types/api/sign';
import { signUpUrl } from 'url/index';
import { useLoginUser } from './useLoginUser';

export const useNewRegistration = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  // 新規登録
  const newRegistration = useCallback(
    (params: SignUpParams) => {
      setLoading(true);
      axios
        .post<User>(signUpUrl, params)
        .then((res) => {
          setLoginUser(res.data);
          showMessage({
            title: '新規登録完了＆ログインしました',
            status: 'success',
          });
          // ログインに成功した場合はCookieに各値を格納
          Cookies.set('_access_token', res.headers['access-token']);
          Cookies.set('_client', res.headers['client']);
          Cookies.set('_uid', res.headers['uid']);
          history.push('/restaurants');
        })
        .catch(() => {
          showMessage({
            title:
              '既に登録があるか入力に誤りがある為、新規登録できませんでした。',
            status: 'error',
          });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { newRegistration, loading };
};
