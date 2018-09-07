import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategoryPost, getPosts } from "../utils/API";
import Post from "./Post";
import AddPosts from "./AddPosts";
import { handleInitialData } from "../Actions/shared";
import { bindActionCreators } from "redux";
import { getCommentsOfPost } from "../utils/API";

class Category extends Component {
  state = {
    posts: "",
    sortBy: "timestamp"
  };
  getPostsForCategory(categoryPath = "") {
    if (categoryPath) {
      getCategoryPost(categoryPath).then(posts => {
        this.setState({ posts });
      });
    } else {
      getPosts().then(posts => {
        this.setState({ posts });
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.StateChange !== prevProps.StateChange) {
      this.getPostsForCategory(this.props.categoryPath);
    }
    if (prevProps.categoryPath !== this.props.categoryPath) {
      this.getPostsForCategory(this.props.categoryPath);
    }
  }
  wrapper() {
    getCommentsOfPost('8xf0y6ziyjabvozdd253nd').then(data =>{
        console.log('mydata', data)
    });
  }
  componentDidMount() {
    this.getPostsForCategory(this.props.categoryPath);
    this.props.handleInitialData();
  }
  sortBy = (a, b) => {
    return b[this.state.sortBy] - a[this.state.sortBy];
  };
  handleChangeSelect = event => {
    this.setState({ sortBy: event.target.value });
  };
  render() {
    const { posts } = this.state;
    const postsDisplay = posts
      ? posts.sort(this.sortBy).map(post => {
          return <Post key={post.id} postID={post.id} />;
        })
      : "NO POSTS";
    const sortByDisplay = (
      <select value={this.state.sortBy} onChange={this.handleChangeSelect}>
        <option value="timestamp">timestamp</option>
        <option value="voteScore">voteScore</option>
      </select>
    );
    return (
      <div>
        {sortByDisplay}
        {posts ? postsDisplay : "NO POSTS"}
        <AddPosts />
      </div>
    );
  }
}

function mapStateToProps({ StateChange }, { match }) {
  const categoryPath =
    match && match.params.categoryPath ? match.params.categoryPath : "";
  return {
    match,
    categoryPath,
    StateChange
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleInitialData }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
