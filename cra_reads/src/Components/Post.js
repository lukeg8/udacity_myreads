import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    getPost,
    editPost,
    deletePost,
    votePostUP,
    votePostDOWN
} from "../utils/API";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleStateChange } from "../Actions/StateChange";
import { withRouter } from "react-router-dom";
import styled from "react-emotion";

const Container = styled("div")`
    display: flex;
    flex-direction: row;
    padding: 3px;
    border: 1px solid orange;
    margin: 2px;
`;

const ContainerRow = styled("div")`
    display: flex;
    flex-direction: row;
    padding: 3px;
    margin: 2px;
`;
const ContainerColumn = styled("div")`
    display: flex;
    flex-direction: column;
    padding: 3px;
    margin: 2px;
`;
const Button = styled("button")`
    margin: 2px;
    padding: 3px;
`;

class Post extends Component {
    state = {
        post: "",
        edit: false,
        voteStatus: false
    };
    getPostFunc = postID => {
        getPost(postID).then(post => {
            this.setState({ post });
        });
    };
    componentDidMount() {
        const { postID } = this.props;
        if (postID) {
            this.getPostFunc(postID);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.voteStatus !== prevState.voteStatus) {
            const { postID } = prevProps;
            this.getPostFunc(postID);
        }
    }
    handleDeletePost = () => {
        deletePost(this.state.post.id).then(() => {
            this.props.toggleStateChange();
            this.props.history.push("/");
        });
    };
    handleEditPost = () => {
        this.setState({ edit: true });
    };
    handleUp = () => {
        votePostUP(this.state.post.id).then(() => {
            this.setState(prevState => ({ voteStatus: !prevState.voteStatus }));
        });
    };
    handleDown = () => {
        votePostDOWN(this.state.post.id).then(() => {
            this.setState(prevState => ({ voteStatus: !prevState.voteStatus }));
        });
    };
    handleSavePost = event => {
        event.preventDefault();
        editPost(this.state.post.id, {
            title: this.state.post.title,
            body: this.state.post.body
        }).then(() => this.setState({ edit: false }));
    };
    handleTextPostsChange = event => {
        const newPost = {
            ...this.state.post,
            [event.target.name]: event.target.value
        };
        this.setState({
            post: newPost
        });
    };
    render() {
        const {
            id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore
        } = this.state.post;

        return (
            <Container>
                {this.state.post ? (
                    <ContainerRow>
                        <ContainerColumn
                            style={{
                                alignItems: "stretch",
                                justifyContent: "space-between",
                                width: "100px"
                            }}
                        >
                            <button onClick={this.handleUp}>UP</button>
                            {`${voteScore}`}
                            <button onClick={this.handleDown}>DOWN</button>
                        </ContainerColumn>
                        {this.state.edit ? (
                            <ContainerColumn>
                                <form onSubmit={this.handleSavePost}>
                                    <ContainerRow>
                                        <input
                                            type="text"
                                            onChange={
                                                this.handleTextPostsChange
                                            }
                                            value={this.state.post.title}
                                            name="title"
                                        />
                                    </ContainerRow>
                                    <ContainerRow>
                                        <textarea
                                            maxLength="100"
                                            placeholder="Posts Body go here"
                                            onChange={
                                                this.handleTextPostsChange
                                            }
                                            value={this.state.post.body}
                                            name="body"
                                        />
                                    </ContainerRow>
                                    <ContainerRow>
                                        <button
                                            type="submit"
                                            disabled={this.state.body === ""}
                                        >
                                            SAVE
                                        </button>
                                    </ContainerRow>
                                </form>
                            </ContainerColumn>
                        ) : (
                            <ContainerColumn>
                                <ContainerRow>
                                    <Link
                                        to={`/posts/${id}`}
                                    >{`${title}`}</Link>
                                </ContainerRow>
                                <ContainerRow>{`${body}`}</ContainerRow>
                                <ContainerRow style={{ color: "red" }}>
                                    {`Written BY: ${author} - ON - ` +
                                        new Date(timestamp)}
                                </ContainerRow>
                                <ContainerRow>
                                    <Button onClick={this.handleEditPost}>
                                        EDIT
                                    </Button>
                                    <Button onClick={this.handleDeletePost}>
                                        DELETE
                                    </Button>
                                    {`[CATEGORY - ${category}]`}
                                </ContainerRow>
                            </ContainerColumn>
                        )}
                    </ContainerRow>
                ) : (
                    "NO POST"
                )}
            </Container>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleStateChange }, dispatch);
}
export default connect(
    null,
    mapDispatchToProps
)(withRouter(Post));
