import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { LoginPage } from "pages";
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

}));

  const Login = () => {
    // eslint-disable-next-line
    const classes = useStyles();

    return (
      <div>
            <Route exact path="/" component={LoginPage} />
      </div>
    );
  }

export default Login;
