import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { ChatCard } from '../Common/ChatCard.component';
import { Button } from '@material-ui/core';
import { userActions } from '../../actions/user.action';
import { connect } from 'react-redux';
import { LoginButton } from '../login/LoginButton.component';
/**
 * This component represents a registration form for useres to create an account
 */
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: {
        firstname: false,
        lastname: false,
        email: false,
        username: false,
        password: false,
        passwordRepeat: false,
      },
    };
  }

  handleBlur = field => evt => {
    this.setState({ touched: { ...this.state.touched, [field]: true } });
  };

  validate = () => {
    return {
      username: {
        error: !this.state.username,
        show: !this.state.username && this.state.touched.username,
      },
      password: {
        error: !this.state.password,
        show: !this.state.password && this.state.touched.password,
      },
      firstname: {
        error: !this.state.firstname,
        show: !this.state.firstname && this.state.touched.firstname,
      },
      lastname: {
        error: !this.state.lastname,
        show: !this.state.lastname && this.state.touched.lastname,
      },
      email: {
        error: !this.state.email || this.state.email.indexOf('@') < 0,
        show:
          (!this.state.email || this.state.email.indexOf('@') < 0) &&
          this.state.touched.email,
      },
      passwordRepeat: {
        error: this.state.password !== this.state.passwordRepeat,
        show:
          this.state.password !== this.state.passwordRepeat &&
          this.state.touched.passwordRepeat,
      },
    };
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, firstname, lastname, email } = this.state;
    const { dispatch } = this.props;
    dispatch(
      userActions.register(
        { username, password, firstname, lastname, email },
        this.props.history
      )
    );
  };
  render() {
    const errors = this.validate();
    const isEnabled = !Object.keys(errors).some(x => {
      return errors[x].error;
    });

    return (
      <div>
        <ChatCard
          content="Hey Newbie! I'm happy to see you joining me in the mission to recharge social interactions! Please provide your details so we can get you set up!"
          variant="pointingPercy"
        />
        <Grid container justify="center" className="text-center">
          <Grid item>
            <form name="loginForm" onSubmit={this.handleSubmit}>
              <div>
                <TextField
                  // TODO: make responsive
                  onBlur={this.handleBlur('firstname')}
                  helperText={
                    errors.firstname.show ? 'This field is required' : ''
                  }
                  onChange={this.handleChange}
                  style={{ width: 250 }}
                  error={errors.firstname.show}
                  variant="outlined"
                  name="firstname"
                  label="First Name"
                  margin="normal"
                  required={true}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <TextField
                  // TODO: make responsive
                  onBlur={this.handleBlur('lastname')}
                  onChange={this.handleChange}
                  style={{ width: 250 }}
                  helperText={
                    errors.lastname.show ? 'This field is required' : ''
                  }
                  error={errors.lastname.show}
                  variant="outlined"
                  name="lastname"
                  label="Last Name"
                  margin="normal"
                  required={true}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <TextField
                  // TODO: make responsive
                  onBlur={this.handleBlur('email')}
                  onChange={this.handleChange}
                  style={{ width: 250 }}
                  helperText={
                    errors.email.show ? 'Not a valid email address' : ''
                  }
                  error={errors.email.show}
                  variant="outlined"
                  name="email"
                  label="Email"
                  required={true}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  // TODO: make responsive
                  onBlur={this.handleBlur('username')}
                  onChange={this.handleChange}
                  style={{ width: 250 }}
                  helperText={
                    errors.username.show ? 'This field is required' : ''
                  }
                  error={errors.username.show}
                  variant="outlined"
                  name="username"
                  label="Username"
                  required={true}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  // TODO: make responsive
                  onBlur={this.handleBlur('password')}
                  onChange={this.handleChange}
                  style={{ width: 250 }}
                  helperText={
                    errors.password.show ? 'This field is required' : ''
                  }
                  error={errors.password.show}
                  variant="outlined"
                  name="password"
                  label="Password"
                  margin="normal"
                  type="password"
                  required={true}
                  autoComplete="current-password"
                />
              </div>
              <div className="textField">
                <TextField
                  // TODO: make responsive
                  onBlur={this.handleBlur('passwordRepeat')}
                  onChange={this.handleChange}
                  style={{ width: 250 }}
                  helperText={
                    errors.passwordRepeat.show ? 'Passwords do not match' : ''
                  }
                  error={errors.passwordRepeat.show}
                  variant="outlined"
                  name="passwordRepeat"
                  label="Repeat Password"
                  margin="normal"
                  type="password"
                  required={true}
                  autoComplete="current-password"
                />
              </div>
              <Button
                disabled={!isEnabled}
                color="secondary"
                variant="contained"
                type="submit"
                style={{ width: 150, marginBottom: 16 }}
              >
                Register
              </Button>
            </form>
            <LoginButton route="login" text="Back to login" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect()(Register);
