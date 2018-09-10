import React, { Component } from "react";
import {
    _deleteComment,
    _editComment,
    _voteCommentUp,
    _voteCommentDown
} from "../Actions/Comments";
import { withRouter } from "react-router-dom";

import styled from "react-emotion";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
        edit: false,
        body: ""
    };
    componentDidMount() {
        this.setState({
            body: this.props.comment.body
        });
    }
    handleVote = voteUpDown => {
        switch (voteUpDown) {
            case "upVOTE":
                this.props._voteCommentUp(this.props.comment.id);
                break;
            case "downVOTE":
                this.props._voteCommentDown(this.props.comment.id);
                break;
            default:
                break;
        }
    };
    handleDeleteComment = () => {
        this.props._deleteComment(this.props.comment.id);
    };
    handleEditComment = () => {
        this.setState({ edit: true });
    };
    handleSaveComment = event => {
        event.preventDefault();
        this.props
            ._editComment(this.props.comment.id, {
                timestamp: Date.now(),
                body: this.state.body
            })
            .then(() => this.setState({ edit: false }));
    };
    handleTextPostsChange = event => {
        this.setState({
            body: event.target.value
        });
    };
    render() {
        const { timestamp, body, author, voteScore } = this.props.comment;
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
                                    value={this.state.body}
                                    name="body"
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

function mapStateToProps({ Comments }, { commentID }) {
    const comment = Comments[commentID];
    return {
        comment
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            _deleteComment,
            _editComment,
            _voteCommentUp,
            _voteCommentDown
        },
        dispatch
    );
}
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Comment)
);
