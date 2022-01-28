import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import IndexPage from './components/IndexPage';

import './styles.css';

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <IndexPage />
  </QueryClientProvider>,
  document.getElementById('index')
);
