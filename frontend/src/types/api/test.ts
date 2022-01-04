import client from 'types/api/client';

// 動作確認用
export const execTest = () => {
  console.log(client);
  return client.get('/test');
};
