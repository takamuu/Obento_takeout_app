# **弁テク - Obento Takeout App -**

<img width="1069" alt="トップページ" src="https://user-images.githubusercontent.com/42578729/170633642-158bd68c-f815-4ca3-ba9d-9cb6167bf5c3.png">

## **URL**

- アプリ URL:https://www.benteku.com/ <br />
  ヘッダーから、ゲストログインボタンで簡単にログインできます。

## **アプリの特徴**

拡大する飲食店のテイクアウト業務を効率化し、顧客注文をオンラインで完結させるアプリ

- 注文したいお弁当を選択して、簡単に注文することができる
- 自分の購入履歴を確認することができる
- 別の店舗のお弁当をカートに追加すると、これまで入っていたカート内の別店舗のお弁当をクリアしてよいか確認してくれる
- お弁当を受取る際必要な受取番号を表示してくれる

## **アプリの開発背景**

友人から、飲食店（数店舗）のテイクアウト業務を効率化したいとの相談を頂き、必要機能を要件定義し、顧客側からの注文機能を実装したサンプルアプリとして、本アプリ開発を行いました。

## **使用技術**

### **フロントエンド**

- HTML,CSS,JavaScript,TypeScript(4.5.4)
- React(17.0.2)
- Chakra-ui

### **バックエンド**

- Ruby(3.0.3)
- Ruby on Rails(6.1.4)

### **インフラ**

- Heroku

### **データベース**

- PostgreSQL(14.1)

### **その他**

- Visual Studio Code
- Github
- Rubocop
- Draw.io
- Figma
- Notion

## **使い方**

## **工夫した点**

### チーム開発を意識

実務を想定して、下記の手順で開発

1. notion で、タスクを計画・管理
1. issue にタスク登録
1. 開発ブランチを切る
1. プルリクを発行
1. レビュー(現役エンジニアの方からレビュー頂く)
1. Github 上でマージ、closed

### タスク管理

- notion にて、開発予定・進捗を管理

### UI/UX

- 深緑をブランドカラーに決め、それに合わせた配色を設定

  ![カラー](https://user-images.githubusercontent.com/42578729/170682857-0b052c18-7750-420a-b79a-038fe8f9fb87.png)

## **機能一覧**

|     |            機能            |         gem 等         |
| :-: | :------------------------: | :--------------------: |
|  1  |    ログイン・ログアウト    |   devise-token-auth    |
|  2  |  ユーザー登録・編集、削除  |   devise-token-auth    |
|  3  |     ゲストログイン機能     |   devise-token-auth    |
|  4  | アカウント登録、編集、削除 |   devise-token-auth    |
|  5  |     レストラン一覧表示     |           ☓            |
|  6  |       フード一覧表示       |           ☓            |
|  7  |       フードモーダル       | Chakra-ui Modal Dialog |
|  8  |         カート機能         | Chakra-ui Modal Dialog |
|  9  |    別店舗フード追加機能    |           ☓            |
| 10  |        受取番号機能        | Chakra-ui Modal Dialog |
| 11  |          購入履歴          |           ☓            |
| 12  |      お問い合わせ機能      |           ☓            |
| 13  |    レスポンシブデザイン    |       chakra-ui        |
| 14  |   フォーマッター(Rails)    |        rubocop         |
| 15  |   フォーマッター(React)    |        prettier        |
| 16  |          リンター          |         eslint         |

- SPA 認証(Cookie)
- 新規ユーザー登録・ログイン・ログアウト
- ゲストログイン
- プロフィール編集
- 退会

### ER 図

![ER_benteku](https://user-images.githubusercontent.com/42578729/170650240-e79fed87-3cc6-4a05-ab43-d30286127876.png)

### テーブル設計

- URL:https://docs.google.com/spreadsheets/d/1GThRXZaGjKL2k5qqxgDiX5DEl4QOPfnBflZ3d_DEK30/edit?usp=sharing

### デザイン

- Figma URL:https://www.figma.com/file/xYJrUZES803PMw2QeRLcnH/%E5%BC%81%E3%83%86%E3%82%AF?node-id=0%3A1

## **追加予定機能**

## **Author**

- 作成者 takamuu

## **License**

弁テク is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
