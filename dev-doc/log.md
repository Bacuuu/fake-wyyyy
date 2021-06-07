# 用于记录开发中的问题和解决方法以及共性解决方案

## taro入口文件修改为app.tsx后提示找不到app.ts
+ 现象：想在app.ts中加入provider，所以将app.ts修改为app.tsx，但是报错找不到app.ts文件。
+ 原因：如果第一次启动时，入口文件时是app.ts，在后续编译过程中会一直以.ts为入口文件，此时进行修改则会报错。推测是如此，代码层面的逻辑还不太清楚。
+ 方法：修改后命令行输入启动命令重新启动

## taro request修改request的content-type，携带query参数
+ 方法：
  + 在header参数中设置，dataType是设置返回的数据格式
  + 携带query参数，在url后进行拼接👂
```typescript
{
  header: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
```

