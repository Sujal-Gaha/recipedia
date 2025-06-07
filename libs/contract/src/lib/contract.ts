import { initContract } from '@ts-rest/core';
import { todoContract } from '../todo/contract';

const c = initContract();

type ContractType = {
  todo: typeof todoContract;
};

export const contract: ContractType = c.router({
  todo: todoContract,
});
