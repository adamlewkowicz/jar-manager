import { AppStore, configureStore } from '../../store';
import { Provider as StoreProvider } from 'react-redux';
import IndexPage from '.';
import { render, screen } from '@testing-library/react';
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
  it('should create new jar', async () => {
    const fundsFake = 300;
    render(renderWithStore());

    const createJarModalButton = screen.getByRole('button', {
      name: /Utwórz słoik/i,
    });
    userEvent.click(createJarModalButton);

    const jarFundsInput = screen.getByRole('textbox', {
      name: /Środki/i,
    });
    await userEvent.type(jarFundsInput, String(fundsFake));

    const createJarButton = screen.getByRole('button', {
      name: /Utwórz/i,
    });
    userEvent.click(createJarButton);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
