# 用于记录开发中的问题和解决方法以及共性解决方案

## taro入口文件修改为app.tsx后提示找不到app.ts
+ 现象：想在app.ts中加入provider，所以将app.ts修改为app.tsx，但是报错找不到app.ts文件。
+ 原因：如果第一次启动时，入口文件时是app.ts，在后续编译过程中会一直以.ts为入口文件，此时进行修改则会报错。推测是如此，代码层面的逻辑还不太清楚。
+ 方法：修改后命令行输入启动命令重新启动
## taro request修改request的content-type，携带query参数
+ 方法：
  + 在header参数中设置，dataType是设置返回的数据格式
  + 携带query参数，在url后进行拼接
```typescript
{
  header: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
```
## taro.request中的cookie
+ 响应拦截器中的cookie就是response中能够拿到的cookies字段，这个应该是框架本身将响应中的set-Cookie的value给封装进来了

response Header中
```
  Set-Cookie: 
  NMTID=00OPYe1Z-NhS6CjOU0znmtsYrU0K4kAAAF5_imWlg; Max-Age=315360000; Expires=Tue, 10 Jun 2031 03:00:08 GMT; Path=/;
```

response中的cookies字段
```javascript
cookies = ["NMTID=00OPYe1Z-NhS6CjOU0znmtsYrU0K4kAAAF5_imWlg; Max-Age=315360000; Expires=Tue 10 Jun 2031 03:00:08 GMT; Path=/;"]
```

## 记录一次redux的state更新后视图不更新的问题
+ 因为一开始打印state后发现是更新的，但是在将state进行stringify后显示在视图中，和控制台中打印的state不一致。以为是reducer中浅拷贝的问题，对比引用没有变化导致没有视图更新。
+ 但是我的值并非对之前的state进行了引用，而是对action传入的payload直接进行了赋值，所以不是reducer的问题。
+ 最终发现是action中进行dispatch时，没有在请求的异步处理中进行调用，导致传入reducer的值是未经过请求更新的，但是由于是引用，最终还是进行了state的变化，但这时候已经不会到reducer中，也就不会进行视图的改变了。

## taroui的tabs中使用全屏组件无效
+ 例如`AtFloatLayout`、`Modal`等，最终自己重新写了个`tabs`组件，位于`/components/common/Mytabs`

## 虚拟列表方案
+ 官方提供[长列表渲染（虚拟列表）](https://taro-docs.jd.com/taro/docs/virtual-list)方案，使用后发现有以下问题
  + 快速滚动时，白屏几率高
  + 垂直滚动，无法设置容器竖直方向高度
  + `itemSize`等参数单位是PX?无法和css高度进行统一

## 关于歌词滚动
+ 首先尝试纯css方案，通过设置translateY进行偏移，但是导致偏移后的内容无法通过滑动再返回到视图中
+ 使用ScrollView进行滚动，scrollTo方法尝试了很久无效....
+ 使用ScrollView进行滚动，scrollIntoView，但是目前只能让当前歌词位于顶部

## AtInput 设置focus后开发者工具预览无效
+ 但是真机预览时会自动触发focus的，初步排查是开发者工具问题

## 一次关于react渲染有关问题的排查与修改
+ 问题描述：在编写评论页面时，我将单个评论封装为一个函数组件，在页面中使用map调用组件进行渲染。在组件中通过`setstate`设置父组件中变量，导致父组件重绘，本来滚动位置重置到了顶部.
+ 解决方法：将单个评论组件封装为一整个评论列表，不会导致列表滚动重置。
+ ❓原因：猜测是跟父子组件渲染有关。父子组件，子改变父组件数据，父组件重绘，导致列表重绘，顺序重置，但是子组件数据没变，子组件本身不会重绘。这也是将单评论改为列表组件后，不会滚动重置的原因。