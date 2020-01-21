import React from 'react';
import { Route } from 'react-router-dom';
import { OrgInfoPage, ContInfoPage, MeetingInfoPage, PossibleCustomerInfoPage, LoginPage } from 'pages';
import { ContCustInfoPage, ProductInfoPage, ManagerInfoPage, PossibleContInfoPage } from "pages";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      fontFamily: [
        '"Noto Sans KR"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  },
}))
const App = () => {
  useStyles();

  return (
    <div>
      <CssBaseline />
      <Route exact path="/" component={LoginPage} />
      <Route path="/cont" component={ContInfoPage} />
      <Route path="/contcust" component={ContCustInfoPage} />
      <Route path="/product" component={ProductInfoPage} />
      <Route path="/manager" component={ManagerInfoPage} />
      <Route path="/possiblecustomer" component={PossibleCustomerInfoPage} />
      <Route path="/org" component={OrgInfoPage} />
      <Route path="/possiblecont" component={PossibleContInfoPage} />
      <Route path="/meeting" component={MeetingInfoPage} />
    </div>
  );
}

export default App;
