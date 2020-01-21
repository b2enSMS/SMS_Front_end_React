import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeInput, initializeForm } from '../../modules/auth/auth'
import { Login } from "components"

const LoginContainer = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth.loginForm
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            handleChangeInput({
                form: 'loginForm',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
    }
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    return (
        <Login
            loginForm={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default LoginContainer;