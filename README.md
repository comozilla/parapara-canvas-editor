# parapara-projection-mapping

## 準備
### 必要なもの
- node.js
- bower (npm install -g bower)

### モジュールをインストール

```sh
$ npm install
$ bower install
```

### webpack でビルド

```sh
$ webpack
```

### Lint(ソースコードのチェック)
```sh
$ npm run lint
```

### webpack を使ってビルド + browser-syncの監視

```sh
$ npm run build-dev-server
```

### チェック

browser-syncを使っています。  
自動でブラウザが開くと思いますので、確認してください。  
`js/`、`css/`、`index.html`を変更した際、ライブリロードされます。