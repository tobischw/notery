import React, { Component } from 'react';

import './index.css';
import {ActivityItem} from "office-ui-fabric-react"
import Link from "react-router-dom/es/Link"

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const comments = this.props.comments.map((comment, key) =>
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
