import { css, Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';

const globalCss = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
  }
  body {
    margin: 0;
    font-family: Roboto, 'Helvetica Neue', sans-serif;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
  }
`;

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <Global styles={globalCss} />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
