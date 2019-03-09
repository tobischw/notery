import React, { Component } from 'react';

import './index.css';

import { Persona } from 'office-ui-fabric-react/lib/Persona';

class GroupsSidebar extends Component {
    render() {
        return <div className="sidebar">
            <ul>
                <li><Persona imageInitials="TS"/></li>
                <li>test</li>
            </ul>
        </div>
    }
}

export default GroupsSidebar
