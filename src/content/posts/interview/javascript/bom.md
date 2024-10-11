---
title: Bom
published: 2024-10-11
description: ''
image: ''
tags: [ JavaScript ]
category: Interview
draft: false
comments: true
lang: ''
---

## 是什么

`BOM` (Browser Object Model)，浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象

其作用就是跟浏览器做一些交互效果,比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动，以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率

浏览器的全部内容可以看成`DOM`，整个浏览器可以看成`BOM`。区别如下：
![Bom](../../../../assets/images/bom.png)

## window

`Bom`的核心对象是`window`，它表示浏览器的一个实例

在浏览器中，`window`对象有双重角色，即是浏览器窗口的一个接口，又是全局对象

因此所有在全局作用域中声明的变量、函数都会变成`window`对象的属性和方法

```js
var name = 'js每日一题';

function lookName() {
  alert(this.name);
}

console.log(window.name);  //js每日一题
lookName();                //js每日一题
window.lookName();         //js每日一题
```

关于窗口控制方法如下：

- `moveBy(x,y)`：从当前位置水平移动窗体x个像素，垂直移动窗体y个像素，x为负数，将向左移动窗体，y为负数，将向上移动窗体
- `moveTo(x,y)`：移动窗体左上角到相对于屏幕左上角的(x,y)点
- `resizeBy(w,h)`：相对窗体当前的大小，宽度调整w个像素，高度调整h个像素。如果参数为负值，将缩小窗体，反之扩大窗体
- `resizeTo(w,h)`：把窗体宽度调整为w个像素，高度调整为h个像素
- `scrollTo(x,y)`：如果有滚动条，将横向滚动条移动到相对于窗体宽度为x个像素的位置，将纵向滚动条移动到相对于窗体高度为y个像素的位置
- `scrollBy(x,y)`： 如果有滚动条，将横向滚动条向左移动x个像素，将纵向滚动条向下移动y个像素

`window.open()` 既可以导航到一个特定的`url`，也可以打开一个新的浏览器窗口

如果 `window.open()` 传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的URL

```js
window.open('htttp://www.vue3js.cn', 'topFrame') //==> < a href=" " target="topFrame"></ a>
```

`window.open()` 会返回新窗口的引用，也就是新窗口的 `window` 对象

```js
const myWin = window.open('https://www.vue3js.cn', 'myWin')
```

`window.close()` 仅用于通过 `window.open()` 打开的窗口

新创建的 `window` 对象有一个 `opener` 属性，该属性指向打开他的原始窗口对象

## location

`url`地址如下：

```text
https://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents
```

`location`属性描述如下：

| 属性名      | 例子                                                     | 说明                  |
|----------|--------------------------------------------------------|---------------------|
| hash     | "#contents"                                            | utl中#后面的字符，没有则返回空串  |
| host     | www.wrox.com:80                                        | 服务器名称和端口号           |
| hostname | www.wrox.com                                           | 域名，不带端口号            |
| href     | http://www.wrox.com:80/WileyCDA/?q=javascript#contents | 完整url               |
| pathname | "/WileyCDA/"                                           | 服务器下面的文件路径          |
| port     | 80                                                     | url的端口号，没有则为空       |
| protocol | http:                                                  | 使用的协议               |
| search   | ?q=javascript                                          | url的查询字符串，通常为？后面的内容 |

除了 `hash`之外，只要修改`location`的一个属性，就会导致页面重新加载新`URL`

`location.reload()`，此方法可以重新刷新当前页面。这个方法会根据最有效的方式刷新页面，如果页面自上一次请求以来没有改变过，页面就会从浏览器缓存中重新加载

如果要强制从服务器中重新加载，传递一个参数`true`即可

## navigator

`navigator` 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂

下表列出了`navigator`对象接口定义的属性和方法：

