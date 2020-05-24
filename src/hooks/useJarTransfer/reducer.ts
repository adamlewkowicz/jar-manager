import type { Jar } from '../../types';

interface JarTransferState {
  jars: Jar[];
  amount: number;
  currentJar: Jar | null;
  targetJar: Jar | null;
  targetJars: {
    data: Jar;
    isTransferAllowed: boolean;
    percentageBreakdown: number;
  }[];
}

export const jarTransferReducer = (
  state: JarTransferState,
  action: Action,
): JarTransferState => {
  switch (action.type) {
    case 'JARS_UPDATED':
      return getInitialState(action.payload);
    case 'CURRENT_JAR_UPDATED': {
      const currentJar = state.jars.find((jar) => jar.id === action.payload) ?? null;

      const targetJars = state.jars.map((jar) => {
        const isSameJar = jar.id === currentJar?.id;
        const isEqualCurrency = jar.currency === currentJar?.currency;
        const isTransferAllowed = !isSameJar && isEqualCurrency;

        return {
          data: jar,
          isTransferAllowed,
          percentageBreakdown: 0,
        };
      });

      const availableTargetJars = targetJars.filter((jar) => jar.isTransferAllowed);
      const defaultJar = availableTargetJars.find((jar) => jar.data.isDefault);

      return {
        ...state,
        currentJar,
        targetJar: defaultJar?.data ?? null,
        targetJars,
      };
    }
    case 'TARGET_JAR_UPDATED': {
      const targetJar = state.jars.find((jar) => jar.id === action.payload) ?? null;
      return {
        ...state,
        targetJar,
      };
    }
    case 'AMOUNT_UPDATED':
      return {
        ...state,
        amount: action.payload,
      };
  }
};

export const initialState: JarTransferState = {
  jars: [],
  amount: 0,
  currentJar: null,
  targetJar: null,
  targetJars: [],
};

export const getInitialState = (jars: Jar[]): JarTransferState => ({
  ...initialState,
  targetJars: jars.map((jar) => ({
    data: jar,
    isTransferAllowed: false,
    percentageBreakdown: 0,
  })),
  jars,
});

type Action =
  | { type: 'JARS_UPDATED'; payload: Jar[] }
  | {
      type: 'CURRENT_JAR_UPDATED';
      payload: number;
    }
  | {
      type: 'TARGET_JAR_UPDATED';
      payload: number;
    }
  | { type: 'AMOUNT_UPDATED'; payload: number };
