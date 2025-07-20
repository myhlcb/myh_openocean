## 介绍

- 基础架构使用 koa2+typescript
- 使用 nodemon 自动重启
- 使用 typeorm 做 orm 映射
- 使用 joi 验证入参

## 项目结构

```
.
├── app
|   ├── connection
│   ├── controller    // controller
|   ├── entities      // model
│   ├── service       //service层
│   ├── router        //路由
│   └── app.ts        //项目入口app.ts
├── nodemon.json        //nodemon配置
├── package.json
└── tsconfig.json
```

## 开发阶段一

- 集成 openocean chains 接口(openocean 的 chains 没有接口，而是文档列出来的,所以需要导入 sql-->sql/insert_chains.sql)
- 集成 openocean tokens 接口
- 集成 openocean gasPrice 接口
- 集成 openocean quote 接口
- 集成 openocean swap 接口
