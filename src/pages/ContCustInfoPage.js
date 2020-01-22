import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper } from '@material-ui/core/';
import { ContCustContainer } from "containers";
import { HeaderContainer, MainItemListContainer } from "containers";

const textcolor = '#546e7a';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#FAFDFF'
    },
    container: {
        paddingTop: theme.spacing(0),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        //paddingBottom: theme.spacing(1),
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
}));


const ContCustInfoPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MainItemListContainer />

            <main className={classes.content}>
                <HeaderContainer />
                <Typography className={classes.menuName} variant="h5">
                    계약 고객 관리
                </Typography>
                <div className={classes.tablepart}>
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <ContCustContainer />
                            </div>
                        </Container>
                    </Paper>
                </div>
            </main>
        </div>
    );
}

export default ContCustInfoPage;