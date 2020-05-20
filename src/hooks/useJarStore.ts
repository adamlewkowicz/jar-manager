import { useSelector, useDispatch } from 'react-redux';
import { getJarsWithTransactions } from '../store/modules/jars/selectors';
import {
  jarFundsAdded,
  jarFundsRemoved,
  jarCreated,
} from '../store/actions';
import { Currency } from '../types';

export const useJarStore = () => {
  const jars = useSelector(getJarsWithTransactions);
  const dispatch = useDispatch();

  // const handleFundsAdd = (funds: number) => {
  //   dispatch(jarFundsAdded(currentJar.id, funds));
  // };

  // const handleFundsRemove = (funds: number) => {
  //   dispatch(jarFundsRemoved(currentJar.id, funds));
  // };

  const handleJarCreate = (currency: Currency, balance: number) => {
    dispatch(jarCreated({ currency, balance }));
  };

  return { jars, createJar: handleJarCreate };
};
