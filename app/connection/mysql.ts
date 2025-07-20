import { DataSource } from 'typeorm';
import { ProviderChain } from '../entities/providerChain.entity';
const config = require('config');
const mysqlConfigDefault = config.get('dbConfig.mysql');

async function createConnect() {
  const AppDataSource = new DataSource({
    ...mysqlConfigDefault,
    entities: [ProviderChain],
  });

  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
}
export default createConnect;
