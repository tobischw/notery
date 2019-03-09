import React, { Component } from 'react';

import NavBar from '../NavBar'
import GroupsSidebar from '../GroupsSidebar'

import './index.css';
import Group from "../Group"

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar/>
          <div className="body">
              <GroupsSidebar/>
              <Group/>
          </div>
      </div>
    );
  }
}

export default App;
