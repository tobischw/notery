import React, {Component} from 'react';

import './index.css';

import { Editor } from 'slate-react'
import { Value } from 'slate'


const initialValue = Value.fromJSON({
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
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    }
});

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: initialValue,
        }
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return <div className="note">
            <Editor className="notepad" value={this.state.value} onChange={this.onChange} />
            {/*Note here {this.props.content}*/}
        </div>
    }
}

export default Note
