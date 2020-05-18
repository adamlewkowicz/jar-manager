import { useState } from 'react';
import { Jar } from '../types';

export const useJar = () => {
  const [data, setData] = useState<Jar>({
    id: 1,
    balance: 1000,
    transactions: [],
  });

  const addFunds = (amount: number) => {
    setData((data) => ({ ...data, balance: data.balance + amount }));
  };

  const removeFunds = (amount: number) => {
    setData((data) => ({ ...data, balance: data.balance - amount }));
  };

  return { addFunds, removeFunds, data };
};
