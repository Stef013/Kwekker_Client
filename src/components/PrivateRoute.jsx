import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const token = JSON.parse(localStorage.getItem('authentication'));

    return (
        <Route {...rest} render={props => (
            token ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
        )} />
    )
}

export default PrivateRoute;