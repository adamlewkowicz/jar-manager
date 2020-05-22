import { useSelector, useDispatch } from 'react-redux';
import type { JarFundsTransfer } from '../store/actions';
import { Selectors, Actions } from '../store';
import { Currency } from '../types';

export const useJarStore = () => {
  const dispatch = useDispatch();
  const jars = useSelector(Selectors.getJarsWithTransactions);

  const fundsAdd = (jarId: number, funds: number) => {
    dispatch(Actions.jarFundsAdded(jarId, funds));
  };

  const fundsRemove = (jarId: number, funds: number) => {
    dispatch(Actions.jarFundsRemoved(jarId, funds));
  };

  const createJar = (currency: Currency, balance: number) => {
    dispatch(Actions.jarCreated({ currency, balance }));
  };

  const fundsTransfer = (payload: JarFundsTransfer) => {
    dispatch(Actions.jarFundsTransferred(payload));
  };

  const updateDefault = (jarId: number) => {
    dispatch(Actions.jarDefaultUpdated(jarId));
  };

  return {
    jars,
    createJar,
    fundsTransfer,
    fundsAdd,
    fundsRemove,
    updateDefault,
  };
};
