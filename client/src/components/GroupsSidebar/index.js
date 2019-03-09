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
                {
                    id: 0,
                    color: "#ff564d",
                    label: "CS340"
                },
                {
                    id: 1,
                    color: "#4288ff",
                    label: "CS330"
                },
                {
                    id: 2,
                    color: "#ff365e",
                    label: "OCI"
                },
                {
                    id: 3,
                    color: "#2d9c62",
                    label: "ACS150"
                }
            ]
        }
    }

    componentDidMount() {
        getGroups((data) => {
            console.log(data);
        });
    }

    render() {
        const groups = this.state.groups.map((group, key) =>
            <li key={key}><Link to={"/group/" + group.id}><Persona coinSize={64} hidePersonaDetails={true}
                                                         initialsColor={group.color}
                                             imageInitials={group.label}/></Link></li>
        );
        return <div className="sidebar">
            <ul>
                {groups}
            </ul>
        </div>
    }
}

export default GroupsSidebar
