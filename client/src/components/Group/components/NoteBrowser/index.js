import React, {Component} from 'react';

import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';

import './index.css';
import {DetailsList, DetailsListLayoutMode} from "office-ui-fabric-react"
import {getGroups} from "../../../../api/groups"
import {getNotes, getNotesByGroup} from "../../../../api/notes"

class NoteBrowser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    componentDidUpdate() {
        console.log('note browser ' + this.props.groupID)
        getNotesByGroup(this.props.groupID, data => {
            console.log("result " + data);
        });
    }

    noteSelected = () => {
        alert('selected')
    }

    render() {
        return <Panel
            isOpen={this.props.showNoteBrowser}
            onDismiss={this.props.hideNoteBrowser}
            type={PanelType.smallFluid}
            headerText={"Select Note"}
        >
            <DetailsList
                items={this.state.notes}
                columns={[
                    {
                        key: 'column1',
                        name: 'Name',
                        fieldName: 'name',
                        isRowHeader: true,
                        isResizable: true,
                        data: 'string'
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
                onItemInvoked={this.noteSelected}
            />
        </Panel>
    }
}

export default NoteBrowser
