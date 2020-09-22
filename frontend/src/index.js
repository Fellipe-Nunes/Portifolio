import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import Router from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <React.Fragment>
    <Router />
  </React.Fragment>,
  document.getElementById('root')
);


