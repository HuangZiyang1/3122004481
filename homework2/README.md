# README

## 安装node.js以及npm（如果没有安装的话）

### 安装node.js

> https://nodejs.cn/download/

选择对应系统的版本下载。

### 安装npm

高版本node.js自动安装了npm，如果没有安装上，那么建议升级node.js版本

### 检查node.js和npm的安装

```bash
node -v
npm -v
```

## 安装依赖

```bash
npm install
```

## 运行脚本

首先确保终端打开目录正确

### 生成题目

脚本: `用例: Myapp.exe -n <number of problems> -r <range> or Myapp.exe -e <exercise file> -a <answer file>`

例如：

```bash
node Myapp.js -n 10000 -r 100
```

### 生成成绩

脚本：`Myapp.exe -e <exercisefile>.txt -a <answerfile>.txt`

例如：

```bash
node Myapp.js -e Exercises.txt -a Answers.txt
```