| 属性/方法                         | 说明                                                       |
|-------------------------------|----------------------------------------------------------|
| activeVrDisplays              | 返回数组，包含ispresenting 属性为true的VRDisplay实例                  |
| appCodeName                   | 即使在非Mozilla浏览器中也会返回"Mozilla"                             |
| appName                       | 浏览器全名                                                    |
| appVersion                    | 浏览器版本。通常与实际的浏览器版本不一致                                     |
| battery                       | 返回暴露 Battery Status API 的 BatteryManager 对象              |
| buildId                       | 浏览器的构建编号                                                 |
| connection                    | 返回暴露NetworkInformation API的NetworkInformation对象          |
| cookieEnabled                 | 返回布尔值，表示是否启用了cookie                                      |
| credentials                   | 返回暴露 Credentials Management API的 CredentialsContainer 对象 |
| deviceMemory                  | 返回单位为GB的设备内存容量                                           |
| doNotTrack                    | 返回用户的“不跟踪”（do-not-track）设置                               |
| geolocation                   | 返回暴露Geolocation API的Geolocation对象                        |
| getVRDisplays ()              | 返回数组，包含可用的每个VRDisplay实例                                  |
| getUserMedia()                | 返回与可用媒体设备硬件关联的流                                          |
| hardwareConcurrency           | 返回设备的处理器核心数量                                             |
| javaEnabled                   | 返回布尔值，表示浏览器是否启用了Java                                     |
| language                      | 返回浏览器的主语言                                                |
| languages                     | 返回浏览器偏好的语言数组                                             |
| locks                         | 返回暴露WebLocksAPI的LockManager对象                            |
| mediaCapabilities             | 返回暴露MediaCapabilities API的MediaCapabilities对象            |
| mediaDevices                  | 返回可用的媒体设备                                                |
| maxTouchPoints                | 返回设备触摸屏支持的最大触点数                                          |
| mimeTypes                     | 返回浏览器中注册的MIME类型数组                                        |
| onLine                        | 返回布尔值，表示浏览器是否联网                                          |
| oscpu                         | 返回浏览器运行设备的操作系统和（或）CPU                                    |
| permissions                   | 返回暴露PermissionsAPI的Permissions对象                         |
| plat form                     | 返回浏览器运行的系统平台                                             |
| plugins                       | 返回浏览器安装的插件数组。在IE中，这个数组包含页面中所有元素                          |
| product                       | 返回产品名称（通常是"Gecko"）                                       |
| productSub                    | 返回产品的额外信息（通常是Gecko的版本）                                   |
| registerProtocolHandler()     | 将一个网站注册为特定协议的处理程序                                        |
| requestMediaKeySystemAccess() | 返回一个期约，解决为MediaKeySystemAccess对象                         |
| sendBeacon()                  | 异步传输一些小数据                                                |
| serviceWorker                 | 返回用来与 ServiceWorker实例交互的 ServiceWorkerContainer          |
| share ()                      | 返回当前平台的原生共享机制                                            |
| storage                       | 返回暴露StorageAPI的 StorageManager对象                         |
| userAgent                     | 返回浏览器的用户代理字符串                                            |
| vendor                        | 返回浏览器的厂商名称                                               |
| vendorSub                     | 返回浏览器厂商的更多信息                                             |
| vibrate()                     | 触发设备振动                                                   |
| webdriver                     | 返回浏览器当前是否被自动化程序控制                                        |

## creen

保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度

| 属 性         | 说 明                             |
|-------------|---------------------------------|
| availHeight | 屏幕像素高度减去系统组件高度（只读）              |
| availLeft   | 没有被系统组件占用的屏幕的最左侧像素（只读）          |
| availTop    | 没有被系统组件占用的屏幕的最顶端像素（只读）          |
| availWidth  | 屏幕像素宽度减去系统组件宽度（只读）              |
| colorDepth  | 表示屏幕颜色的位数；多数系统是32（只读）           |
| height      | 屏幕像素高度                          |
| left        | 当前屏幕左边的像素距离                     |
| pixelDepth  | 屏幕的位深（只读）                       |
| top         | 当前屏幕顶端的像素距离                     |
| width       | 屏幕像素宽度                          |
| orientation | 返回 Screen Orientation API中屏幕的朝向 |

## history

`history`对象主要用来操作浏览器`URL`的历史记录，可以通过参数向前，向后，或者向指定`URL`跳转

常用的属性如下：

- `history.go()`

  接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转，

  接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转，
    ```js
    history.go('maixaofei.com')
    ```
  当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面
    ```js
    history.go(3) //向前跳转三个记录
    history.go(-1) //向后跳转一个记录
    ```

- `history.forward()`：向前跳转一个页面
- `history.back()`：向后跳转一个页面
- `history.length`：获取历史记录数
