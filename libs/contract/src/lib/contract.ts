import { initContract } from '@ts-rest/core';
import { todoContract } from '../todo/contract';
import { fileContract } from '../file/contract';

const c = initContract();

type ContractType = {
  todo: typeof todoContract;
  file: typeof fileContract;
};

export const contract: ContractType = c.router({
  todo: todoContract,
  file: fileContract,
});
