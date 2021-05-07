<div align="center">
<img alt="VbenAdmin Logo" width="250" height="100" src="./public/static/images/app/logo.png">
<br/>
<h1>WIOT - 水联网</h1>
</div>

## 简介

使用了最新的`vue3`,`TypeScript`,`ant-design-vue`等主流技术开发的支持自定义主题的系统平台

---

## 特性

- **最新技术栈**：使用 Vue3 开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：可配置的主题
- **组件** 二次封装了多个常用的组件

---

## 文档

[应用技术](./doc/framework.md)

[目录介绍](./doc/directory.md)

---

## 开发工具

```bash
推荐使用VSCode
格式化插件
md：shd101wyy.markdown-preview-enhanced
vue:octref.vetur
vue3:hollowtree.vue-snippets
```

---

## 安装使用

- 获取项目代码

```bash
svn：xxxxx
```

- 安装依赖

```bash
yarn install
```

- 运行

```bash
yarn serve

--open    在服务器启动时打开浏览器
--copy    在服务器启动时将 URL 复制到剪切版
--mode    指定环境模式 (默认值：development)
--host    指定 host (默认值：loaclhost)
--port    指定 port (默认值：80)
--https   使用 https (默认值：false)
```

- 打包

```bash
yarn build
```

---

## 命名建议

```bash
目录名小写，尽量以一个单词表示，如需多个单词表示时单词间以‘-’分割，例：app,todo-list;
组件文件首字母大写驼峰式命名（index文件小写），例：App,TodoList;
```