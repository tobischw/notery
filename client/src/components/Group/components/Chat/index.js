import React, {Component} from 'react';

import './index.css';

import {css, classNamesFunction} from 'office-ui-fabric-react/lib/Utilities';
import {ActivityItem} from 'office-ui-fabric-react/lib/ActivityItem';
import Link from "react-router-dom/es/Link"

class Chat extends Component {
    render() {
        return <div className="chat">
            <div className="conversation">
                <ActivityItem key={"test"} activityDescription={[<Link to={"#23"}>Tobi Schweiger</Link>]}
                              activityPersonas={
                                  [
                                      {
                                          imageInitials: "TS"
                                      }
                                  ]
                              } comments={"Jordan u r shite"} timeStamp={"23m ago"}/>
                <ActivityItem key={"test2"} activityDescription={[<Link to={"#24"}>Jordan Stites</Link>]}
                              activityPersonas={
                                  [
                                      {
                                          imageInitials: "JS",
                                          initialsColor: "red"
                                      }
                                  ]
                              } comments={"y r u always so mean to me :("} timeStamp={"23m ago"}/>
                <ActivityItem key={"test"} activityDescription={[<Link to={"#23"}>Tobi Schweiger</Link>]}
                              activityPersonas={
                                  [
                                      {
                                          imageInitials: "TS"
                                      }
                                  ]
                              } comments={"According to all known laws\n" +
                "of aviation,\n" +
                "\n" +
                "  \n" +
                "there is no way a bee\n" +
                "should be able to fly.\n" +
                "\n" +
                "  \n" +
                "Its wings are too small to get\n" +
                "its fat little body off the ground."} timeStamp={"23m ago"}/>
            </div>
        </div>
    }
}

export default Chat
