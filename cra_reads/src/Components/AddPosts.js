import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { _setPost } from "../Actions/Posts";

import styled from "react-emotion";

const Container = styled("div")`
    display: flex;
    flex-direction: row;
    padding: 3px;
    border: 1px solid purple;
    margin: 2px;
`;

const ContainerColumn = styled("div")`
    display: flex;
    flex-direction: column;
    padding: 3px;
    margin: 2px;
`;

class AddPost extends Component {
    state = {
        title: "",
        category: "react",
        author: "",
        body: ""
    };
    clearState = () => {
        this.setState({ title: "", author: "", body: "" });
    };
    handleSubmitPosts = event => {
        event.preventDefault();
        const postObj = {
            id: uuidv4(),
            timestamp: Date.now(),
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category,
            voteScore: 1,
            deleted: false,
            commentCount: 0
        };
        this.props._setPost(postObj).then(() => {
            this.clearState();
        });
    };
    handleTextPostsChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { title, author, category, body } = this.state;
        const { Categories } = this.props;
        const categoriesOptions = Categories.map(category => {
            return (
                <option key={category.name} value={category.name}>
                    {category.name}
                </option>
            );
        });
        return (
            <Container>
                <form onSubmit={this.handleSubmitPosts}>
                    <ContainerColumn style={{ minWidth: 500 }}>
                        Add a new Post
                        <input
                            type="text"
                            value={title}
                            name="title"
                            onChange={this.handleTextPostsChange}
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={author}
                            name="author"
                            onChange={this.handleTextPostsChange}
                            placeholder="Author"
                        />
                        <select
                            value={category}
                            onChange={this.handleTextPostsChange}
                            name="category"
                        >
                            <option disabled>Category:</option>
                            {categoriesOptions}
                        </select>
                        <textarea
                            maxLength="100"
                            placeholder="Posts Body go here"
                            onChange={this.handleTextPostsChange}
                            value={body}
                            name="body"
                        />
                        <button
                            type="submit"
                            disabled={
                                title === "" ||
                                author === "" ||
                                category === "" ||
                                body === ""
                            }
                        >
                            Submit
                        </button>
                    </ContainerColumn>
                </form>
            </Container>
        );
    }
}

function mapStateToProps({ Categories }, { match }) {
    return {
        Categories,
        match
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ _setPost }, dispatch);
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPost));
