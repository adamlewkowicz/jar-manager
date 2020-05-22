import { AppStore, configureStore } from '../../store';
import { Provider as StoreProvider } from 'react-redux';
import IndexPage from '.';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let store: AppStore;

beforeEach(() => {
  store = configureStore();
});

const renderWithStore = () => (
  <StoreProvider store={store}>
    <IndexPage />
  </StoreProvider>
);

describe('<IndexPage />', () => {
  it('creating new jar should work', async () => {
    const fundsFake = '300';
    render(renderWithStore());

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
