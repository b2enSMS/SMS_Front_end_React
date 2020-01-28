import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { Header } from "components"
import { logout } from '../../modules/auth/auth'
import { withRouter } from 'react-router-dom';
const HeaderContainer = ({history}) => {
    // const { user } = useSelector(({ user }) => ({
    //     user: user.user,
    // }));
    const { auth } = useSelector(({ auth }) => ({
        auth: auth.auth,
    }));
    const dispatch = useDispatch();
    const onLogout= () =>{
        dispatch(logout());
        history.push('/login');
    };
    return (
        <Header
            //user={user}
            auth={auth}
            onLogout={onLogout}
        />
    );
};

export default withRouter(HeaderContainer);