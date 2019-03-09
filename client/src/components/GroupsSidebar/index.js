import React, {Component} from 'react';

import './index.css';

import {Icon} from 'office-ui-fabric-react/lib/Icon';
import {Persona} from 'office-ui-fabric-react/lib/Persona';
import Link from "react-router-dom/es/Link"
import {getGroups} from "../../api/groups"
import NavLink from "react-router-dom/es/NavLink"

class GroupsSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    componentDidMount() {
        getGroups(data => {
            this.setState({
                groups: data.groups
            })
        });
    }

    render() {
        const groups = this.state.groups.map((group, key) =>
            <NavLink key={key} activeClassName='is-active' to={"/group/" + group._id}>
                <li key={key}><Persona coinSize={60}
                                       hidePersonaDetails={true}
                                       initialsColor={group.color}
                                       imageInitials={group.shortname}/>
                </li>
            </NavLink>
        );
        return <div className="sidebar">
            <ul>
                <li className="personal"><Link to={"#"}><Icon iconName="FolderList"/></Link></li>
                {groups}
                <li className="join-group"><Link to={"#"}><Persona coinSize={60} hidePersonaDetails={true}
                                                                   initialsColor="#37477a"
                                                                   imageInitials="+"/></Link></li>
            </ul>
        </div>
    }
}

export default GroupsSidebar
