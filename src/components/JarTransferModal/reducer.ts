import { Jar } from '../../types';
import { getJarTitle } from '../../utils';

interface JarTransferState {
  jars: Jar[];
  transferFromJar: Jar | null;
  transferToJar: Jar | null;
  transferToJars: {
    data: Jar;
    title: string;
    isNotEqualCurrency: boolean;
    isTransferAllowed: boolean;
  }[];
}

export const jarTransferReducer = (
  state: JarTransferState,
  action: Action,
): JarTransferState => {
  switch (action.type) {
    case 'FROM_JAR_UPDATED':
      const transferFromJar = action.payload;
      // const transferToJars
      return {
        ...state,
        transferFromJar,
        transferToJar: null,
        transferToJars: state.jars.map((jar) => {
          const isSameJar = jar.id === transferFromJar.id;
          const isEqualCurrency = jar.currency === transferFromJar.currency;
          const isNotEqualCurrency = jar.currency !== transferFromJar.currency;
          const isNotSameJar = !isSameJar;
          const isTransferAllowed = isNotSameJar && isEqualCurrency;
          const title = getJarTitle(jar);

          return {
            data: jar,
            title,
            isSameJar,
            isNotEqualCurrency,
            isTransferAllowed,
          };
        }),
      };
    case 'TO_JAR_UPDATED':
      return {
        ...state,
        transferToJar: action.payload,
      };
  }
};

type TransferFromJarUpdated = {
  type: 'FROM_JAR_UPDATED';
  payload: Jar;
};

type TransferToJarUpdated = {
  type: 'TO_JAR_UPDATED';
  payload: Jar;
};

type Action = TransferFromJarUpdated | TransferToJarUpdated;
