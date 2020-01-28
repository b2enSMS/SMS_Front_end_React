import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { OrgInfoPage, ContInfoPage, MeetingInfoPage, PossibleCustomerInfoPage, LoginPage } from 'pages';
import { ContCustInfoPage, ProductInfoPage, ManagerInfoPage, PossibleContInfoPage } from "pages";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import PropTypes from 'prop-types';
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
const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLoggedIn = sessionStorage.getItem('auth');
  return (
    <Route
      {...rest}
      render={(props) => (
        userLoggedIn
          ? <Component {...props} />
          : (
            <Redirect to={{
              pathname: '/login',
            }}
            />
          )
      )}
    />
  );
};

// PrivateRoute.propTypes = {
//   component: PropTypes.elementType.isRequired,
// };
const App = () => {
  useStyles();
  return (

    <div>
      <CssBaseline />
      <Switch>
        <PrivateRoute exact path="/" component={ContInfoPage} />
        <PrivateRoute exact path="/cont" component={ContInfoPage} />
        <PrivateRoute exact path="/contcust" component={ContCustInfoPage} />
        <PrivateRoute exact path="/product" component={ProductInfoPage} />
        <PrivateRoute exact path="/manager" component={ManagerInfoPage} />
        <PrivateRoute exact path="/possiblecustomer" component={PossibleCustomerInfoPage} />
        <PrivateRoute exact path="/org" component={OrgInfoPage} />
        <PrivateRoute exact path="/possiblecont" component={PossibleContInfoPage} />
        <PrivateRoute exact path="/meeting" component={MeetingInfoPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
