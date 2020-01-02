import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {CompanyTableContainer, ContractCustomerContainer, ContractModalContainer} from "../containers";
import {Container, Paper} from "@material-ui/core";
import CompanyModalContainer from "../containers/company/CompanyModalContainer";
import PossibleCustomerModalContainer from "../containers/possibleCustomer/PossibleCustomerModalContainer";
import CustomerTableContainer from "../containers/customer/CustomerTableContainer";

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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

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
    tabMagic:{
        fontWeight: 'bold',
        textcolor: 'red'
    }
}));

const CompanyInfoPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.tabMagic} position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="고객사 관리" {...a11yProps(0)} />
                    <Tab label="고객 관리" {...a11yProps(1)} />
                </Tabs
                    >
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction} className={classes.tabs}>
                    <div className={classes.tablepart}>
                        <Paper >
                            <Container maxWidth="lg" className={classes.container}>
                                <div >
                                    <CompanyTableContainer/>
                                    <CompanyModalContainer/>
                                </div>
                            </Container>
                        </Paper>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} className={classes.tabs}>
                    <div className={classes.tablepart}>
                        <Paper >
                            <Container maxWidth="lg" className={classes.container}>
                                <div >
                                    <CustomerTableContainer/>
                                    <PossibleCustomerModalContainer/>
                                </div>
                            </Container>
                        </Paper>
                    </div>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default CompanyInfoPage;