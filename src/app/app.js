import Users from "./layouts/users";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Navbar from "./component/UI/navBar";

function App() {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route path={"/users/:userId?/:edit?"} component={Users} />
                <Route path={"/login/:type?"} render={() => <Login />} />
                <Route exact path={"/main"} render={() => <Main />} />
                <Redirect to={"/main"} />
            </Switch>
        </div>
    );
}

export default App;
