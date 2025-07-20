import axios from 'axios';
import _ from 'lodash';
import { ProviderChain } from '../../entities/providerChain.entity';

export default class OpenoceanService {
  // 获取chains列表
  public chains = async () => {
    const chains = await ProviderChain.find();
    return chains;
  };

  // 获取token列表
  public tokenList = async (chain: string) => {
    const url = `https://open-api.openocean.finance/v4/${chain}/tokenList`;
    const response = await axios.get(url);
    return response.data;
  };
  // 获取gasPrice
  public gasPrice = async (chain: string) => {
    const url = `https://open-api.openocean.finance/v4/${chain}/gasPrice`;
    const response = await axios.get(url);
    return response.data;
  };

  // 询价
  public quote = async (
    chain: string,
    inToken: string,
    outToken: string,
    amount: string = '1',
    gasPrice = 3
  ) => {
    const url = `https://open-api.openocean.finance/v4/${chain}/quote`;
    const params = {
      inTokenAddress: inToken,
      outTokenAddress: outToken,
      amount,
      gasPrice,
    };
    const response = await axios.get(url, { params });
    return response.data;
  };
  // 构建交易
  public buildSwapTx = async (
    chain: string,
    inToken: string,
    outToken: string,
    amount: string = '1',
    gasPrice = 3,
    slippage: string = '1'
  ) => {
    const url = `https://open-api.openocean.finance/v4/${chain}/swap`;
    const params = {
      inTokenAddress: inToken,
      outTokenAddress: outToken,
      amount,
      gasPrice,
      slippage,
      referrer: 'onekey',
    };
    const response = await axios.get(url, { params });
    return response.data;
  };
}
