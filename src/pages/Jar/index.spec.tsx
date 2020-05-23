/* eslint-disable */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppStore, configureStore } from '../../store';
import JarPage from './[jarId]';
import { renderSetup } from '../../../test-utils';

describe('<JarPage />', () => {
  const jarMock = {
    id: 1,
    balance: 0,
    currency: 'PLN',
    isDefault: false,
  };

  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      jars: [jarMock as any],
    });
  });

  describe('when adds funds to jar', () => {
    it('should update jar balance and display transaction', async () => {
      const fundsMock = '300';
      renderSetup(<JarPage />, { store, query: { jarId: jarMock.id } });

      const initialBalance = screen.getByRole('heading', {
        name: `Saldo: 0 ${jarMock.currency}`,
      });
      expect(initialBalance).toBeTruthy();

      const addFundsInput = screen.getByRole('spinbutton', { name: /Wpłać środki/i });
      fireEvent.input(addFundsInput, { target: { value: '' } });
      await userEvent.type(addFundsInput, fundsMock);

      const addFundsSubmitButton = screen.getByRole('button', { name: /Wpłać/i });
      userEvent.click(addFundsSubmitButton);

      const updatedBalance = screen.getByRole('heading', {
        name: `Saldo: ${fundsMock} ${jarMock.currency}`,
      });
      const transactionRow = screen.getByRole('cell', { name: /Wpłata środków/i });

      expect(updatedBalance).toBeTruthy();
      expect(transactionRow).toBeTruthy();
    });
  });
});
