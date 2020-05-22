import { useReducer } from 'react';
import { Jar } from '../types';
import {
  jarTransferReducer,
  getInitialState,
} from '../components/JarTransferModal/reducer';

export const useJarTransfer = (jars: Jar[]) => {
  const [state, dispatch] = useReducer(jarTransferReducer, getInitialState(jars));

  const updateCurrentJarId = (jarId: string) => {
    dispatch({ type: 'CURRENT_JAR_UPDATED', payload: Number(jarId) });
  };

  const updateTargetJarId = (jarId: string) => {
    dispatch({ type: 'TARGET_JAR_UPDATED', payload: Number(jarId) });
  };

  const updateAmount = (amount: number) => {
    dispatch({ type: 'AMOUNT_UPDATED', payload: amount });
  };

  return {
    updateAmount,
    updateCurrentJarId,
    updateTargetJarId,
    state,
    dispatch,
  };
};
