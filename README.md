# Obento_takeout_app（弁テク）
 
拡大する飲食店のテイクアウト業務を効率化し、顧客の注文をオンラインで完結させるアプリ（開発中）
 
# Features
 
飲食店における、電話や店頭でのテイクアウト注文業務をオンライン注文へ移管し効率化を図る。
また、顧客側からもオンライン上で注文〜支払いまでを完結されることにより、利便性を向上させる。
 
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
 
1.Clone this repository
```zsh
% git clone https://github.com/takamuu/obento_takeout_app.git
```
2.Go into the repository
```zsh
% cd obento_takeout_app
```
3.Create database, Run migrations and set up the database
```zsh
% rails db:create
```
```zsh
% rails db:migrate
```
4.Starting the rails server
```zsh
% rails server
```
5.Go into the repository
```zsh
% cd obento_takeout_app/frontend
```
6.Run the app
```zsh
% npm start
```
 
# Author
 
* 作成者　takamuu
 
# License
 
弁テク is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).



