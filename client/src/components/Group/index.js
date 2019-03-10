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
import {getNotesByGroup, getNoteByID, saveNote} from "../../api/notes"
import {Value} from "slate"

class Group extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectLogout: false,
            showNoteBrowser: false,
            notes: [],
            activeNoteID: undefined,
            value: Value.fromJSON({
                document: {
                    nodes: [
                        {
                            object: 'block',
                            type: 'paragraph',
                            nodes: [
                                {
                                    object: 'text',
                                    leaves: [
                                        {
                                            text: "REPLACE THIS"
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            })
        }

        this.onOpenClick = this.onOpenClick.bind(this);
        this.hideNoteBrowser = this.hideNoteBrowser.bind(this);
        this.noteSelected = this.noteSelected.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onOpenClick() {
        getNotesByGroup(this.props.groupID, notes => {
            this.setState({
                notes: notes.map((note) => {
                    console.log(note.createdBy)
                    return {id: note._id, name: note.name, value: note._id, created_by: note.createdBy};
                }),
                showNoteBrowser: true
            })
        });
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

    onSaveClick() {
        console.log("activeNoteID=" + this.state.activeNoteID);
        saveNote(this.state.activeNoteID, JSON.stringify(this.state.value), data => {
            console.log(data);
        });
    }

    noteSelected(noteID) {
        console.log("activeNoteID=" + noteID);
        getNoteByID(noteID, note => {
            console.log(note);
            this.setState({
                value: Value.fromJSON(JSON.parse(note.document)),
                activeNoteID: noteID
            })
        });
    }

    onChange = ({value}) => {
        this.setState({value})
    }

    render() {
        if (this.state.redirectLogout) {
            return <Redirect to={{
                pathname: '/login'
            }}/>;
        }
        return <div className="main">
            <NavBar onOpenClick={this.onOpenClick} onSaveClick={this.onSaveClick} onLogoutClick={this.onLogoutClick}/>
            <div className="group">
                <NoteBrowser
                    notes={this.state.notes}
                    noteSelected={this.noteSelected}
                    groupID={this.props.groupID}
                    showNoteBrowser={this.state.showNoteBrowser}
                    hideNoteBrowser={this.hideNoteBrowser}/>
                <Note ref={(editor) => {
                    this._editor = editor;
                }} value={this.state.value} onChange={this.onChange}/>
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
