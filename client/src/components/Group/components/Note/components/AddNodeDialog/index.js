import React, { Component } from 'react';

class Index extends Component {
    render() {
        return <Dialog
            hidden={this.props.addNodeHidden}
            onDismiss={this.props.hideAddNode}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'All emails together',
                subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
            }}
            modalProps={{
                titleAriaId: this._labelId,
                subtitleAriaId: this._subTextId,
                isBlocking: false,
                containerClassName: 'ms-dialogMainOverride'
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={this._closeDialog} text="Add" />
                <DefaultButton onClick={this._closeDialog} text="Cancel" />
            </DialogFooter>
        </Dialog>
    }
}

export default Index
