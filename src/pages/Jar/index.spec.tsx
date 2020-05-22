import { AppStore, configureStore } from '../../store';
import { Provider as StoreProvider } from 'react-redux';
import JarPage from './[jarId]';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let store: AppStore;

beforeEach(() => {
  store = configureStore();
});

const renderWithStore = () => (
  <StoreProvider store={store}>
    <JarPage />
  </StoreProvider>
);

describe('<JarPage />', () => {
  it('adding funds should work', async () => {
    const fundsMock = '300';
    render(renderWithStore());

    const initialBalance = screen.queryByText(`Saldo: 0 PLN`);
    expect(initialBalance).toBeTruthy();

    const addFundsInput = screen.getByRole('textbox', { name: /Wpłać środki/i });
    await userEvent.type(addFundsInput, fundsMock);

    const addFundsSubmitButton = screen.getByRole('button', { name: /Wpłać/i });
    userEvent.click(addFundsSubmitButton);

    const updatedBalance = screen.getByText(`Saldo: ${fundsMock} PLN`);
    expect(updatedBalance).toBeTruthy();
  });
});
