import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { _addCommentToPost } from "../Actions/Comments";

import styled from "react-emotion";

const Container = styled("div")`
    display: flex;
    flex-direction: row;
    border: 1px solid purple;
    padding: 3px;
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
class AddComments extends Component {
    state = {
        author: "",
        body: ""
    };
    handleTextChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    clearState = () => {
        this.setState({
            author: "",
            body: ""
        });
    };
    handleSubmitForm = event => {
        event.preventDefault();
        const commentObj = {
            id: uuidv4(),
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            parentId: this.props.match.params.urlPostID,
            voteScore: 1,
            deleted: false,
            parentDeleted: false
        };
        this.props._addCommentToPost(commentObj).then(() => {
            this.clearState();
        });
    };
    render() {
        const { body, author } = this.state;
        return (
            <Container>
                <form onSubmit={this.handleSubmitForm}>
                    <ContainerRow>
                        <ContainerColumn>
                            <textarea
                                name="body"
                                maxLength="100"
                                placeholder="Insert Comments here"
                                onChange={this.handleTextChange}
                                value={body}
                            />
                        </ContainerColumn>
                        <ContainerColumn>
                            <input
                                type="text"
                                name="author"
                                value={author}
                                onChange={this.handleTextChange}
                                placeholder="Author"
                            />
                            <button
                                type="submit"
                                disabled={body === "" || author === ""}
                            >
                                Submit
                            </button>
                        </ContainerColumn>
                    </ContainerRow>
                </form>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { _addCommentToPost },
        dispatch
    );
}
export default connect(
    null,
    mapDispatchToProps
)(withRouter(AddComments));
