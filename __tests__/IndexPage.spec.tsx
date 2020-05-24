/* eslint-disable */
import React from 'react';
import { describe, it } from '@jest/globals';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IndexPage } from '../src/pages/index/index';
import { renderSetup } from '../test-utils';

describe('<IndexPage />', () => {
  describe('when creates new jar', () => {
    it('should display created jar', async () => {
      const fundsFake = '300';
      renderSetup(<IndexPage />);

      const createJarModalButton = screen.getByRole('button', { name: /Utwórz słoik/i });
      userEvent.click(createJarModalButton);

      const createJarModal = screen.getByRole('dialog', {
        name: /Tworzenie nowego słoika/i,
      });

      const jarFundsInput = await within(createJarModal).findByRole('spinbutton', {
        name: /Środki/i,
      });
      await userEvent.type(jarFundsInput, fundsFake);

      const createJarButton = within(createJarModal).getByRole('button', {
        name: /Utwórz/i,
      });
      userEvent.click(createJarButton);

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });
});
