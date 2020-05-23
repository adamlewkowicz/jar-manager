import type { AppState } from './modules';

export const initialState: Partial<AppState> = {
  jars: [
    {
      id: 1,
      balance: 1000,
      currency: 'PLN',
      isDefault: true,
    },
    {
      id: 2,
      balance: 1500,
      currency: 'PLN',
      isDefault: false,
    },
  ],
};
