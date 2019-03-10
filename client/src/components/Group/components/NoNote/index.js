import React, {Component} from 'react';

import './index.css';
import logo from '../../../../resources/logo-small.png';

class NoNote extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <div className="no-note">
            <div className="help-box">
                <img src={logo}/>
                <p>Press <strong>"+"</strong> to join or create a group. Or select a group from the left
                    and press <strong>"Browse Notes"</strong> to see<br/> existing notes, or press <strong>"New"</strong> to
                    create a new note.</p>
            </div>
        </div>
    }
}

export default NoNote
