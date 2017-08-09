import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { browserHistory } from 'react-router';
import LoginPage from './components/signin';
import CreateAccount from './components/signup';
import Routes from './routes';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

 if (window.sessionStorage.getItem('id'))
   ReactDOM.render(
 <Routes history={browserHistory} />,
   document.getElementById('root')
 );
 else
  ReactDOM.render(
   
      <App />,
  document.getElementById('root')
  );
registerServiceWorker();
