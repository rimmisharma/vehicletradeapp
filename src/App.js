import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DealerPage from './DealerPage';
import VehiclePage from './VehiclePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dealer/:id" component={DealerPage}/>
        <Route exact path="/vehicle/:id" component={VehiclePage}/>
      </Switch>
    </Router>
  );
}

export default App;
