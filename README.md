## 介绍

- 基础架构使用 koa2+typescript+mysql
- 使用 nodemon 自动重启
- 使用 typeorm 做 orm 映射
- 使用 joi 验证入参

## 项目结构

```
.
├── app
|   ├── connection    // mysql和redis等数据库连接
│   ├── controller    // controller
|   ├── entities      // model
│   ├── service       // service层
│   ├── router        // 路由
|   ├── workers       // 挂载定时任务脚本
│   └── app.ts        // 项目入口app.ts
├── nodemon.json      // nodemon配置
├── package.json
└── tsconfig.json
```
## 安装与启动
* yarn install
* yarn run dev  
* 根目录下config里面添加dev.json,配置dev环境开发的环境变量

## 开发阶段一

- 集成 openocean chains 接口(openocean 的 chains 没有接口，而是文档列出来的,所以需要导入 sql-->sql/insert_chains.sql)
- 集成 openocean tokens 接口
- 集成 openocean gasPrice 接口
- 集成 openocean quote 接口
- 集成 openocean swap 接口

### 调用例子

```bash
# 获取⽀持的⽹络 chains
curl localhost:3000/api/dex/openocean/chains
```

```bash
# 获取⽀持的token列表 token
curl localhost:3000/api/dex/openocean/token?chain=eth
```

```bash
# 询价 
curl localhost:3000/api/dex/openocean/quote?chain=bsc&inToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outToken=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d

```
```bash
# 构建交易swap
curl localhost:3000/api/dex/openocean/swap?chain=bsc&inToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outToken=0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d

```

```bash
# 获取gasPrice
localhost:3000/api/dex/openocean/gasPrice?chain=bsc
```

## 开发阶段二

添加一个同步渠道商数据的worker,这里和主任务放到一起了,相关建表sql在根目录 sql/*.sql,
worker里面包含两个定时任务startTokenSyncJob和startQuoteSyncJob，分别用来同步代币信息和价格信息
迭代内容如下:
- 设计 token 表，通过定时任务startTokenSyncJob同步 token 信息(暂定 1h 执行一次)
- 涉及 quote 表，通过定时任务startQuoteSyncJob同步 quote 信息(暂定 2h 执行一次)
- 如果有多家供应商，可以通过从 db 里面比较 quote，获取最优价
- 同时第一步开发的 API 也可以通过直接从 DB 读取数据，保证 API 响应速度


## 开发阶段三
* 使用redis缓存token列表(选用redis HASH表存储)(redis.hset(`${provider}:tokenList`, chain, string)
* 在同步token的定时任务和 api/dex/{provider}/token 接口都缓存
* 路由的exchange改为dex
* 去掉同步quote的定时任务
* 新增一个接口，可以通过渠道商+chain查询tokenlist
