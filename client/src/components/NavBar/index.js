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
                        subMenuProbs: {
                            items: [
                                {

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
