---
title: WSL2（Hyper-V）とVirtualBoxを共存させるには
date: 2020-08-11
tags:
 - WSL2
 - VirtualBox
 - 環境構築
categories: 
 - 環境構築
---
5月頃に[Windows 10 May 2020 Update](https://blogs.windows.com/windowsexperience/2020/05/27/whats-new-in-the-windows-10-may-2020-update/)
が配信開始されていたとのことなので、目玉機能である**WSL2**と、仮想マシンの定番**VirtualBox**で起こりうる**仮想化機能の競合**について書いていきます。<br>


## WSL2とは
簡単に書くと**Windows環境で動くLinux環境**です。<br>
WSL2では、Linux OSの中核となるLinuxカーネルがWindowsで動作することで**完全なLinux環境**を構築することができます。<br>
そんな完全なLinuxは、**Hyper-V**という仮想化システム（ベアメタル型ハイパーバイザに分類）上に配置されることになります。<br>
>WSL「2」なので当然無印のWSLも存在します。<br>
>WSLとWSL2ではかなり仕様が異なるので、WSLについてはここでは触れません。<br>


## VirtualBoxとは
メインのOS上で自由に他のOS環境を構築できる仮想化ソフトウェア（ホスト型ハイパーバイザに分類）です。<br>
Windowsだけでなく、Mac、Linux上でも利用できます。<br>
あまり使わないので詳しくは知りません。<br>


## 何故競合が起きるのか
WSL2が動作するHyper-VとVirtualBoxでは、効率的に仮想マシンを動作させるためにCPUが持つ**仮想化支援技術**を利用しています。<br>
そして、それぞれがこの仮想化支援技術を占有しようとするためため競合が起こります。


## 競合の解決方法
実はこの問題を解決するためのAPIがWindows April 2018 Update以降で提供されています。<br>
[**Windowsハイパーバイザープラットフォーム**](https://docs.microsoft.com/en-us/virtualization/api/hypervisor-platform/hypervisor-platform) <br>
このでAPIでは、仮想化ソフトウェアごとにパーティションを作成することでそれぞれの仮想化支援技術の利用を管理してくれます。<br>
これを有効化することで、仮想化支援技術を占有することなく効率的に利用できます。<br>


### APIの有効化
[Windowsの機能の有効化または無効化]から**Windowsハイパーバイザープラットフォーム**にチェックを入れます。<br>
![](/docs_img/WindowsHypervisorPlatform.png)
