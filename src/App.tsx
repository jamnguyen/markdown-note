import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import NotesPage from './pages/NotesPage';

const App: React.FC = () => (
  <Provider store={store}>
    <NotesPage />
  </Provider>
);

export default App;
