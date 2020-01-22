import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper } from '@material-ui/core/';
import PossibleCustomerTableContainer from "../containers/possibleCustomer/PossibleCustomerTableContainer";
import { Header, MainItemList } from "components";

const textcolor = '#546e7a';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(0),
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
        padding: theme.spacing(5),
        color: textcolor,
        fontWeight: '700',
    },
}));


const PossibleCustomerInfoPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MainItemList />

            <main className={classes.content}>
                <Header />
                <Typography className={classes.menuName} variant="h5">
                    가망 고객 관리
                </Typography>

                <div className={classes.tablepart}>
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <PossibleCustomerTableContainer />
                            </div>
                        </Container>
                    </Paper>
                </div>
            </main>
        </div>
    );
}

export default PossibleCustomerInfoPage;