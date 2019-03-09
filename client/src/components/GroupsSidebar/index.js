import React, {Component} from 'react';

import './index.css';

import {Icon} from 'office-ui-fabric-react/lib/Icon';
import {Persona} from 'office-ui-fabric-react/lib/Persona';
import Link from "react-router-dom/es/Link"
import {getGroups} from "../../api/groups"

class GroupsSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [
            ]
        }
    }

    componentDidMount() {
        getGroups(data => {
            console.log(data)
            this.setState( {
                groups: data.groups
            })
        });
    }

    render() {
        const groups = this.state.groups.map((group, key) =>
            <li key={key}><Link to={"/group/" + group._id}><Persona coinSize={60} hidePersonaDetails={true}
                                                                   initialsColor={group.color}
                                                                   imageInitials={group.shortname}/></Link></li>
        );
        return <div className="sidebar">
            <ul>
                <li className="personal"><Link to={"#"}><Icon iconName="FolderList"/></Link></li>
                {groups}
            </ul>
        </div>
    }
}

export default GroupsSidebar
