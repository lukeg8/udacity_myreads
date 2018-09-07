import React, { Component } from "react";
import {
    getComment,
    deleteComment,
    editComment,
    voteCommentUp,
    voteCommentDown
} from "../utils/API";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleStateChange } from "../Actions/StateChange";

import styled from "react-emotion";

const Container = styled("div")`
    display: flex;
    flex-direction: row;
    padding: 3px;
    border: 1px solid blue;
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
const Button = styled("button")``;

class Comment extends Component {
    state = {
        comment: "",
        edit: false,
        voteStatus: false
    };
    getCommentFunc = () => {
        getComment(this.props.commentID).then(comment => {
            this.setState({ comment });
        });
    };
    componentDidMount() {
        this.getCommentFunc();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.voteStatus !== prevState.voteStatus) {
            this.getCommentFunc();
        }
    }
    handleVote = voteUpDown => {
        switch (voteUpDown) {
            case "upVOTE":
                voteCommentUp(this.props.commentID).then(() => {
                    this.setState(prevState => ({
                        voteStatus: !prevState.voteStatus
                    }));
                });
                break;
            case "downVOTE":
                voteCommentDown(this.props.commentID).then(() => {
                    this.setState(prevState => ({
                        voteStatus: !prevState.voteStatus
                    }));
                });
                break;
            default:
                break;
        }
    };
    handleDeleteComment = () => {
        deleteComment(this.state.comment.id).then(() => {
            this.props.toggleStateChange();
        });
    };
    handleEditComment = () => {
        this.setState({ edit: true });
    };
    handleSaveComment = event => {
        event.preventDefault();
        editComment(this.state.comment.id, {
            timestamp: Date.now(),
            body: this.state.comment.body
        }).then(() => this.setState({ edit: false }));
    };
    handleTextPostsChange = event => {
        const newComment = {
            ...this.state.comment,
            body: event.target.value
        };
        this.setState({
            comment: newComment
        });
    };
    render() {
        const { timestamp, body, author, voteScore } = this.state.comment;
        return (
            <Container>
                <ContainerRow>
                    <ContainerColumn>
                        <Button onClick={() => this.handleVote("upVOTE")}>
                            UP
                        </Button>
                        {`${voteScore}`}
                        <Button onClick={() => this.handleVote("downVOTE")}>
                            DOWN
                        </Button>
                    </ContainerColumn>
                    {this.state.edit ? (
                        <ContainerColumn>
                            <form onSubmit={this.handleSaveComment}>
                                <textarea
                                    maxLength="100"
                                    placeholder="Posts Body go here"
                                    onChange={this.handleTextPostsChange}
                                    value={this.state.comment.body}
                                />
                                <button
                                    type="submit"
                                    disabled={this.state.body === ""}
                                >
                                    SAVE
                                </button>
                            </form>
                        </ContainerColumn>
                    ) : (
                        <ContainerColumn>
                            {`${body}`}
                            <ContainerRow>
                                {`BY: ${author} - ON - ` + new Date(timestamp)}
                            </ContainerRow>
                            <ContainerRow>
                                <Button onClick={this.handleEditComment}>
                                    EDIT
                                </Button>
                                <Button onClick={this.handleDeleteComment}>
                                    DELETE
                                </Button>
                            </ContainerRow>
                        </ContainerColumn>
                    )}
                </ContainerRow>
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
)(Comment);
