import React, {Component} from 'react';

import './index.css';

import {Icon} from 'office-ui-fabric-react/lib/Icon';
import {Persona} from 'office-ui-fabric-react/lib/Persona';
import Link from "react-router-dom/es/Link"
import {getGroups} from "../../api/groups"
import NavLink from "react-router-dom/es/NavLink"
import Redirect from "react-router/es/Redirect"
import {DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, TextField} from "office-ui-fabric-react"

class GroupsSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            hideJoinGroupDialog: true
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
                <li className="join-group" onClick={() => { this.setState({hideJoinGroupDialog:false})}}><Persona coinSize={60} hidePersonaDetails={true}
                                                                   initialsColor="#37477a"
                                                                   imageInitials="+"/></li>
            </ul>
            <Dialog
                hidden={this.state.hideJoinGroupDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Join Group'
                }}
                modalProps={{
                    isBlocking: false,
                    containerClassName: 'ms-dialogMainOverride'
                }}
            >
                <TextField onChanged={(value) => this.onNewNodeNameChanged(value)} label="Enter the secret ID of the group:" />
                <DialogFooter>
                    <PrimaryButton onClick={() => alert('Join')} text="Join" />
                    <DefaultButton onClick={() => { this.setState({hideJoinGroupDialog:true})}} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </div>
    }
}

export default GroupsSidebar
