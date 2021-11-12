import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';

export const Login: VFC = memo(() => {
  // const arr = [...Array(100).keys()];
  // console.log(arr);
  return (
    <div>
      <p>ログインページ</p>
      <Link to="/login/user_management">UserManagement</Link>
      <br />
      <Link to="/login/setting">Setting</Link>
    </div>
  );
});

Login.displayName = 'Login';
