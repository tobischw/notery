import React, {Component} from 'react';

import './index.css';

class Note extends Component {
    render() {
        return <div className="note">
            Group ID: {this.props.content}
        </div>
    }
}

export default Note
