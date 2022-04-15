import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { currentUserUrl } from '../url';

export const useGetCurrentUser = () => {
  const getCurrentUser = useCallback(async () => {
    if (
      !Cookies.get('_access_token') ||
      !Cookies.get('_client') ||
      !Cookies.get('_uid')
    )
      return;
    const res = await fetch(currentUserUrl, {
      method: 'GET',
      headers: {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
      },
    });
    const result = await res.json();
    return result.data;
  }, []);
  return { getCurrentUser };
};
