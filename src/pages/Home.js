import React from 'react';
import PropTypes from 'prop-types';
import { Container, Paper } from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MainItemList, ContractTable } from "pages";
import Image from 'images/Logo.png';

const drawerWidth = 201;
const textcolor = '#174A84';
const toolheight = 48;
const menucolor = '#4E7097';



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth - 1,
            flexShrink: 0,
            backgroundColor: menucolor,
        },
    },
    toolbar: {
        height: toolheight,
        width: '70%',
        textAlign: 'center',
        margin: '0px auto',
        paddingTop: theme.spacing(1),

    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#FAFDFF'
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        //paddingBottom: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 'flex',
    },
    divtitle: {
        paddingTop: theme.spacing(1),
        height: toolheight,
    },
    title: {
        height: 'auto',
        paddingLeft: theme.spacing(2),
        color: textcolor,
    },
    imageStyle: {
        width: '100%',

    },
    tablepart: {
        //paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    menuName: {
        padding: theme.spacing(5),
        color: textcolor,
        fontWeight: '700',
    },
    divMenuItemList: {
        paddingTop: theme.spacing(13),
    },
    button: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(15),
        textAlign: 'right',
    },
    plusbutton: {
        marginRight: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),

    },
    minusbutton: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },

}));

function Home() {
    const classes = useStyles();

    const drawer = (
        <div >
            <div className={classes.toolbar}>
                <img alt="으엑" src={Image} className={classes.imageStyle} />
            </div>

            <div className={classes.divMenuItemList}>
                <MainItemList />
            </div>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />

            <nav className={classes.drawer} aria-label="mailbox folders">
                {drawer}
            </nav>
            <main className={classes.content}>
                <div className={classes.divtitle}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        SMS
                    </Typography>
                </div>
                <Divider />
                {/* <div className={classes.toolbar} /> */}
                <div>
                    <Typography className={classes.menuName} variant="h5">
                        계약정보
                    </Typography>
                </div>
                {/*테이블 파트//////////////////////////////////////////////////////////////*/}
                <div className={classes.tablepart}>
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <ContractTable />
                            </div>
                        </Container>
                    </Paper>
                </div>
            </main>
        </div>
    );
}
Home.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default Home;