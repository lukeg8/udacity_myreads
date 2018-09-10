import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import AddPosts from "./AddPosts";
import { withRouter } from "react-router-dom";

class Category extends Component {
    state = {
        sortBy: "timestamp"
    };
    sortBy = (a, b) => {
        return b[this.state.sortBy] - a[this.state.sortBy];
    };
    handleChangeSelect = event => {
        this.setState({ sortBy: event.target.value });
    };
    render() {
        const { postData } = this.props;
        const postsDisplay = postData
            ? postData.sort(this.sortBy).map(post => {
                  return <Post key={post.id} postID={post.id} />;
              })
            : "NO POSTS";
        const sortByDisplay = (
            <select
                value={this.state.sortBy}
                onChange={this.handleChangeSelect}
            >
                <option value="timestamp">timestamp</option>
                <option value="voteScore">voteScore</option>
            </select>
        );
        return (
            <div>
                {sortByDisplay}
                {postData ? postsDisplay : "NO POSTS"}
                <AddPosts />
            </div>
        );
    }
}

function mapStateToProps({ Posts }, { match }) {
    const categoryPath =
        match && match.params.categoryPath ? match.params.categoryPath : "";
    const postKeys = categoryPath
        ? Object.keys(Posts).filter(
              key =>
                  Posts[key]["category"] === categoryPath &&
                  !Posts[key]["deleted"]
          )
        : Object.keys(Posts).filter(key => !Posts[key]["deleted"]);
    const postData = postKeys.map(key => Posts[key]);
    return {
        postData,
        match,
        categoryPath,
    
    };
}

export default withRouter(connect(mapStateToProps)(Category));