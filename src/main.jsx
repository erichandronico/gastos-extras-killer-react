import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query' 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import './index.css'

export const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={ client }>
    <ReactQueryDevtools />
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
  </QueryClientProvider>

)


