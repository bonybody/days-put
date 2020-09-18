---
title: vue build で生成したサイトをWEBサーバー無しで動かしたい
date: 2020-09-18
tags:
 - webpack
 - Vue.js
 - トラブルシューティング
categories: 
 - Frontend
publish: true
---

前にも一度解決したことがある問題なのですが、完全に忘れてて調べ直すことになったのでここに残して起きます。<br>

## そのままbuildしただけでは動かない
ローカルサーバで開発を進め、いざ本番用に書き出したところでindex.htmlを開いても動かないんですねこれが。<br>
ローカルサーバで動作することは確認しているので、**WEBサーバを介さずにアクセスする場合だけ動作しない**
という状態になります。<br>

## 何故動かない
コンソールを確認すると以下のエラーメッセージが出力されていました。<br>
```Bash
Failed to load resource: net::ERR_FILE_NOT_FOUND app.2924915d.css:1 
Failed to load resource: net::ERR_FILE_NOT_FOUND app.eb2b15b3.js:1
Failed to load resource: net::ERR_FILE_NOT_FOUND chunk-vendors.468a5298.js:1 
Failed to load resource: net::ERR_FILE_NOT_FOUND /favicon.ico:1 
```
**Failed to load resource**なので、buildしてまとめられたCSS、JS等々が上手く読み込めてないことが分かります。<br>
それぞれのPATHの指定を確認してもらうと、一見正しく指定ができているように見えるかと思います。<br>
しかし、その部分にこそ今回のキモがあります。<br>
```html
<link href=/css/app.2924915d.css>
```
キモというのは、最初の *「/」* です。<br>
この指定（絶対PATH）では、WEBサーバのように **公開するディレクトリのルート(ドキュメントルート)** が設定されていないと、**PC本体のルートディレクトリ**を指してしまいます。<br>

## 対処方法
buildの設定を変更することで解決できます。<br>
**vue.config.js**に、以下のように設定します。<br>
 > vue.config.jsがない人は、プロジェクトのルートに作成してください。
```js
module.exports = {
    publicPath: './'
}
```
**publicPath**は、buildされたWEBサイトの**ベースとなるURL**を指定する項目です。<br>
デフォルトでは、先程キモと書いた「/」がそのベースURLになっています。<br>

## 最後に
今回はルートではなくbuild先のディレクトリをベースにしたいので、「./」と相対PATHで指定できるようにすることで解決しました。<br>
これらの設定は開発環境用、本番環境用で使い分けることも可能なので気になった人はぜひ調べてみてください。