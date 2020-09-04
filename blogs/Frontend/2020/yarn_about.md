---
title: Yarnとはを簡単に
date: 2020-09-02
tags:
 - Yarn
 - NPM
 - Node.js
categories: 
 - Frontend
publish: true
---

[Yarn公式ドキュメント](https://classic.yarnpkg.com/ja/)を基に書いているので詳しく知りたい方はそっちまで

## Yarnとは
Yarnは、npmと同一のパッケージを管理するパッケージ管理ツールです。<br>
基本的にnpmと同じ使い方ができますが、Yarnならではの便利な機能も存在します。<br>

## Yarnを使うメリット
### 超高速
**オフラインキャッシュ**という機能で、一度インストールされたパッケージはローカルにコピーが作られます。<br>
そうすることで再度インストールを行う際はローカルのパッケージを利用するので「超高速」になるわけです。<br>
また、処理を並列化しインストールを行うようなので通常のインストール時間も高速なようです。

### npmには無い便利なコマンド
Yarnには、npmには無い便利なコマンドが用意されています。<br>
(以下で一部紹介します)


## Yarn CLI
### よく使うやつ
YarnのCLIツールで特によく使われるのは以下のコマンドだと思います。<br>
 - yarn install
 - yarn add
 - yarn run
 - yarn upgrade

### yarn install
`yarn install`<br>
package.jsonファイルを基にすべての依存関係をインストールします。<br>
git clone後のnpm installのように、package.jsonからモジュールをインストールしたいときに使います。<br>
また、**yarn**のみを入力すると**yarn install**扱いになります。<br>
### yarn add
`yarn add <package>`<br>
現在のプロジェクトに、新しくパッケージを追加したい時に使います。<br>
yarn addでパッケージを追加することでpackage.jsonに書かれた依存関係が更新されます。<br>
### yarn run
`yarn run <script> <args>`<br>
npmと同様にpackage.jsonのscript項に記載されたコマンドを指定することで実行できます。<br>
また、npmには無い機能として**node_modules/.bin/内のコマンドを直接指定できる**というものがあります。<br>
### yarn upgrade
`yarn upgrade <package>`<br>
パッケージのアップデートを行います。<br>
アップデートされるバージョンは、**<package@version>で自分で指定する場合**、もしくは**package.json**で指定されている範囲から最新のバージョンをインストールされます。<br>

## 参考サイト
[Yarn](https://yarnpkg.com/)<br>