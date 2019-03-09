import React, {Component} from 'react';

import './index.css';

import {PivotItem, Pivot} from 'office-ui-fabric-react/lib/Pivot';
import Comments from "./components/Comments"
import Chat from "./components/Chat"
import Note from "./components/Note"
import NavBar from "./components/NavBar"
import NoteBrowser from "./components/NoteBrowser"

import {auth} from "../../auth"
import {Redirect} from "react-router-dom"

class Group extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectLogout: false,
            showNoteBrowser: false
        }

        this.onOpenClick = this.onOpenClick.bind(this);
        this.hideNoteBrowser = this.hideNoteBrowser.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onOpenClick() {
        this.setState({
            showNoteBrowser: true
        })
    }

    hideNoteBrowser() {
        this.setState({
            showNoteBrowser: false
        })
    }

    onLogoutClick() {
        auth.logout();
        this.setState({redirectLogout: true});
    }

    render() {
        if (this.state.redirectLogout) {
            return <Redirect to={{
                pathname: '/login'
            }}/>;
        }
        return <div className="main">
            <NavBar onOpenClick={this.onOpenClick} onLogoutClick={this.onLogoutClick}/>
            <div className="group">
                <NoteBrowser showNoteBrowser={this.state.showNoteBrowser} hideNoteBrowser={this.hideNoteBrowser}/>
                <Note ref={(editor) => { this._editor = editor; }} content={this.props.groupID}/>
                <div className="sidebar">
                    <Pivot>
                        <PivotItem headerText="Comments" itemIcon="FileComment">
                            <Comments/>
                        </PivotItem>
                        <PivotItem headerText="Chat" itemCount={42} itemIcon="Chat">
                            <Chat/>
                        </PivotItem>
                    </Pivot>
                </div>
            </div>
        </div>
    }
}

export default Group
