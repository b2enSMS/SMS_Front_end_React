import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CompanyTableContainer } from "../containers";
import { Container, Paper } from "@material-ui/core";
import CompanyModalContainer from "../containers/company/CompanyModalContainer";
import PossibleCustomerModalContainer from "../containers/possibleCustomer/PossibleCustomerModalContainer";
import CustomerTableContainer from "../containers/customer/CustomerTableContainer";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const textcolor = '#c5cae9';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


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
        fontWeight: 'bold',
        textcolor: 'red'
    },
}));

const CompanyInfoPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Tabs defaultActiveKey="1" size='large'>
                <TabPane tab="고객사 관리" key="1">
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <CompanyTableContainer />
                                <CompanyModalContainer />
                            </div>
                        </Container>
                    </Paper>
                </TabPane>
                <TabPane tab="고객 관리" key="2">
                    <Paper >
                        <Container maxWidth="lg" className={classes.container}>
                            <div >
                                <CustomerTableContainer />
                                <PossibleCustomerModalContainer />
                            </div>
                        </Container>
                    </Paper>
                </TabPane>

            </Tabs>

        </div >
    );
}

export default CompanyInfoPage;