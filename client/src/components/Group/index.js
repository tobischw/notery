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

import {
    getNotesByGroup,
    getNoteByID,
    saveNote,
    createNote,
    getComments,
    updateComments,
    newComment
} from "../../api/notes"

import {Value} from "slate"
import NoNote from "./components/NoNote"
import {DefaultButton, Dialog, DialogFooter, PrimaryButton, DialogType, TextField, Label} from "office-ui-fabric-react"

const EMPTY_DOCUMENT = Value.fromJSON({
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
                                text: ""
                            },
                        ],
                    },
                ],
            },
        ],
    },
});

class Group extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectLogout: false,
            showNoteBrowser: false,
            hideNewNoteDialog: true,
            currentQuote: '',
            currentComment: '',
            hideAddQuoteDialog: true,
            notes: [],
            comments: [],
            newNoteName: '',
            activeNoteID: undefined,
            value: EMPTY_DOCUMENT,
            browseDisabled: true
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
                activeNoteID: noteID,
                showNoteBrowser: false
            })
        });
        getComments(noteID, data => {
            this.setState({
                comments: data.comments
            })
        });
        updateComments(noteID, data => {
            this.setState(prevState => ({
                comments: [...prevState.comments, data]
            }))
        });
    }

    onChange = ({value}) => {
        this.setState({value})
    }

    onNewNodeNameChanged = (value) => {
        this.setState({newNoteName: value})
    }

    onCreateNewNoteClicked = () => {
        if (this.state.newNoteName !== '') {
            createNote(this.state.newNoteName, this.props.groupID, note => {
                this.setState({
                    hideNewNoteDialog: true,
                    activeNoteID: note._id,
                    value: EMPTY_DOCUMENT
                })
            });
        }
    }

    onAddQuoteClicked = (text) => {
        this.setState({
            hideAddQuoteDialog: false,
            currentQuote: text
        })
    }

    onAddQuoteSubmit = () => {
        if(this.state.currentComment !== '' && this.state.currentQuote !== '') {
            newComment(this.state.activeNoteID, this.state.currentComment, this.state.currentQuote, comment => {
                this.setState({
                    hideAddQuoteDialog: true,
                })
            });
        } else {
            alert('Comment/Quote cannot be empty.')
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.groupID !== this.props.groupID) {
            this.setState({
                activeNoteID: undefined
            })
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
            }} value={this.state.value} onAddQuoteClicked={this.onAddQuoteClicked} onChange={this.onChange}/>;

        return <div className="main">
            <NavBar
                toolbarEnabled={this.props.groupID === undefined}
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
                    <Pivot defaultSelectedIndex={1}>
                        <PivotItem headerText="Comments" itemIcon="FileComment">
                            <Comments comments={this.state.comments}/>
                        </PivotItem>
                        <PivotItem headerText="Chat" itemIcon="Chat">
                            <Chat/>
                        </PivotItem>
                    </Pivot>
                </div>
            </div>
            <Dialog
                hidden={this.state.hideNewNoteDialog}
                onDismiss={this.hideNewNoteDialog}
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
                <TextField onChanged={(value) => this.onNewNodeNameChanged(value)}
                           label="Enter a title for your new note:"/>
                <DialogFooter>
                    <PrimaryButton onClick={() => this.onCreateNewNoteClicked()} text="Create"/>
                    <DefaultButton onClick={this.hideNewNoteDialog} text="Cancel"/>
                </DialogFooter>
            </Dialog>
            <Dialog
                hidden={this.state.hideAddQuoteDialog}
                onDismiss={this.hideAddQuoteDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Add Quote'
                }}
                modalProps={{
                    titleAriaId: this._labelId,
                    subtitleAriaId: this._subTextId,
                    isBlocking: false,
                    containerClassName: 'ms-dialogMainOverride'
                }}
            >
                <Label>{this.state.currentQuote}</Label>
                <TextField onChanged={(value) => {
                    this.setState({
                        currentComment: value
                    })
                }} label="Comment:" multiline rows={4}/>
                <DialogFooter>
                    <PrimaryButton onClick={() => this.onAddQuoteSubmit()} text="Submit"/>
                    <DefaultButton onClick={() => { this.setState({ hideAddQuoteDialog: true})}} text="Cancel"/>
                </DialogFooter>
            </Dialog>
        </div>
    }
}

export default Group
