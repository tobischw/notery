import React, {Component} from 'react';

import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';

import './index.css';
import {DetailsList, DetailsListLayoutMode, SelectionMode} from "office-ui-fabric-react"
import {getNotes} from "../../../../api/notes"

import {Link} from "react-router-dom";

class NoteBrowser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Panel
            isOpen={this.props.showNoteBrowser}
            onDismiss={this.props.hideNoteBrowser}
            type={PanelType.medium}
            headerText="Browse Notes"
        >
            <DetailsList
                items={this.props.notes}
                columns={[
                    {
                        key: 'column1',
                        name: 'Name',
                        fieldName: 'name',
                        isRowHeader: true,
                        isResizable: true,
                        data: 'string',
                        onRender: (note) => {
                            return (
                                <Link key={note} to={"#"} onClick={() => {
                                    this.props.noteSelected(note.id)
                                }}>{note.name}</Link>)
                        }
                    }, {
                        key: 'column2',
                        name: 'Created By',
                        fieldName: 'createdBy',
                        isRowHeader: true,
                        isResizable: true,
                        data: 'string',
                        onRender: (note) => {
                            return (
                                <span>{note.created_by.firstname} {note.created_by.lastname}</span>)
                        }
                    }]}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                selectionMode={SelectionMode.none}
                onItemInvoked={this.noteSelected}
            />
        </Panel>
    }
}

export default NoteBrowser
