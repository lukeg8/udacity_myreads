import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Category from "./Category";
import AllCategories from "./AllCategories";
import Posts from "./Posts";

class App extends Component {
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
                    <Route render={() => <Category />} />
                </Switch>
            </div>
        );
    }
}

export default App;
