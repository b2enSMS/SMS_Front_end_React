import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeInput, initializeForm, login } from '../../modules/auth/auth'
import { Login } from "components"
import { withRouter } from 'react-router-dom';
import { requestCheck } from '../../modules/auth/auth';

const LoginContainer = ({history}) => {
    const[error,setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.loginForm,
        auth: auth.auth,
        authError: auth.authError,
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
        const { email, password } = form;
        console.log("onSubmit",email,password)
        dispatch(login({ email, password }));
    }
    useEffect(() => {
        dispatch(initializeForm('loginForm'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            console.log('오류발생')
            console.log(authError);
            setError("로그인 실패")
            return;
        }
        if(auth){
            console.log('로그인 성공');
            dispatch(requestCheck());
        }
    }, [auth,authError,dispatch]);
    useEffect(() => {
        if(auth) {
            try{
                sessionStorage.setItem('auth',JSON.stringify(auth));
                history.push('/cont');  
            }catch(e){
                console.log('sessionStorage 작동 안함')
            }
        }
    },[history,auth]);
    
    return (
        <Login
            loginForm={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginContainer);