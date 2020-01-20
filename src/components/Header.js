import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const textcolor = '#174A84';
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
}));

const Header = () => {
    const classes = useStyles();


    return (
        <div>

                <div className={classes.divtitle}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        SMS
                    </Typography>
                </div>
                <Divider />
        </div >
    )
}
export default Header;