import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { ChatCard } from '../Common/ChatCard.component';
import { Button } from '@material-ui/core';
import { RegisterButton } from '../register/RegisterButton.component';
import { userActions } from '../../actions/user.action';
import { connect } from 'react-redux';

import withSplashScreen from '../SplashScreen/SplashScreen.component';
/**
 *  Login component containing
 *  a login form for username, password
 *  and a submit button
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };
  }

  /**
   * Function that handles changes of the value
   * of the username textfield.
   * @memberof Login
   */
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * Function that handels pressing the submit button.
   * Takes values of username and password and provides them
   * to the login action.
   @memberof Login
   */
  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password, this.props.history));
    }
  };

  render() {
    return (
      <div className="fixed-background">
        <Grid container justify="center">
          <Grid item xs={8} sm={4}>
            <ChatCard
              style={{ marginTop: 40 }}
              content="Have we met?"
              variant="pointingPercy"
            />
          </Grid>
        </Grid>
        <form name="loginForm" onSubmit={this.handleSubmit}>
          <Grid container justify="center">
            <Grid item>
              <TextField
                onChange={this.handleChange}
                style={{ width: 200, marginTop: 40 }}
                variant="outlined"
                name="username"
                label="User name"
                margin="normal"
                required={true}
                value={this.state.username}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <TextField
                onChange={this.handleChange}
                style={{ width: 200 }}
                variant="outlined"
                name="password"
                label="Password"
                margin="normal"
                type="password"
                required={true}
                autoComplete="current-password"
                value={this.state.password}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                style={{ width: 200, margin: 16, marginTop: 40 }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify="center">
          <Grid item>
            <RegisterButton route="register" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect()(withSplashScreen(Login));
