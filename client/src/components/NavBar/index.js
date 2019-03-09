import React, {Component} from 'react';

import './index.css';
import {CommandBar} from 'office-ui-fabric-react/lib/CommandBar';
import {auth} from "../../auth"
import {Redirect} from "react-router-dom"

class NavBar extends Component {

     constructor(props) {
         super(props);

         this.state = {
             redirectLogout: false
         };

         this.onClickLogout = this.onClickLogout.bind(this);
     }

     onClickLogout() {
         auth.logout();
         this.setState({redirectLogout: true});
     }

    render() {
        if(this.state.redirectLogout) {
            return <Redirect to={{
                pathname: '/login'
            }}/>;
        }
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
                                    },
                                    onClick: this.onClickLogout
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
