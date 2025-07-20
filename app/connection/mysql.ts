import { DataSource } from 'typeorm';
import { ProviderChain } from '../entities/providerChain.entity';
import { Quote } from '../entities/quote.entity';
import { Token } from '../entities/token.entity';

const config = require('config');
const mysqlConfigDefault = config.get('dbConfig.mysql');
let AppDataSource: any;
async function createConnect() {
  AppDataSource = new DataSource({
    ...mysqlConfigDefault,
    entities: [ProviderChain, Quote, Token],
  });

  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
}

async function closeConnect() {
  await AppDataSource.close()
    .then(() => {
      console.log('Data Source has been closed!');
    })
    .catch((err) => {
      console.error('Error during Data Source closed', err);
    });
}

export { createConnect, closeConnect, AppDataSource };
