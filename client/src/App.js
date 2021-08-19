import React, { Component,Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import CenterMain from "./components/center/CenterMain";
import Navbar from "./components/navbar/Navbar";
import StateMain from "./components/state/StateMain";
import ContractState from './context/contract/ContractState';


class App extends Component {

  render() {
    return (
      <ContractState>
        <Router>
              <Fragment>
                <Navbar />
                  <Switch>
                    <Route exact path="/" component={CenterMain} />
                    <Route exact path="/state" component={StateMain}  />
                  </Switch>
              </Fragment>
        </Router>
      </ContractState>
    );
  }
}

export default App;
