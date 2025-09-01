import { initContract } from '@ts-rest/core';
import { todoContract } from '../todo/contract';
import { fileContract } from '../file/contract';
import { ingredientContract } from '../ingredient/contract';

const c = initContract();

type ContractType = {
  todo: typeof todoContract;
  file: typeof fileContract;
  ingredient: typeof ingredientContract;
};

export const contract: ContractType = c.router({
  todo: todoContract,
  file: fileContract,
  ingredient: ingredientContract,
});
