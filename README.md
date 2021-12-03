# Obento_takeout_app（弁テク）
 
拡大する飲食店のテイクアウト業務を効率化し、顧客の注文をオンラインで完結させるアプリ（開発中）
 
# Features
 
飲食店における、電話や店頭でのテイクアウト注文業務をオンライン注文へ移管し効率化を図る。
また、顧客側からもオンライン上で注文〜決済までを完結することにより、店頭での待ち時間を無くし、利便性を向上させる。
 
# Requirement
 
* macOS Catalina 10.10.7
* node v14.18.1
* ruby 2.7.2p137
* Rails 6.1.4.1

# Installation
 
```zsh
node install v14.18.1
npm 8.1.3
react 17.0.2
rbenv install 2.7.2
rbenv global 2.7.2
```
 
# Usage
 
```zsh
% git clone https://github.com/takamuu/obento_takeout_app.git
% cd obento_takeout_app
% bundle config set path vendor/bundle --local
% bundle install
% rails db:create
% rails db:migrate
% rails server
% cd obento_takeout_app/frontend
% npm start
```
 
# Author
 
* 作成者　takamuu
 
# License
 
弁テク is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).



