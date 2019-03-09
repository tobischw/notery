import React, {Component} from 'react';

import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';

import './index.css';
import {DetailsList, DetailsListLayoutMode, SelectionMode} from "office-ui-fabric-react"
import {getNotes} from "../../../../api/notes"

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NoteBrowser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Panel
            isOpen={this.props.showNoteBrowser}
            onDismiss={this.props.hideNoteBrowser}
            type={PanelType.smallFixedNear}
            headerText="Select Note"
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
                            return (<Link key={note} to={ "/group/" + this.props.groupID + "/" + note.id }>{note.name}</Link>)
                        }
                    }, {
                        key: 'column2',
                        name: 'Created By',
                        fieldName: 'createdBy',
                        isRowHeader: true,
                        isResizable: true,
                        data: 'string'
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
