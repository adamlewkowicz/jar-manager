import { useState, useReducer } from 'react';
import { Jar } from '../types';
import {
  jarTransferReducer,
  initialState,
  getInitialState,
} from '../components/JarTransferModal/reducer';

export const useJarTransfer = (jars: Jar[]) => {
  const [percentageBreakdown, setPercentageBreakdown] = useState(() =>
    jars.map((_, index) => 0),
  );

  const [state, dispatch] = useReducer(jarTransferReducer, { ...initialState, jars });

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
    percentageBreakdown,
    updateAmount,
    updateCurrentJarId,
    updateTargetJarId,
    state,
    dispatch,
  };
};
