import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OrgTableContainer,OrgModalContainer } from "containers";
import { Container, Paper } from "@material-ui/core";
import CustomerTableContainer from "../containers/customer/CustomerTableContainer";
import { Tabs } from 'antd';
import CustomerModalContainer from "../containers/customer/CustomerModalContainer";
const { TabPane } = Tabs;

const textcolor = '#c5cae9';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        //width: ,
    },
    tabs: {
        fontFamily: "inherit"
    },
    tablepart: {
        //paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        //paddingBottom: theme.spacing(1),
    },
    /*menuName: {
        padding: theme.spacing(5),
        color: textcolor,
        fontWeight: '700',
    },*/
    appbar: {
        color: textcolor
    },
    tabMagic: {
        //fontWeight: 'bold',
        backgroundColor: '#FAFDFF',
    },
    marginMinor: {
        marginTop: theme.spacing(-2.2),
    },
}));

const OrgInfoPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Tabs defaultActiveKey="1" size='large'>
                <TabPane tab="고객사 관리" key="1">
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <OrgTableContainer />
                                <OrgModalContainer />
                            </div>
                        </Container>
                    </Paper>
                </TabPane>
                <TabPane tab="고객 관리" key="2">

                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <CustomerTableContainer />
                                <CustomerModalContainer />
                            </div>
                        </Container>
                    </Paper>
                </TabPane>

            </Tabs>

        </div >
    );
}

export default OrgInfoPage;