import { reduce } from 'lodash/fp';

interface CalculateAmountsInput {
  type: 'spense' | 'income';
  amount: number;
  date: string;
}

interface CalculateAmountsInputOutput {
  income: number;
  spense: number;
  date: string;
}

export const calculateAmounts = reduce<
  CalculateAmountsInput,
  CalculateAmountsInputOutput
>(
  (acc, input) => {
    const isIncome = input.type === 'income';
    return {
      income: acc.income + (isIncome ? input.amount : 0),
      spense: acc.spense + (!isIncome ? input.amount : 0),
      date: input.date,
    };
  },
  { income: 0, spense: 0, date: '' }
);
