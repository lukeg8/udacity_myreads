import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    _editPost,
    _deletePost,
    _votePostUP,
    _votePostDOWN
} from "../Actions/Posts";
import { withRouter } from "react-router-dom";
import styled from "react-emotion";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
        edit: false,
        title: "",
        body: ""
    };
    handleDeletePost = () => {
        this.props._deletePost(this.props.post.id).then(() => {
            this.props.history.push("/");
        });
    };
    handleEditPost = () => {
        this.setState({ edit: true });
    };
    handleUp = () => {
        this.props._votePostUP(this.props.post.id);
    };
    handleDown = () => {
        this.props._votePostDOWN(this.props.post.id);
    };
    handleSavePost = event => {
        event.preventDefault();
        this.props
            ._editPost(this.props.post.id, {
                title: this.state.title,
                body: this.state.body
            })
            .then(() => this.setState({ edit: false }));
    };
    handleTextPostsChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    setPropState = () => {
        this.setState({
            title: this.props.post.title,
            body: this.props.post.body
        });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.post !== this.props.post) {
            this.setPropState();
        }
    }
    componentDidMount() {
        if (this.props.post) {
            this.setPropState();
        }
    }
    render() {
        if (this.props.post) {
            const {
                id,
                timestamp,
                title,
                body,
                author,
                category,
                voteScore
            } = this.props.post;

            return (
                <Container>
                    {this.props.post ? (
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
                                                value={this.state.title}
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
                                                value={this.state.body}
                                                name="body"
                                            />
                                        </ContainerRow>
                                        <ContainerRow>
                                            <button
                                                type="submit"
                                                disabled={
                                                    this.state.body === "" ||
                                                    this.state.title === ""
                                                }
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
        } else {
            return <div>NOPOST</div>;
        }
    }
}

function mapStateToProps({ Posts }, { postID }) {
    const post = Posts[postID];
    return {
        post
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            _editPost,
            _deletePost,
            _votePostDOWN,
            _votePostUP
        },
        dispatch
    );
}
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Post)
);
