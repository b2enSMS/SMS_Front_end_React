import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'antd';
import { Link } from 'react-router-dom'

const textcolor = '#546e7a';
const toolheight = 48;

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#FAFDFF'
    },
    divtitle: {
        paddingTop: theme.spacing(1),
        height: toolheight,
    },
    title: {
        height: 'auto',
        paddingLeft: theme.spacing(2),
        color: textcolor,
        //fontWeight: 'bold',
    },
    login: {
        textAlign: 'right',
        marginTop: theme.spacing(-4),
        paddingRight: theme.spacing(4)
    },
    antbtn:{
        color:'white',
        backgroundColor:'#78909c'
    },
    loginment:{
        marginLeft: theme.spacing(3),
    }
}));

const Header = ({ auth, onLogout }) => {
    const classes = useStyles();


    return (
        <div>

            <div className={classes.divtitle}>

                <Typography  variant="h6" noWrap>
                    <Link className={classes.title} to="/">SMS</Link>
                </Typography>

                {auth ? (
                    <div className={classes.login}>
                        <Typography variant="h7" noWrap>{auth.name}{'님 안녕하세요.'}<Button className={classes.loginment} onClick={onLogout}>로그아웃</Button></Typography>
                        
                    </div>
                ) : (
                        <div className={classes.login}>
                            <Button className={classes.antbtn}><Link to="/login">로그인</Link></Button>
                        </div>
                    )}
            </div>
            <Divider />
        </div >
    )
}
export default Header;