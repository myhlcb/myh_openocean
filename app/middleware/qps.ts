import { Counter } from 'prom-client';

export const httpQpsCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path'],
});

export function qpsMiddleware() {
  return async (ctx, next) => {
    await next(); // 等待控制权回来再记录，确保路径已解析
    httpQpsCounter.inc({ method: ctx.method, path: ctx.path });
  };
}
