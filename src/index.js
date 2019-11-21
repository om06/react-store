import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Create from './components/Create';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/create' component={Create} />
      </div>
  </Router>,
  document.getElementById('root')
);
serviceWorker();