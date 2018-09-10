import React, { Component } from "react";
import Post from "./Post";
import { getCommentsOfPost } from "../utils/API";
import Comment from "./Comment";
import AddComments from "./AddComments";
import { connect } from "react-redux";

class Posts extends Component {
    state = {
        comments: ""
    };
    getComments = () => {
        getCommentsOfPost(this.props.match.params.urlPostID).then(comments => {
            this.setState({ comments });
        });
    };
    componentDidMount() {
        this.getComments();
    }
    render() {
        const  comments  = this.props.CommentsByPostID;
        const PostDisplay = <Post postID={this.props.match.params.urlPostID} />;
        const commentList = comments
            ? comments.map(comment => (
                  <Comment key={comment.id} commentID={comment.id} />
              ))
            : "No Comment";
        return (
            <div>
                {PostDisplay}
                <p>COMMENTS - THERE ARE {`${comments.length}`} COMMENTS</p>
                {comments && commentList}
                <AddComments />
            </div>
        );
    }
}

function mapStateToProps({ Comments }, { match }) {
    const urlPostID = match.params.urlPostID;
    const CommentsKeyArray = Object.keys(Comments);
    const CommentsByPostIDArray = CommentsKeyArray.filter(
        key =>
            Comments[key]["parentId"] === urlPostID && !Comments[key]["deleted"]
    );
    const CommentsByPostID = CommentsByPostIDArray.map(key => Comments[key]);
    return {
        CommentsByPostID
    };
}
export default connect(mapStateToProps)(Posts);
