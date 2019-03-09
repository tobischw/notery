import React, {Component} from 'react';

import './index.css';

import {Label} from 'office-ui-fabric-react/lib/Label';
import {PivotItem, IPivotItemProps, Pivot} from 'office-ui-fabric-react/lib/Pivot';
import Comments from "./components/Comments"
import Chat from "./components/Chat"
import Note from "./components/Note"

class Group extends Component {
    render() {
        return <div className="group">
            <Note/>
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
    }
}

export default Group
