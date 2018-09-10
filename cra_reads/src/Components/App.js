import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import Category from "./Category";
import AllCategories from "./AllCategories";
import Posts from "./Posts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleInitialData } from "../Actions/shared";

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData()
    }
    render() {
        return (
            <div>
                <AllCategories />
                <Switch>
                    <Route
                        path="/category/:categoryPath"
                        render={props => <Category {...props} />}
                    />
                    <Route
                        path="/posts/:urlPostID"
                        render={props => <Posts {...props} />}
                    />
                    <Route render={props => <Category {...props} />} />
                </Switch>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ handleInitialData }, dispatch);
}

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(App)
);
