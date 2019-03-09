import React, {Component} from 'react';

class HoverMenu extends React.Component {
    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        const { className, innerRef } = this.props
        const root = window.document.getElementById('root')

        return ReactDOM.createPortal(
            <StyledMenu className={className} innerRef={innerRef}>
                {this.renderMarkButton('bold', 'format_bold')}
                {this.renderMarkButton('italic', 'format_italic')}
                {this.renderMarkButton('underlined', 'format_underlined')}
                {this.renderMarkButton('code', 'code')}
            </StyledMenu>,
            root
        )
    }

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton(type, icon) {
        const { editor } = this.props
        const { value } = editor
        const isActive = value.activeMarks.some(mark => mark.type === type)
        return (
            <Button
                reversed
                active={isActive}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <Icon>{icon}</Icon>
            </Button>
        )
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark(event, type) {
        const { editor } = this.props
        event.preventDefault()
        editor.toggleMark(type)
    }
}
