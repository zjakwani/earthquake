import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { client } from './client'
import { ApolloProvider } from '@apollo/client'
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
