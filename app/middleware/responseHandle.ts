export default () => {
  return (ctx, next) => {
    const startTime = new Date().getTime();
    return next()
      .then(() => {
        if (!Buffer.isBuffer(ctx.body)) {
          const { status, body, message } = ctx.response;
          const resBody = status === 200 ? body : { message };
          const success = status === 200 ? body.success || true : false;
          const endTime = new Date().getTime();
          ctx.body = {
            success,
            ...resBody,
            during: endTime - startTime,
          };
        }
      })
      .catch((err) => {
        // 错误统一处理
        const endTime = new Date().getTime();
        const status = err.status || 500;
        ctx.status = 200;
        ctx.body = {
          success: false,
          message: err.message,
          during: endTime - startTime,
          origin: { ...err, status },
        };
      });
  };
};
