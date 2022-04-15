/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { User } from 'types/api/user';

import { signUpUrl } from '../url';
import { useMessage } from './useMessage';

export const useMyPage = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState<User>();
  const [deleteUser, setDeleteUser] = useState<User>();

  const updateMyPage = useCallback(async (params: User) => {
    setLoading(true);
    try {
      const result = await axios.patch<User>(
        signUpUrl,
        {
          user: {
            id: params.id,
            name: params.name,
            kana: params.kana,
            email: params.email,
            phone_number: params.phone_number,
          },
        },
        {
          headers: {
            'access-token': Cookies.get('_access_token'),
            client: Cookies.get('_client'),
            uid: Cookies.get('_uid'),
          },
        }
      );
      showMessage({
        title: '更新しました',
        status: 'success',
      });
      setUpdateUser(result.data);
    } catch (e) {
      showMessage({
        title: 'データの更新を失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMyPage = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.delete<User>(signUpUrl, {
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      });
      setDeleteUser(result.data);
      showMessage({
        title: '退会しました',
        status: 'success',
      });
    } catch (e) {
      showMessage({
        title: 'データの削除を失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);
  return { updateMyPage, updateUser, deleteMyPage, deleteUser, loading };
};
