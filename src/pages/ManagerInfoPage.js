import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core/';
import { ManagerTableContainer } from "../containers";
import ManagerModalContainer from "../containers/manager/ManagerModalContainer";
import { HeaderContainer, MainItemListContainer } from "containers";

const textcolor = '#174A84';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        //paddingBottom: theme.spacing(1),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#FAFDFF'
    },
    tablepart: {
        //paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    menuName: {
        // padding: theme.spacing(5),
        // color: textcolor,
        // fontWeight: '700',
        padding: theme.spacing(4),
        paddingBotton: theme.spacing(-1.25),
        paddingTop: theme.spacing(4.5),
        paddingLeft: theme.spacing(5.5),
        lineHeight: 1.33,
        fontSize: '1.5rem',
        color: textcolor,
        fontWeight: 580,
    },
}));


const ProductInfoPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MainItemListContainer />

            <main className={classes.content}>
                <HeaderContainer />
                <h1 className={classes.menuName}>b2en 담당자 관리</h1>
                <div className={classes.tablepart}>
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <ManagerTableContainer />
                                <ManagerModalContainer />
                            </div>
                        </Container>
                    </Paper>
                </div>
            </main>
        </div>
    );
}

export default ProductInfoPage;