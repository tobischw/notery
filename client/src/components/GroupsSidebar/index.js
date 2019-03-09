import React, {Component} from 'react';

import './index.css';

import {Icon} from 'office-ui-fabric-react/lib/Icon';
import {Persona} from 'office-ui-fabric-react/lib/Persona';

class GroupsSidebar extends Component {
    render() {
        return <div className="sidebar">
            <ul>
                <li className="personal"><Icon iconName="FolderQuery"/></li>
                <li><Persona coinSize={64} hidePersonaDetails={true} imageInitials={"CS340"}/></li>
                <li><Persona coinSize={64} hidePersonaDetails={true} initialsColor={"#ff564d"} imageInitials={"OCI"}/>
                </li>
                <li><Persona coinSize={64} hidePersonaDetails={true} initialsColor={"#2d9c62"} imageInitials={"CS330"}/>
                </li>
            </ul>
        </div>
    }
}

export default GroupsSidebar
