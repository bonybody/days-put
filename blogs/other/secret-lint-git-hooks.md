---
title: 全リポジトリのコミット前にSecretlintを実行してGitGuardianのお仕事を減らす
date: 2021-10-25
tags:
- Secretlint
- Git
categories:
- Environment
publish: true
---

## 前置き
AWSのSecretをpushしてアメリカから電話が掛かってきてからというもの、GitGuardianからメールが来る度に嫌な汗を掻いている私です。

そんな生活から抜け出すため、
Credentials(秘匿情報)を含んだファイルがないかチェックしてくれる**Secretlint** と、Gitの特定のコマンドにフックして処理を挟める**Git Hooks** を使って、全てのリポジトリでのコミット時にSecretlintを走らせる環境を作っていきます。

なお、私はWindowsユーザーなのでシェルはPowershellで進めていきますが、Unix系のエイリアスを色々追加しているので無意識に使っていたらよしなに脳内変換をお願いします。

[Secretlint](https://github.com/secretlint/secretlint)
[Git Hooks](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF)


## 私の環境
- git version 2.29.2.windows.2

## Secretlintとは
名前の通り、秘密にしなければならないCredentials（秘匿情報）がファイルの中に含まれていないかチェックしてくれるlinterです。

設定ファイルに`.secretlintrc.{json,yml,js}` があり、チェックするルールを追加したり変更したりできます。

実行環境としてはDocker、Node.js（npm）の2通りで、
Dockerでは
```bash
docker run -v `pwd`:`pwd` -w `pwd` --rm -it secretlint/secretlint secretlint '**/*'
```
で、npmでは
```bash
npx @secretlint/quick-start "**/*"
```
で設定ファイル無しに簡易チェックが実行できるみたいです。

## 作りたいやつ、もうあったわ
早速環境を作っていこうと調べていたら、
公式がすでに提供してくれているんですよね。
記事を書こうと思って調べてたら見つけちゃいました^^
[secretlint/git-hooks](https://github.com/secretlint/git-hooks)


## ともあれ作っていく
という訳で、公式が提供してくれている環境のセットアップをやっていきたいと思います。

### Hooksをcloneしてくる

今回利用するGit HooksをローカルにCloneします。
Cloneする場所はどこでもいいと思いますが、全体で扱うものとだけ意識しておくいいかもしれません。

```bash
git clone https://github.com/secretlint/git-hooks git-hooks
```


### core.hooksPath を指定する
通常、Git Hooksは`リポジトリのroot/.git/hooks/`以下に対応するHookの名前でスクリプトを作成し、実行してもらうというものですが、

Hooksを配置するディレクトリは`core.hooksPath`で任意の場所を指定することができます。

また、`core.hooksPath`に値が入ると、通常の`リポジトリのroot/.git/hooks/`にあるHooksは無視されるので注意が必要です。

今回は**全リポジトリ**のコミット前にということで、
globalな`core.hooksPath`にCloneしてきたHooksのPathを指定します。
```bash
cd git-hooks

git config --global core.hooksPath $(pwd)/hooks
# Powershell
git config --global core.hooksPath "${pwd}\hooks"
```
正しくPathが設定されているかどうかは
```bash
git config --global core.hooksPath
```
で確認しましょう。

### 動かしてみる
これでセットアップ完了！
試しに適当なリポジトリを作って、Credentials(秘匿情報)を含んだファイルをコミットしてみましょう。

今回は鍵ペアをリポジトリ内に作ってコミットしてみます。

なお、このHooksではSecretlintの実行にDockerを利用しているので、Dockerを立ち上げておいてください。

```bash
# 適当なリポジトリを作る
mkdir global-secret-lint-test
cd  global-secret-lint-test
git init

# リポジトリ内に鍵ペアを作ってみる
mkdir .ssh
ssh-keygen -q -t rsa -b 4096 -C '' -N '' -f id_rsa

# 作った秘密鍵をcommit
git add .
git commit
```
↑これをやった後、
```bash
1:0  error  [PrivateKey] found private key: ~~~~~~
@secretlint/secretlint-rule-preset-recommend > @secretlint/secretlint-rule-privatekey
```
`error  [PrivateKey] found private key:`と、秘密鍵が含まれているよと怒られます。

同じようなメッセージが出力され、コミットが止められていたら成功です。

おめでとうございます！！！

## Hooksの内容を見てみる（ﾁｮｯﾄﾀﾞｹ）
全くコードを見ずに乗っかるのも勉強にならないので、今回使わせてもらったHooksのコードを見ていきます。

まず、cloneしてきたリポジトリ全体の構成としては
```bash
git-hooks
    │  .gitignore
    │  LICENSE
    │  README.md
    │
    └─hooks
            pre-commit
            _local-hook-exec
```
となっています。

次に、コミットにHookされる`hooks/pre-commit`を見てみます。

```bash
#!/bin/bash
source `dirname ${0}`/_local-hook-exec
declare scriptDir=$(cd $(dirname $0);pwd)
declare parentDir="$(dirname "${scriptDir}")"
declare FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0
echo "  ▶ Check credentials by secretlint"
# Secretlint all selected files
echo "$FILES" | xargs docker run -v `pwd`:`pwd` -w `pwd` --rm secretlint/secretlint secretlint
RET=$?
if [ $RET -eq 0 ] ;then
    exit 0
else
    exit 1
fi
```
どうやら
```bash
source `dirname ${0}`/_local-hook-exec
```
でローカルのHooksを実行するスクリプトを呼び出しているみたいです。
> また、`core.hooksPath`に値が入ると、通常の`リポジトリのroot/.git/hooks/`にあるHooksは無視されるので注意が必要です。

と先ほど書いたところですが、今回扱うHooksではpre-commitに関してローカルの物も問題なく実行できます。

```bash
# プロジェクトのpre-commit
#!/bin/bash
echo "hogehoge"
```
```bash
git commit
hogehoge
```

また、

```bash
declare FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
```

で変更のあるファイルを取得し

```bash
echo "$FILES" | xargs docker run -v `pwd`:`pwd` -w `pwd` --rm secretlint/secretlint secretlint
```

の部分のxrgsでファイル一覧をDockerの引数に渡してlintを実行、という流れも把握しておくと良さそうです。

## まとめ
- SecretlintはファイルにCredentials（秘匿情報）が無いか確認してくれる
- DockerとNode.jsで実行できる
- .secretlintrc.{json,yml,js}という設定ファイルもある
- Git Hooksとの連携は公式のサンプルがある