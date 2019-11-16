import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuButton from './MenuButton.component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickBackButton, reassignContact } from '../../actions';
import { fade, makeStyles } from '@material-ui/core/styles';
import { showModal } from '../../actions/modal.actions';
import { List, ListItem, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listRoot: {
    maxHeight: 300,
    overflow: 'auto',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.3),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: 0,
      '&:focus': {
        width: 200,
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: 150,
      '&:focus': {
        width: 250,
      },
    },
  },
}));

/**
 * This function filters the users contacts.
 * @memberof TopNavigation
 * @param {object} props - properties containing the contacts
 * @param {object} filter - filter to apply
 * @returns - filtered contacts
 */
function filterContacts(props, filter) {
  if (!filter) {
    return props.contacts;
  }
  return props.contacts.filter(contact =>
    (contact.firstName + ' ' + contact.lastName)
      .toLowerCase()
      .includes(filter.toLowerCase())
  );
}

const onChange = (props, setResults) => e => {
  if (e.target.value.length >= 1) {
    setResults(filterContacts(props, e.target.value));
  } else {
    setResults([]);
  }
};

/**
 * Function that calls a certain contact view
 * @memberof TopNavigation
 * @param {object} contact - The contact whose view is to be called
 * @param {object} history - history stack for navigation
 * @param {function} assignContact
 */
const toContact = (contact, history, assignContact) => {
  assignContact(contact);
  history.push('/groups/contact/' + contact.id);
};

/**
 * Function assigning the heading text to the Navigation Bar.
 * @memberof TopNavigation
 * @param {string} path - current path
 * @param {object} props - properties
 * @returns {string} - heading of the current view
 */
function getTitle(path, props) {
  console.log(path);
  if (path.includes('/groups/contact/')) {
    return 'Contact';
  }
  switch (path) {
    case '/':
      return 'Percy App';
    case '/groups/create':
      return 'Create Group';
    case (path.match(/settings/) || {}).input:
      return 'Group Settings';
    case '/demo':
      return 'Demo Controls';
    case '/privacy':
      return 'PRIVACY POLICY';
    case (path.match(/presentation/) || {}).input:
      return 'Presenting Percy';
    default:
      return '';
  }
}
/**
 * Navigation-bar component - fixed on top of component view of the app.
 * Contains MenuButton, SearchBar and a label, that communicates the current
 * view of the app to the user.
 * @namespace
 * @name TopNavigation
 */
function TopNavigation(props) {
  const classes = useStyles();
  const { match, location, history } = props;
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(props.contacts);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          {!props.showBackButton ? (
            <MenuButton presenting={props.presenting} />
          ) : (
            <IconButton
              edge="start"
              aria-label="Open drawer"
              onClick={() => {
                history.length <= 1 || location.pathname.includes('demo')
                  ? history.push('/')
                  : history.goBack();
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            {getTitle(history.location.pathname, props)}
          </Typography>
          <div
            hidden={location.pathname.includes('groups/contact')}
            className={classes.search}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onFocus={() => setSearchResultsOpen(true)}
              onChange={onChange(props, setSearchResults)}
              onBlur={() => setTimeout(() => setSearchResultsOpen(false), 100)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
        </Toolbar>
        <List
          classes={{ root: classes.listRoot }}
          hidden={!searchResultsOpen || searchResults.length < 1}
        >
          {searchResults.map(contact => (
            <div key={contact.id}>
              <ListItem
                button
                onClick={() =>
                  toContact(contact, history, props.reassignContact)
                }
              >
                {contact.firstName}
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </AppBar>
      {/* use this empty toolbar to move contents underneath appbar so that it's not hidden behind it */}
      <Toolbar />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    contact: state.contact,
    contacts: state.contacts,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      clickBackButton: clickBackButton,
      openContactSearch: showModal,
      reassignContact: reassignContact,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(TopNavigation));
