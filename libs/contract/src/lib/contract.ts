import { initContract } from '@ts-rest/core';
import { todoContract } from '../todo/contract';
import { fileContract } from '../file/contract';
import { ingredientContract } from '../ingredient/contract';
import { recipeContract } from '../recipe/contract';
import { userContract } from '../user/contract';

const c = initContract();

type ContractType = {
  todo: typeof todoContract;
  file: typeof fileContract;
  ingredient: typeof ingredientContract;
  recipe: typeof recipeContract;
  user: typeof userContract;
};

export const contract: ContractType = c.router({
  todo: todoContract,
  file: fileContract,
  ingredient: ingredientContract,
  recipe: recipeContract,
  user: userContract,
});
