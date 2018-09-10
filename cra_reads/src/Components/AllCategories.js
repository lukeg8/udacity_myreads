import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import styled from "react-emotion";

const Container = styled("div")``;
const UL = styled("ul")`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
const LI = styled("li")`
    padding: 5px;
    list-style: none;
    display: inline-block;
    text-align: center;
`;

class AllCategories extends Component {
    render() {
        const { Categories } = this.props;
        const CategoriesDisplay = Categories.map(category => {
            return (
                <LI key={category.name}>
                    <Link to={`/category/${category.name}`}>
                        {category.name}
                    </Link>
                </LI>
            );
        });
        return (
            <Container>
                <UL>
                    <LI>
                        <Link to="/">Home</Link>
                    </LI>
                    {Categories && CategoriesDisplay}
                </UL>
            </Container>
        );
    }
}

function mapStateToProps({ Categories }) {
    return {
        Categories
    };
}

export default withRouter(connect(mapStateToProps)(AllCategories));
