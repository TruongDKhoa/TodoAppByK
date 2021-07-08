import React from 'react';
import { Provider } from 'react-redux';

import TodoList from './components/todoList';
import configureStore from './redux/store/configureStore';

const store = configureStore({});

export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}