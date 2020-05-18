import React, { useEffect, useState } from 'react';
import css from './index.module.scss';

export const HomePage = () => {
  const [todo, setTodo] = useState<any>();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/13')
      .then((response) => response.json())
      .then(setTodo);
  }, []);

  return (
    <main className={css.container}>
      Welcome {JSON.stringify(todo)}
    </main>
  );
};

export default HomePage;
