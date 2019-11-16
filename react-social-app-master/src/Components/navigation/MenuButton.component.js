import React from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import LogoutIcon from '@material-ui/icons/Clear';
import { Description, CancelPresentation } from '@material-ui/icons/';
import DemoIcon from '@material-ui/icons/Build';
import { connect } from 'react-redux';
import { userActions } from '../../actions/user.action';

const StyledMenu = withStyles({})(props => (
  <Menu
    elevation={6}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.common.white,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

/**
 * Menu button component for the Top Navigation bar.
 * Enabling the user to navigate between main views and functionalities of the app.
 **/
class NavigationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    console.log(this.props.history.location);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.dispatch(userActions.logout(this.props.history));
  };

  render() {
    return (
      <div>
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <StyledMenu
          id="customized-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.presenting && (
            <StyledMenuItem onClick={() => this.props.history.push('/')}>
              <ListItemIcon>
                <CancelPresentation />
              </ListItemIcon>
              <ListItemText primary="Finish Presenting" />
            </StyledMenuItem>
          )}
          <StyledMenuItem onClick={() => this.props.history.push('/demo')}>
            <ListItemIcon>
              <DemoIcon />
            </ListItemIcon>
            <ListItemText primary="Demo Controls" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => this.props.history.push('/privacy')}>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </StyledMenuItem>
          <StyledMenuItem onClick={this.handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    );
  }
}

export default withRouter(connect()(NavigationButton));
