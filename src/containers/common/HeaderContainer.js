import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { Header } from "components"
import { logout } from '../../modules/auth/user'
const HeaderContainer = () => {
    const { user } = useSelector(({ user }) => ({
        user: user.user,
    }));
    const dispatch = useDispatch();
    const onLogout= () =>{
        dispatch(logout());
    };
    return (
        <Header
            user={user}
            onLogout={onLogout}
        />
    );
};

export default HeaderContainer;