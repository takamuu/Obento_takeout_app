import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { User } from 'types/api/user';
import { useGetCurrentUser } from 'hooks/useGetCurrentUser';

export type LoginUserContextType = {
  loginUser: User | null;
  setLoginUser: Dispatch<SetStateAction<User | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const { getCurrentUser } = useGetCurrentUser();

  useEffect(() => {
    const res = getCurrentUser();
    res
      .then(function (result) {
        if (loginUser === null) setLoginUser(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [getCurrentUser, loginUser]);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
