import { z } from 'zod';
import { BaseError } from './error-handler';

const numFromString = z.string().transform((val) => {
  const num = Number(val);
  if (isNaN(num)) {
    throw new BaseError({
      message: 'Invalid number',
      type: 'client',
      status: 400,
    });
  }
  return num;
});

export function getNumFromString(numAsString: string) {
  const parsed = numFromString.safeParse(numAsString);
  if (parsed.success) {
    return parsed.data;
  } else {
    throw new BaseError({
      message: 'Invalid number',
      type: 'client',
      status: 400,
    });
  }
}
