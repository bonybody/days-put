---
title: 【VuePress入門】お手軽個人ブログを作りnetlifyにデプロイするまで
date: 2020-07-31
tags:
 - VuePress
 - Vue.js
 - JavaScript
categories: 
 - 入門
---
# VuePressとは
Vue.jsの生みの親、Evan You氏が新たに生み出したVue.jsの**静的サイトジェネレーター**です。<br>
デフォルトでは技術ドキュメントを書くために最適化されています。<br>
ドキュメントの内容をMarkdown記法で記述する事ができ、
設定項目を基に内部的なSSRを行うことで静的なウェブサイトを書き出します。<br>
サードパーティ製のプラグイン、テーマ（サイト全体のレイアウト）が豊富で、今回もそれらを利用してブログを開設します。<br>
[VuePress公式](https://vuepress.vuejs.org/)  

# VuePressを扱うメリット
 - ホスティングサービスを利用することでサーバー要らずになり本番環境へのデプロイも容易
 - データベースサーバーを必要としない
 - 拡張されたMarkdown記法を扱うことができ、Markdown内でVue.jsのコンポーネントを利用できる
 - 基本レイアウトがVue.jsで作られているため、Vue.jsの知識で自由に編集することができる
 - サードパーティ製のプラグイン、テーマを利用することで抽象化され、簡単にアーキテクチャの恩恵を受けられる<br>

# 今回利用するテーマ
[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)<br>
vuepressで一番人気のテーマ（[GitHub Topicsより](https://github.com/topics/vuepress-theme)）です。<br>

# 導入
利用するテーマで導入手順が記載（[GitHub](https://github.com/vuepress-reco/vuepress-theme-reco)）されているので、おとなしく従います。<br>
npx、npm、yarnからインストールできるようですが、今回はyarnで進めていきます。
 - Node.js v14.1.0.
 - Yarn v1.22.4

まずはテーマのCLIをインストールしていきます<br>
後の初期化にて作業ディレクトリを作成できるので、ここではディレクトリの作成は行いません。
```Bash
yarn global add @vuepress-reco/theme-cli
```
theme-cliのインストールが完了したら、
```Bash
theme-cli init
```
をし初期化を行っていきます。
```
? Whether to create a new directory? Yes
? What's the name of new directory? vuepress-test-blog
? What's the title of your project? vuepress-test-blog
? What's the description of your project? my blog
? What's the author's name? myname
? What style do you want your home page to be?(Select afternoon-grocery, if you want to download reco_luan's '午后南杂')? What style do you want your home page to be?(Select afternoon-grocery, if you want to download reco_luan's '午后南杂') blo
g
✔ [1/3] Load file from git
✔ [2/3] Edit config.js
✔ [3/3] Edit package.json

Load successful, enjoy it!

# Inter your blog
$ cd vuepress-test-blog
# Install package
$ yarn & npm install
(b