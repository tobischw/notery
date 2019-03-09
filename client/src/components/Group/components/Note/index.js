import React, {Component} from 'react';

import './index.css';

import { Editor } from 'slate-react'
import { Value } from 'slate'
import {CommandBar} from "office-ui-fabric-react"

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

    renderMark = (props, editor, next) => {
        const { children, mark, attributes } = props

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
                return next()
        }
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return <div className="note">
                <CommandBar
                    className="toolbar"
                    items={[
                        {
                            key: 'Bold',
                            iconProps: {
                                iconName: 'Bold'
                            },
                        },
                        {
                            key: 'Italics',
                            iconProps: {
                                iconName: 'Italic'
                            },
                        },
                        {
                            key: 'Underline',
                            iconProps: {
                                iconName: 'Underline'
                            },
                        },
                        {
                            key: 'Header1',
                            iconProps: {
                                iconName: 'Header1'
                            },
                        },
                        {
                            key: 'Header2',
                            iconProps: {
                                iconName: 'Header2'
                            },
                        },
                    ]
                    }
                    ariaLabel={'Use left and right arrow keys to navigate between commands'}
                />
            <Editor
                className="notepad"
                value={this.state.value}
                renderMark={this.renderMark}
                onChange={this.onChange} />
        </div>
    }
}

export default Note
