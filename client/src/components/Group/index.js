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
import {getNotesByGroup, getNoteByID, saveNote, createNote} from "../../api/notes"
import {Value} from "slate"
import NoNote from "./components/NoNote"
import {DefaultButton, Dialog, DialogFooter, PrimaryButton, DialogType, TextField} from "office-ui-fabric-react"

class Group extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectLogout: false,
            showNoteBrowser: false,
            hideNewNoteDialog: true,
            notes: [],
            newNoteName: '',
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
        this.hideNewNoteDialog = this.hideNewNoteDialog.bind(this);
        this.noteSelected = this.noteSelected.bind(this);
        this.onNewNoteClick = this.onNewNoteClick.bind(this);
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

    onNewNoteClick() {
        this.setState({
            hideNewNoteDialog: false
        })
    }

    hideNewNoteDialog() {
        this.setState({
            hideNewNoteDialog: true
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
        saveNote(this.state.activeNoteID, JSON.stringify(this.state.value), data => {
            console.log(data);
        });
    }

    noteSelected(noteID) {
        getNoteByID(noteID, note => {
            this.setState({
                value: Value.fromJSON(JSON.parse(note.document)),
                activeNoteID: noteID
            })
        });
    }

    onChange = ({value}) => {
        this.setState({value})
    }

    onNewNodeNameChanged = (value) => {
        this.setState({ newNoteName: value })
    }

    onCreateNewNoteClicked = () => {
        if(this.state.newNoteName !== '') {
            createNote(this.state.newNoteName, this.props.groupID, note => {
                console.log(note)
                this.setState({
                    hideNewNoteDialog: true
                })
            });
        }
    }

    render() {
        if (this.state.redirectLogout) {
            return <Redirect to={{
                pathname: '/login'
            }}/>;
        }

        var noteWindow = this.state.activeNoteID === undefined ?
            <NoNote/> : <Note ref={(editor) => {
                this._editor = editor;
            }} value={this.state.value} onChange={this.onChange}/>;

        return <div className="main">
            <NavBar
                onOpenClick={this.onOpenClick}
                onSaveClick={this.onSaveClick}
                onNewNoteClick={this.onNewNoteClick}
                onLogoutClick={this.onLogoutClick}/>
            <div className="group">
                <NoteBrowser
                    notes={this.state.notes}
                    noteSelected={this.noteSelected}
                    groupID={this.props.groupID}
                    showNoteBrowser={this.state.showNoteBrowser}
                    hideNoteBrowser={this.hideNoteBrowser}/>
                {noteWindow}
                <div className="sidebar">
                    <Pivot>
                        <PivotItem headerText="Comments" itemIcon="FileComment">
                            <Comments/>
                        </PivotItem>
                        <PivotItem headerText="Chat" itemIcon="Chat">
                            <Chat/>
                        </PivotItem>
                    </Pivot>
                </div>
            </div>
            <Dialog
                hidden={this.state.hideNewNoteDialog}
                onDismiss={this._closeDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'New Note'
                }}
                modalProps={{
                    titleAriaId: this._labelId,
                    subtitleAriaId: this._subTextId,
                    isBlocking: false,
                    containerClassName: 'ms-dialogMainOverride'
                }}
            >
                <TextField onChanged={(value) => this.onNewNodeNameChanged(value)} label="Enter a title for your new note:" />
                <DialogFooter>
                    <PrimaryButton onClick={() => this.onCreateNewNoteClicked()} text="Create" />
                    <DefaultButton onClick={this.hideNewNoteDialog} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </div>
    }
}

export default Group
