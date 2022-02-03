import { useCallback } from 'react';
import Cookies from 'js-cookie';

export const useGetCurrentUser = () => {
  const getCurrentUser = useCallback(async () => {
    if (
      !Cookies.get('_access_token') ||
      !Cookies.get('_client') ||
      !Cookies.get('_uid')
    )
      return;
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/validate_token`,
      {
        method: 'GET',
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      }
    );
    const result = await res.json();
    return result.data;
  }, []);
  return { getCurrentUser };
};
