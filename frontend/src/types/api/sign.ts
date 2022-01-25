// サインアップ
export type SignUpParams = {
  name: string;
  kana: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
};

// サインイン
export type SignInParams = {
  email: string;
  password: string;
};
