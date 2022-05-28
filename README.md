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

- JavaScript,TypeScript(4.5.4)
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
- Google Spreadsheet
- Notion

## **使い方**

### **ゲストログイン**

![ゲストログイン](https://user-images.githubusercontent.com/42578729/170818479-90b444be-bf39-44f2-be6d-7abbc526d976.gif)

### **レストラン選択**

![レストラン選択](https://user-images.githubusercontent.com/42578729/170818526-ba5c1299-361b-4663-92a4-ab311cbd0ee7.gif)

### **フード選択**

![フード選択](https://user-images.githubusercontent.com/42578729/170818557-d4315698-2a6b-47ac-833f-0d45083ec88b.gif)

### **カート機能**

![カート機能](https://user-images.githubusercontent.com/42578729/170818594-ffe081eb-1295-4b29-ba76-8f86e7c6f2a6.gif)

### **他店舗フード入替**

![他店舗フード入替](https://user-images.githubusercontent.com/42578729/170818643-b7aa6980-4b2c-4e7c-966c-d60e0749460e.gif)

### **注文〜受取番号発行**

![注文〜受取番号発行](https://user-images.githubusercontent.com/42578729/170818687-a34d4dc0-e3c6-46a2-90db-8b3d54041c79.gif)

### **購入履歴表示**

![購入履歴表示](https://user-images.githubusercontent.com/42578729/170818721-d2a3140c-8b25-4606-be15-bb158087ad3e.gif)

## **工夫した点**

### **SPA（Single Page Application）**

SPA を選択した理由としては、一般的に言われている「SPA のメリット」を享受する目的プラス、
新しい技術のキャッチアップを行うことで、自走力を確認する意図も含め選択しました。<br>
同時に、「SPA のデメリット」も享受する結果となっております。

【SPA のメリット】

1.  Web で表現できることの幅が広がる
1.  動作性の向上
1.  ネイティブアプリの代用
1.  UX の向上

【SPA のデメリット】

1.  開発コストが大きい
1.  初期ローディングが遅い
1.  SEO で不利になる可能性がある

【SPA を選択したことによるメリット】

1. 自走力の確認
1. 新しい技術のキャッチアップ
1. 開発者が少ない市場へのアプローチ

### **SPA 認証**

Rails API モード + React という構成において、認証方法として、devise_token_auth を選択しました。
理由としては、サンプルが多かったためですが、結果として、公式原文や公式のコードを読み解かなければ実装・加工はできなかったので、とてもよい学びとなりました。

### **React**

React キャッチアップまでのタスクとして、下記ルートで学習を進めました。（3、4 は反復）<br>
最終的には JS の理解底上げも必要になり、JSPrimer も繰り返し読み直しました。

1.  JavaScript（JSPrimer）
1.  React（JSX）
1.  TypeScript
1.  React（TSX)
1.  axios/カスタムフック/Chakra-ui 等

### **Rails**

Rails は何度も戻ってリファクタリングや JSON データの操作を修正し、より深く理解できたと感じています。

### **SPA まとめ**

- 機能追加の際、Rails→RSpec→React というバックエンドとフロントエンドを分業したイメージで実装することができるようになった
- SPA の開発工程やバックエンドとフロントエンドの開発に必要な情報が理解できるようになった
- 今後学びたい、Next.js、ReactNative、Node.js などの敷居が下がった
- バックエンドとフロントエンドのそれぞれの面白さを知ることができた

### **チーム開発を意識**

実務を想定して、下記の手順で開発

1. notion で、タスクを計画・管理
1. issue にタスク登録
1. 開発ブランチを切る
1. プルリクを発行
1. レビュー(現役エンジニアの方からレビュー頂く)
1. Github 上でマージ、closed

### **タスク管理**

- notion にて、開発予定・進捗を管理

### **UI/UX**

- お弁当をモチーフにしたロゴを作成

  ![Component 1](https://user-images.githubusercontent.com/42578729/170804052-77420859-4bdb-400f-bbef-0a1393e43d46.png)
  ![Component 2](https://user-images.githubusercontent.com/42578729/170804054-90ef89f6-d503-48ce-a11a-d572b1924642.png)

- 深緑をブランドカラーに決め、それに合わせた配色を設定

  ![カラー](https://user-images.githubusercontent.com/42578729/170682857-0b052c18-7750-420a-b79a-038fe8f9fb87.png)

## **機能一覧**

|     | 機能                       | gem 等                 |
| :-: | :------------------------- | :--------------------- |
|  1  | ログイン・ログアウト       | devise-token-auth      |
|  2  | ユーザー登録・編集、削除   | devise-token-auth      |
|  3  | ゲストログイン機能         | devise-token-auth      |
|  4  | アカウント登録、編集、削除 | devise-token-auth      |
|  5  | レストラン一覧表示         | -                      |
|  6  | フード一覧表示             | -                      |
|  7  | フードモーダル             | Chakra-ui Modal Dialog |
|  8  | カート機能                 | Chakra-ui Modal Dialog |
|  9  | 別店舗フード追加機能       | -                      |
| 10  | 受取番号機能               | Chakra-ui Modal Dialog |
| 11  | 購入履歴                   | -                      |
| 12  | お問い合わせ機能           | -                      |
| 13  | レスポンシブデザイン       | React,Chakra-ui        |
| 14  | フォーマッター(Rails)      | rubocop                |
| 15  | フォーマッター(React)      | prettier               |
| 16  | リンター                   | eslint                 |

### **ER 図**

![ER_benteku](https://user-images.githubusercontent.com/42578729/170650240-e79fed87-3cc6-4a05-ab43-d30286127876.png)

### **テーブル設計**

- URL:https://docs.google.com/spreadsheets/d/1GThRXZaGjKL2k5qqxgDiX5DEl4QOPfnBflZ3d_DEK30/edit?usp=sharing

### **デザイン（Figma）**

- URL:https://www.figma.com/file/xYJrUZES803PMw2QeRLcnH/%E5%BC%81%E3%83%86%E3%82%AF?node-id=0%3A1

### **ユースケース図**

- URL:https://drive.google.com/file/d/16OQf6UQr0jav9GhrKd_OJzhMCHr6PemU/view?usp=sharing

  ※実際の決済機能と管理者機能を記載していますが、本実装には含まれていません（追加実装予定）

## **追加予定機能**

## **Author**

- 作成者 takamuu

## **License**

弁テク is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
