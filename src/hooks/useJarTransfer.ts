import { useReducer, useEffect } from 'react';
import type { Jar } from '../types';
import {
  jarTransferReducer,
  getInitialState,
} from '../components/JarTransferModal/reducer';

export const useJarTransfer = (jars: Jar[]) => {
  const [state, dispatch] = useReducer(jarTransferReducer, getInitialState(jars));
  const maxAmount = state.currentJar?.balance ?? 0;

  useEffect(() => {
    if (state.jars !== jars) {
      dispatch({ type: 'JARS_UPDATED', payload: jars });
    }
  }, [jars]);

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
    state,
    maxAmount,
    updateAmount,
    updateCurrentJarId,
    updateTargetJarId,
  };
};
