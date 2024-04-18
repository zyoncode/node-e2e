# node-e2e

这是一个为 React Native、Web、移动端（iOS、Android）和桌面端（Electron）设计的多端端到端（E2E）测试框架。

## 目录

- [前置条件](#前置条件)
- [安装](#安装)
- [环境变量](#环境变量)
- [测试执行](#测试执行)
- [可视化](#可视化)
- [e2e.js 示例](#e2ejs-示例)
- [核心概念](#核心概念)
- [文件结构](#文件结构)
- [自动化测试 API](#自动化测试-api)
- [贡献](#贡献)
- [许可](#许可)

## 前置条件

在开始使用本测试框架之前，请确保已安装并配置以下前置条件：

1. **Node.js**:

   - 安装 [Node.js](https://nodejs.org/) (推荐最新稳定版本)。
   - 验证安装：在终端运行 `node -v`。

2. **Appium**:

   - 全局安装 Appium：`npm install -g appium`。
   - 验证安装：运行 `appium -v`。

3. **WebDriverIO CLI**:

   - 全局安装 WebDriverIO 命令行工具：`npm install -g @wdio/cli`。

4. **多端配置**:

   - [Appium 文档](https://appium.io/)
   - [WebDriverIO 文档](https://webdriver.io/)

## 安装

使用以下命令安装框架：

```bash
// 安装 Node.js 18
https://nodejs.org/dist/latest-v18.x/node-v18.19.0-darwin-arm64.tar.gz

// 克隆仓库并安装依赖
git clone -b feature_e2e git@github.com:OneKeyHQ/node-e2e.git
npm install

// 如需运行 Web UI
cd web && npm install && cd -

```

## 环境变量

环境变量用于配置不同平台的测试设置

### 示例环境变量文件

#### .env

```
LOG_LEVEL=debug  //日志
SPECS=../test/2/*.e2e.js //用例文件
```

#### .env.android.example

```
APPIUM_DEVICENAME=Pixel_6
APPIUM_APPPACKAGE=xx.xx.dev
APPIUM_APPACTIVITY=xx.xx.MainActivity
APPIUM_APP=/path/artifacts/app-direct-debug.apk
APPIUM_PORT=4728

```

#### .env.electron

```
APPIUM_APPBINARYPATH=/path/node-e2e/aritifacts/xx.app/Contents/MacOS/xx
APPIUM_CHROMEDRIVER=/path/node-e2e/aritifacts/chromedriver
```

#### .env.ext.example

```
LOAD_EXTENSION=/path/node-e2e/aritifacts/chrome/
```

#### .env.ios.example

```
APPIUM_PLATFORMVERSION=16.7.1
APPIUM_XCODEORGID=
APPIUM_BUNDLEID=
APPIUM_UDID=
APPIUM_APP=/path/node-e2e/aritifacts/OneKeyWallet.app
APPIUM_PORT=4728

```

#### .env.web.example

```
BASEURL=http://localhost:3000/
```

## test 执行

使用以下命令来运行测试用例：

```bash

# 运行 Web 端测试用例

cli/index.js run --platform=web --framework=wdio

# 运行 iOS 端测试用例

cli/index.js test --platform=ios --framework=wdio

# 运行 Android 端测试用例

cli/index.js test --platform=android --framework=wdio

# 运行桌面端测试用例

cli/index.js run --platform=electron --framework=wdio
```

## 可视化

```bash

npm run web

```

## e2e.js 示例

```JavaScript
// test *.e2e.js 用例文件
describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.1.1.1 - brower toolbar滚动`, async () => {
    await play(`2.1.1.1.1.1.1`, {}, (context) => {
      // //console.log('最终的上下文:', context);
    });
  });
});

```

### 代码解释

#### `describe` 函数：

- **用途**：用于分组测试用例。
- **示例**：`# 2.* 发现页` 表示测试报告中的用例分组，相同的分组会被归为一组。

#### `it` 函数：

- **用途**：用于描述单个测试用例。
- **示例**：`2.1.1.1.1.1.1 - brower toolbar滚动` 用于描述当前的测试用例。

#### `play` 函数：

- **用途**：用于执行一个 user story，即一个测试用例。
- **示例**：`2.1.1.1.1.1.1` 表示当前测试案例，由以下步骤顺序执行：
  - `story/2/2.1.step.js`
  - `story/2/2.1.1.step.js`
  - `story/2/2.1.1.1.step.js`
  - ...
  - `story/2/2.1.1.1.1.1.1.step.js`
- **参数**：`{}` 用于传递自定义参数（键值对），这些参数用于执行可参数化的步骤。
- **回调函数**：`() => {}` 在执行完成后调用的回调函数。

## step.js 示例

```JavaScript
// stories *.step.js 用例文件
step(
  { id: '2', describe: '发现页' },
  [],
  [],
  async (
    data,
    {
      platform,
      api: { by, pause },
      step,
      getStore,
      setStore,
      reporter,
      parameter,
    },
  ) => {
    await platform
      .ios()
      .android()
      .run(async () => {
        await pause(5000);
      });

    await $(by.id('discovery')).click();
  },
);

```

## 核心概念

### `play`

`play` 函数用于启动和控制测试用例链的执行。它接受三个参数：用例链的标识符、测试参数和一个回调函数。

### `step`

`step` 函数定义了单个测试步骤。它接收四个参数：步骤的标识符和描述、依赖数据、依赖步骤以及执行函数。

### `context`

`context` 对象在测试过程中用于存储和传递执行上下文。它包含以下关键元素：

- **platform**: 分平台调用链的信息。
- **api**: 提供不同平台的操作方法，如 `execute`、`by`、`switchContext` 等。
- **step**: 当前执行的步骤信息。
- **getStore/setStore**: 获取和设置执行链中的公共数据。
- **reporter**: Alltrue reporter 对象，用于生成测试报告。
- **parameter**: 调用执行链时的参数。

## 文件结构

```plaintext
e2e/
|-- cli/
| |-- index.js # CLI 入口文件
| |-- commands/
| |-- run.js # 'run' 命令的实现
|-- stories/ # 存放测试用例链的目录
| |-- \*.step.js # 测试步骤定义文件
|-- test/ # 存放测试用例链的目录
| |-- \*.e2e.js # 测试用例定义文件
|-- api/
| |-- index.js # 对外暴露的 API
|-- package.json
|-- README.md
```

## 自动化测试 API

框架基于 WebDriverIO 和 Appium 实现。

### 配置 (Config)

`config` 目录包含了针对不同端的预定义配置。如遇问题或需要进一步了解，可访问以下链接：

- [WebDriverIO 官网](https://webdriver.io/)
- [Appium 官网](https://appium.io/)
- [Appium UIAutomator2 Driver GitHub 仓库](https://github.com/appium/appium-uiautomator2-driver)
- [Appium XCUITest Driver GitHub 仓库](https://github.com/appium/appium-xcuitest-driver)

### 选择器 (Selector)

`const { by } = api; // 封装了两种类型的元素选择器`

单个元素选择：使用 `by.id("")`，通过 React Native testID 进行选择，已适配多端。
多元素选择：使用 `by.idsStartWith("")`，根据 ID 前缀选择多个元素。

需结合 WebDriverIO 的 `$` 和 `$$` 方法进行元素的单选和多选。例如：

`$('test');`
`$$('test-');`

相关文档：

- [WebDriverIO `$` 方法文档](https://webdriver.io/docs/api/browser/$)
- [WebDriverIO `$$` 方法文档](https://webdriver.io/docs/api/browser/$$)

### 操作 (Action)

`const { tap, longPress, switchContext, execute, waitUntil, pause } = api; // 提供了一系列操作函数`

tap：单击操作。
longPress：长按操作。
switchContext：测试 WebView 时切换至 WebView 或 Native 环境。
execute：执行 JavaScript 代码或 Appium 的 `mobile: xx` 命令。
waitUntil：在移动环境下执行等待函数，在 Web 环境下不执行。
pause：暂停执行操作。

### 断言 (Expect)

expect 使用 WebDriverIO 原生断言。

- 元素类断言：利用 WebDriverIO 提供的断言功能进行元素相关的测试。
- 基础类断言：使用 Jest 进行基础断言。

### webview

https://webkit.org/blog/13936/enabling-the-inspection-of-web-content-in-apps/

## 贡献

欢迎任何形式的贡献和建议。

## 许可

本项目使用 MIT 许可证。

<br>
<br>
<br>

Made by Love and Resp. ❤️👩‍💻👨‍💻
