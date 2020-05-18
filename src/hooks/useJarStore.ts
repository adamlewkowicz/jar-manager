import { useSelector } from 'react-redux';
import { getJarsWithTransactions } from '../store/modules/jars/selectors';
import { Actions } from '../store';

export const useJarStore = () => {
  const jars = useSelector(getJarsWithTransactions);

  const addFunds = (amount: number) => {};

  return jars;
};
