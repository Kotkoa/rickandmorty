import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'src/components/Home.js';
import Welcome from 'src/components/Welcome.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Welcome />} />
        <Route path="/home" component={() => <Home />} />
      </Switch>
    </Router>
  );
}

export default App;
