import { Context, Next } from 'koa';
const path = require('node:path');
const dir = path.join(__dirname + '/../locales/joi');
import * as Joi from 'joi';
import _ from 'lodash';
console.log(__dirname + '../locales/joi');
const Joi = require('joi-i18n-x')(require('joi'), dir);
export default function joi(ctx: Context, next: () => Promise<any>) {
  ctx.state.JoiValid = (data: any, schema: any) =>
    Joi.validate(data, schema, { i18n: 'zh-CN' }, (err, value) => {
      const message = err ? err.message || _.get(err, 'details.0.message') : '';
      ctx.assert(!err, 400, message || err);
      return { err, value };
    });
  return next();
}
