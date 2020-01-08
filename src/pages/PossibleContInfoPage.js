import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core/';
import { PossibleContTableContainer, PossibleContModalContainer, PossibleContLicenseContainer, PossibleContHistContainer } from "containers";
const textcolor = '#174A84';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(3.3),
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
        padding: theme.spacing(4),
        paddingBotton: theme.spacing(-1.25),
        paddingTop: theme.spacing(4.8),
        paddingLeft: theme.spacing(5.8),
        lineHeight:1.33,
        fontSize:'1.5rem',
        color: textcolor,
        fontWeight: 580,
    },
    
}));


const PossibleContInfoPage = () => {
    const classes = useStyles();
    return (
        <span>
            <div>
                <h1 className={classes.menuName}>
                    Pre-sales
                </h1>
            </div>
            <div className={classes.tablepart}>
                <Paper >
                    <Container maxWidth="lg" className={classes.container}>
                        <div >
                            <PossibleContTableContainer />
                            <PossibleContModalContainer />
                            <PossibleContLicenseContainer />
                            <PossibleContHistContainer />
                        </div>
                    </Container>
                </Paper>
            </div>
        </span>
    );
}

export default PossibleContInfoPage;