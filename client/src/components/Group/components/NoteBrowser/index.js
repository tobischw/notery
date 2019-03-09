import React, {Component} from 'react';

import {Panel, PanelType} from 'office-ui-fabric-react/lib/Panel';

import './index.css';
import {DetailsList, DetailsListLayoutMode,SelectionMode} from "office-ui-fabric-react"

class NoteBrowser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Panel
            isOpen={this.props.showNoteBrowser}
            onDismiss={this.props.hideNoteBrowser}
            type={PanelType.smallFixedNear}
            headerText="Notes"
        >
            <DetailsList
                items={[
                    {}
                ]}
                columns={[
                    {
                        key: 'column1',
                        name: 'File Type',
                        ariaLabel: 'Column operations for File type, Press to sort on File type',
                        iconName: 'Page',
                        isIconOnly: true,
                        fieldName: 'name',
                        minWidth: 16,
                        maxWidth: 16,
                        onRender: (item) => {
                            return <img src={item.iconName} alt={item.fileType + ' file icon'} />;
                        }
                    },
                    {
                        key: 'column2',
                        name: 'Name',
                        fieldName: 'name',
                        isRowHeader: true,
                        isResizable: true,
                        data: 'string'
                    }]}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
            />
        </Panel>
    }
}

export default NoteBrowser
