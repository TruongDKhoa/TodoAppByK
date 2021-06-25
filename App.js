import React from 'react';
import { Provider } from 'react-redux';

import TodoListContainer from './redux/containers/todoListContainer';
import configureStore from './redux/store/configureStore';

const store = configureStore({});

export default function App() {
  return (
    <Provider store={store}>
      <TodoListContainer />
    </Provider>
  );
}