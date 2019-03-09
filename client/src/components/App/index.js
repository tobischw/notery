import React, {Component} from 'react';

import GroupsSidebar from '../GroupsSidebar'

import './index.css';
import Group from "../Group"

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var groupId = this.props.match.params.group === null ? 0 : this.props.match.params.group;
        return (
            <div className="App">
                <div className="body">
                    <GroupsSidebar/>
                    <Group groupID={groupId}/>
                </div>
            </div>
        );
    }
}

export default App;
