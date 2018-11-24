import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import Base from './Base'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Header />
            <Base />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
