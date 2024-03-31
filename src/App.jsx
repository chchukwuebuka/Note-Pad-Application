import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import NotePad from './components/notePad';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Notepad Application</h1>
        <NotePad/>
      </div>
    </Provider>
  );
}

export default App;
