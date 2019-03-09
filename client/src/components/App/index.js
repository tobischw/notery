import React, {Component} from 'react';

import NavBar from '../NavBar'
import GroupsSidebar from '../GroupsSidebar'

import './index.css';
import Group from "../Group"

import {auth} from '../../auth';

class App extends Component {

    constructor(props) {
        super(props);
    }

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
