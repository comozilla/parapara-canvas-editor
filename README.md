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

### Lint(ソースコードのチェック)
```sh
$ npm run lint
```

### webpack を使ってビルド + browser-syncの監視

```sh
$ npm run build:browser-sync
```

### チェック

browser-syncを使っています。  
自動でブラウザが開くと思いますので、確認してください。  
`js/build/`以下、`css/`以下、`index.html`を変更した際、ライブリロードされます。