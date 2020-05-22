import IndexPage from '.';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderSetup } from '../../../test-utils';

describe('<IndexPage />', () => {
  it('creating new jar should work', async () => {
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

    // const fundsText = screen.queryByText(`${fundsFake} PLN`);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
