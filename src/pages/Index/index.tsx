import React from 'react';
import css from './index.module.scss';
import { useSelector } from 'react-redux';
import { getJarsWithTransactions } from '../../store/modules/jars/selectors';
import { Tile } from 'carbon-components-react';
import { getTransactions } from '../../store/modules/transactions/selectors';
import { AllTransactionsTable } from '../../components/AllTransactionsTable';
import Link from 'next/link';

interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
  const jars = useSelector(getJarsWithTransactions);
  const transactions = useSelector(getTransactions);

  return (
    <>
      Słoiki
      <div className={css.container}>
        {jars.map((jar) => (
          <Tile key={jar.id}>
            Słoik {jar.id} - {jar.balance} {jar.currency}
            <p>Liczba transakcji: {jar.transactions.length}</p>
            <Link href="/jar/[jarId]" as={`/jar/${jar.id}`}>
              Pokaż
            </Link>
          </Tile>
        ))}
      </div>
      <AllTransactionsTable transactions={transactions} />
    </>
  );
};

export default HomePage;
