import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
  const user = localStorage.getItem('user');
  return (

    <div>
      <CssBaseline />
      <Switch>
        <Route exact path="/">{user ? <ContInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/cont">{user ? <ContInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/contcust">{user ? <ContCustInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/product">{user ? <ProductInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/manager">{user ? <ManagerInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/possiblecustomer">{user ? <PossibleCustomerInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/org">{user ? <OrgInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/possiblecont">{user ? <PossibleContInfoPage /> : <Redirect to="/login" />}</Route>
        <Route exact path="/meeting">{user ? <MeetingInfoPage /> : <Redirect to="/login" />}</Route>
        <Route path="/login" component={LoginPage} />
        {/* <Route path="/cont" component={ContInfoPage} />
        <Route path="/contcust" component={ContCustInfoPage} />
        <Route path="/product" component={ProductInfoPage} />
        <Route path="/manager" component={ManagerInfoPage} />
        <Route path="/possiblecustomer" component={PossibleCustomerInfoPage} />
        <Route path="/org" component={OrgInfoPage} />
        <Route path="/possiblecont" component={PossibleContInfoPage} />
        <Route path="/meeting" component={MeetingInfoPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
