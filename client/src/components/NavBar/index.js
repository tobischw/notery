import React, {Component} from 'react';

import './index.css';
import {CommandBar} from 'office-ui-fabric-react/lib/CommandBar';

class NavBar extends Component {
    render() {
        return <div className="navbar">
            <CommandBar
                styles={{backgroundColor: '#fff'}}
                farItems={[
                    {
                        key: 'user',
                        name: 'Tobi Schweiger',
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
                                    }
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
