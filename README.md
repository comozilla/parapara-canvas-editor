# parapara-projection-mapping

![](https://docs.google.com/drawings/d/1keQDc-fo5cvi54i6KeqGTSZlK0K9XBf_Np-ftDaUIaA/pub?w=2532&amp;h=1407)

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
