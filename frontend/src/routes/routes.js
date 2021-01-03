import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CreatePage } from '../pages/CreatePage';
import { AuthPage } from '../pages/AuthPage';

export const Routes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route>
                    <Redirect to="/create" />
                </Route>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/">
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}   
