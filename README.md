<div align="center">
<img alt="VbenAdmin Logo" width="250" height="100" src="./public/static/images/app/logo.svg">
<br/>
<h1>WIOT - 水联网</h1>
</div>

## 简介

使用了最新的`vue3`,`TypeScript`,`ant-design-vue`等主流技术开发的支持自定义主题的系统平台

---

## 亮点

- **最新技术栈**：使用 Vue3 TypeScript ant-design-vue 等最新技术栈开发
- **主题**：可配置的主题
- **组件封装**：对日常使用频率较高的组件二次封装,满足基础工作需求,开箱即用
- 封装了对 iframe 界面的缓存处理结合标签页，可以使 iframe 嵌入界面拥有良好的交互体验
- **安全**：封装了全局的 localStorage、sessionStorage 并在非开发模式下对信息做了加密处理

---

## 开发工具

- 推荐使用 VSCode
- 格式化插件：

  > md: davidanson.vscode-markdownlint
  > vue: octref.vetur
  > prettier: esbenp.prettier-vscode
  > eslint: dbaeumer.vscode-eslint

---

## 文档

应用技术 `./doc/应用技术.md`

目录介绍 `./doc/目录介绍.md`

**[vue 编码风格](https://vue3js.cn/docs/zh/style-guide/)**

[TypeScript](https://www.tslang.cn/docs/home.html)

业务模块添加

组件 `.doc/组件`

基础指令 `.doc/基础指令`

全局指令 `.doc/全局指令`

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

## 开发规范

### 基本规范

vue 代码编写基本风格应遵循[vue 编码风格指南](https://vue3js.cn/docs/zh/style-guide/)

依赖按需加载

### 命名规范

- 普通(包含业务)目录名小写，尽量以一个单词表示，如需多个单词表示时单词间以 **-** 分割，例：**app**,**todo-list**;
- 组件文件首字母大写驼峰式命名（index 文件小写），例：**App**,**TodoList**;
- dom class 选择器的命名小写，多个单词表示时单词间以 **-** 分割
