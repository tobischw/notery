import React, {Component} from 'react';

import './index.css';
import {CommandBar} from 'office-ui-fabric-react/lib/CommandBar';

class NavBar extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return <div className="navbar">
            <CommandBar
                styles={{backgroundColor: '#fff'}}
                items={[
                    {
                        key: 'open',
                        name: 'Browse Notes',
                        iconProps: {
                            iconName: 'OpenFolderHorizontal'
                        },
                        onClick: this.props.onOpenClick
                    },
                    {
                        key: 'New',
                        name: 'New',
                        iconProps: {
                            iconName: 'Add'
                        },
                    },
                ]}
                farItems={[
                    {
                        key: 'user',
                        name: 'My Account',
                        iconProps: {
                            iconName: 'Contact'
                        },
                        subMenuProps: {
                            items: [
                                {
                                    key: 'settings',
                                    name: 'Settings',
                                    iconProps: {
                                        iconName: 'Settings'
                                    }
                                },
                                {
                                    key: 'signout',
                                    name: 'Sign Out',
                                    iconProps: {
                                        iconName: 'SignOut'
                                    },
                                    onClick: this.props.onLogoutClick
                                }
                            ]
                        }
                    }
                ]
                }
                ariaLabel={'Use left and right arrow keys to navigate between commands'}
            />
        </div>
    }
}

export default NavBar
