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
                                text: '',
                            },
                        ],
                    },
                ],
            },
        ],
    }
});

const DEFAULT_NODE = 'paragraph'

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: initialValue,
        }

        this.editor = React.createRef();
        this.onClickMark = this.onClickMark.bind(this);
    }

    onClickMark = (type) => {
        this.editor.current.toggleMark(type);
    }

    hasMark = type => {
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type === type)
    }

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type === type)
    }

    onClickBlock = (type) => {
        const { editor } = this.editor.current
        const { value } = editor
        const { document } = value

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                editor
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
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

    renderNode = (props, editor, next) => {
        const { attributes, children, node } = props

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
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
                            onClick: () => this.onClickMark('bold')
                        },
                        {
                            key: 'Italics',
                            iconProps: {
                                iconName: 'Italic'
                            },
                            onClick: () => this.onClickMark('italic')
                        },
                        {
                            key: 'Underline',
                            iconProps: {
                                iconName: 'Underline'
                            },
                            onClick: () => this.onClickMark('underlined')
                        },
                        {
                            key: 'Header1',
                            iconProps: {
                                iconName: 'Header1'
                            },
                            onClick: () => this.onClickBlock('heading-one')
                        },
                        {
                            key: 'Header2',
                            iconProps: {
                                iconName: 'Header2'
                            },
                            onClick: () => this.onClickBlock('heading-two')
                        },
                        {
                            key: 'BulletList',
                            iconProps: {
                                iconName: 'BulletedList2'
                            },
                            onClick: () => this.onClickBlock('bulleted-list')
                        },
                        {
                            key: 'NumberedList',
                            iconProps: {
                                iconName: 'NumberedList'
                            },
                            onClick: () => this.onClickBlock('numbered-list')
                        },
                    ]
                    }
                    ariaLabel={'Use left and right arrow keys to navigate between commands'}
                />
            <Editor
                ref={this.editor}
                className="notepad"
                value={this.state.value}
                renderMark={this.renderMark}
                renderNode={this.renderNode}
                onChange={this.onChange} />
        </div>
    }
}

export default Note
