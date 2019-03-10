import React, {Component} from 'react';

import './index.css';
import {ActivityItem} from "office-ui-fabric-react"
import Link from "react-router-dom/es/Link"
import timeAgo from "time-ago"

class Comments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const comments = this.props.comments.map((comment, key) => 
            <ActivityItem key={key} activityDescription={[
                <Link to={"#23"} key={comment._id}>{comment.user.firstname} {comment.user.lastname}</Link>,
                <span key={0}> commented</span>, <blockquote key={1}>{comment.quote}</blockquote>]}
                          activityPersonas={
                              [
                                  {
                                      initialsColor: comment.user.color,
                                      imageInitials: comment.user.firstname.charAt(0) + comment.user.lastname.charAt(0)
                                  }
                              ]
                          } comments={comment.comment} timeStamp={timeAgo.ago(comment.createdAt)}/>
        );
        var commentsBody = (this.props.comments.length > 0 ) ? comments : <div className="nothing-here">There's nothing here :(</div>
        return <div className="chat">
            <div className="conversation">
                {commentsBody}
            </div>
        </div>
    }

    x
}

export default Comments
