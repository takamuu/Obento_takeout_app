# Obento Takeout App（弁テク）

拡大する飲食店のテイクアウト業務を効率化し、顧客の注文をオンラインで完結させるアプリ（開発中）

# 特徴

- 飲食店における、電話や店頭でのテイクアウト注文業務をオンライン注文へ移管し効率化を図る。
- 顧客側からもオンライン上で注文〜決済までを完結することにより、店頭での待ち時間を無くし、利便性を向上させる。

# 開発環境とバージョン

- macOS Catalina
- node v14.18.1
- ruby 3.0.3
- Rails 6.1.4.1

# インストールした実行環境とバージョン

（バージョン指定ではない）

```zsh
node install v14.18.1
npm 8.1.3
rbenv install 3.0.3
rbenv global 3.0.3
```
# .env
ローカルで起動する場合は、root上に下記`.env`を設定
```zsh
REACT_APP_SERVER_URL=http://localhost:3000
```

# Database

- postgres

# URL

- 本番環境（Production): https://obento-takeout-app.herokuapp.com/restaurants

# Usage

```zsh
% git clone https://github.com/takamuu/obento_takeout_app.git
% cd obento_takeout_app
% bundle config set path vendor/bundle --local
% bundle install
% rails db:create
% rails db:migrate
% rails db:seed
% rails server
ローカルURL(backend) http://localhost:3000/
## ２つ目のターミナルを起動
% cd obento_takeout_app/frontend
% npm install
% npm start
ローカルURL(frontend) http://localhost:3001/restaurants
```

# Author

- 作成者 takamuu

# License

弁テク is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
