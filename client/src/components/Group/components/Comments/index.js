import React, { Component } from 'react';

import './index.css';
import {ActivityItem} from "office-ui-fabric-react"
import Link from "react-router-dom/es/Link"

class Comments extends Component {
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
                    content: "You raise a valid point. But I do think they mentioned something else on the study guide,",
                    timestamp: "32m ago",
                    quote:"This is  quote. A big quote. Enjoy the quote."
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
        const comments = this.state.history.map((comment, key) =>
            <ActivityItem key={key} activityDescription={[
                <Link to={"#23"} key={key}>{comment.user.firstname} {comment.user.lastname}</Link>, <span key={2}> commented</span>, <blockquote key={3}>{comment.quote}</blockquote>]}
                          activityPersonas={
                              [
                                  {
                                      initialsColor: comment.user.color,
                                      imageInitials: comment.user.firstname.charAt(0) + comment.user.lastname.charAt(0)
                                  }
                              ]
                          } comments={comment.content} timeStamp={comment.timestamp}/>
        );
        return <div className="chat">
            <div className="conversation">
                {comments}
            </div>
        </div>
    }x
}

export default Comments
