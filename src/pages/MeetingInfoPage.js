import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper } from '@material-ui/core/';
import MeetingTableContainer from "../containers/meeting/MeetingTableContainer";
import MeetingModalContainer from "../containers/meeting/MeetingModalContainer";
import { Header, MainItemList } from "components";

const textcolor = '#546e7a';

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
        padding: theme.spacing(5),
        color: textcolor,
        fontWeight: '700',
    },
}));


const MeetingInfoPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MainItemList />

            <main className={classes.content}>
                <Header />
                <Typography className={classes.menuName} variant="h5">
                    미팅 이력 관리
                </Typography>

                <div className={classes.tablepart}>
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <MeetingTableContainer />
                                <MeetingModalContainer />
                            </div>
                        </Container>
                    </Paper>
                </div>
            </main>
        </div>
    );
}

export default MeetingInfoPage;