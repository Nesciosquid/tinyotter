import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { TinyOtterApp } from './components/app.jsx';
import { updateWords } from './reducers/index.js';

const getWordsFromDatabase = (targetStore) => {
  const request = new XMLHttpRequest();
  request.open('GET', 'http://api.tinyotter.com/getWordCounts', true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const resp = JSON.parse(request.responseText);
      targetStore.dispatch({
        type: 'SET_WORDS',
        words: resp.word_counts,
      });
    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = () => {
    // There was a connection error of some sort
    Error.log('something went wrong!');
  };
  request.send();
};

const store = createStore(updateWords);

const updateReact = () => {
  ReactDOM.render(
    <Provider store={store}>
      <TinyOtterApp />
    </Provider>,
    document.getElementById('reactContainer')
  );
};

store.subscribe(updateReact);
updateReact();
getWordsFromDatabase(store);
