import React, {Component} from 'react';

import './index.css';

import {css, classNamesFunction} from 'office-ui-fabric-react/lib/Utilities';
import {ActivityItem} from 'office-ui-fabric-react/lib/ActivityItem';
import Link from "react-router-dom/es/Link"
import {Persona} from "office-ui-fabric-react"

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    id: 0,
                    user: {
                        firstname: "Tobi",
                        lastname: "Schweiger",
                        color: "red"
                    },
                    content: "Test",
                    timestamp: "32m ago"
                }, {
                    id: 1,
                    user: {
                        firstname: "Jordan",
                        lastname: "Stites",
                        color: "blue"
                    },
                    content: "Test",
                    timestamp: "32m ago"
                }
            ]
        }
    }

    render() {
        const messages = this.state.history.map((message, key) =>
            <ActivityItem key={key} activityDescription={[
                <Link to={"#23"} key={key}>{message.user.firstname} {message.user.lastname}</Link>]}
                          activityPersonas={
                              [
                                  {
                                      initialsColor: message.user.color,
                                      imageInitials: message.user.firstname.charAt(0) + message.user.lastname.charAt(0)
                                  }
                              ]
                          } comments={message.content} timeStamp={message.timestamp}/>
        );
        return <div className="chat">
            <div className="conversation">
                {messages}
            </div>
        </div>
    }
}

export default Chat
