/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { ContactParams } from 'types/api/contact';
import { contactsUrl } from '../url';
import { useMessage } from './useMessage';

export const usePostContact = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const postContact = useCallback(async (params) => {
    setLoading(true);
    try {
      await axios.post<ContactParams>(
        contactsUrl,
        {
          contact: {
            title: params.title,
            content: params.content,
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
        title: 'お問い合わせ内容を送信しました',
        status: 'success',
      });
    } catch (e) {
      showMessage({
        title: '送信を失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { postContact, loading };
};
