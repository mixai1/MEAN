import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CreatePage } from '../pages/CreatePage';
import { AuthPage } from '../pages/AuthPage';
import { HomePage } from '../pages/HomePage';
import { DetailPage } from '../pages/DetailPage';

export const Routes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route>
                    <Redirect to="/home" />
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
