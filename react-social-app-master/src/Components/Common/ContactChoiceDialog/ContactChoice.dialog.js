import React from 'react';
import { connect } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
  ListItemIcon,
  Checkbox,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import './contactChoice.css';
import InfiniteScroll from 'react-infinite-scroller';
import ToolSearchBar from '../searchBar.component';
import Fab from '@material-ui/core/Fab';
import { DoneOutline } from '@material-ui/icons';
import { createContact } from '../../../actions/contacts.action';
import { withRouter } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Small component rendering a dialog to choose from Google contacts
 * @param {object} props
 * @param {Number} props.radius - radius of the circle
 * @param {Number} props.stroke - thickness of the cirlce stroke
 * @param {Number} props.percentage - progress the circle will show in percentage from 0 to 100
 */
class ContactChoiceComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      checked: [],
      contacts: [],
      filteredContacts: [],
      hasMore: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const filteredContacts = nextProps.contacts;
      this.setState({
        modalIsOpen: nextProps.modalProps.googleContacts.open,
        contacts: filteredContacts.slice(0, 24),
        filteredContacts,
        currentStart: 0,
        currentEnd: 24,
        hasMore: true,
      });
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleToggle = value => {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  loadMore = () => {
    this.setState({
      currentStart: this.state.currentEnd,
      currentEnd: this.state.currentEnd + 25,
      contacts: this.state.contacts.concat(
        this.state.filteredContacts.slice(
          this.state.currentEnd,
          this.state.currentEnd + 25
        )
      ),
      hasMore:
        this.state.filteredContacts.length > this.state.currentEnd + 26
          ? true
          : false,
    });
  };

  closeButton = () => {
    return (
      <IconButton
        edge="start"
        color="inherit"
        onClick={this.closeModal}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
    );
  };

  search = event => {
    const filteredContacts = this.props.contacts.filter(c => {
      return (
        c.title.$t.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
      );
    });
    this.setState({
      filteredContacts,
      currentStart: 0,
      currentEnd: 24,
      hasMore: filteredContacts.length > 25 ? true : false,
      contacts: filteredContacts.slice(0, 24),
    });
  };

  sendContacts = () => {
    this.state.checked.forEach(contact => {
      const c = this.props.contacts.find(c => c.id.$t === contact);
      console.log(c);
      const name = c.title.$t.split(' ');
      let email = c.gd$email
        ? c.gd$email.find(e => e.primary) || c.gd$email[0]
        : null;
      if (email) {
        email = email.address;
      }
      const history = this.props.history;
      this.props.dispatch(
        createContact(
          {
            //image: img,
            email,
            firstName: name[0],
            lastName: name[1],
            phone:
              c.gd$phoneNumber && c.gd$phoneNumber.length > 0
                ? c.gd$phoneNumber.map(n => n.$t)
                : null,
            groupName: this.props.groupName,
          },
          c.id.$t.substring(c.id.$t.lastIndexOf('/') + 1),
          history,
          this.props.gapiToken,
          true,
          this.closeModal
        )
      );
    });
  };

  render() {
    if (!this.state.modalIsOpen) {
      return null;
    }
    return (
      <Dialog
        fullScreen
        open={this.state.modalIsOpen}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <ToolSearchBar
          color="primary"
          title="Contacts"
          leftButton={this.closeButton}
          onChange={this.search}
        />
        <InfiniteScroll
          className="dialog-list"
          hasMore={this.state.hasMore}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          loadMore={this.loadMore}
          useWindow={false}
        >
          <List>
            {this.state.contacts.map(contact => (
              <div
                key={contact.id.$t}
                onClick={() => this.handleToggle(contact.id.$t)}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={this.state.checked.indexOf(contact.id.$t) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': `checkbox-list-label-${contact.id.$t}`,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemAvatar>
                    <Avatar
                      id={contact.id.$t}
                      src={
                        contact.link[0].gd$etag
                          ? 'https://www.google.com/m8/feeds/photos/media/default/' +
                            contact.id.$t.substring(
                              contact.id.$t.lastIndexOf('/') + 1
                            ) +
                            '?access_token=' +
                            this.props.gapiToken
                          : ''
                      }
                    >
                      <span>
                        {contact.title.$t.substring(0, 1).toUpperCase()}
                      </span>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.title.$t}
                    secondary={
                      contact.gd$phoneNumber
                        ? contact.gd$phoneNumber[0].$t
                        : null
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </InfiniteScroll>
        <Fab
          onClick={() =>
            this.props.onSave
              ? this.props.onSave(
                  this.state.checked.map(contact =>
                    this.props.contacts.find(c => c.id.$t === contact)
                  ),
                  this.closeModal
                )
              : this.sendContacts()
          }
          color="primary"
          className="floating-action-right"
          aria-label="Send"
        >
          <DoneOutline />
        </Fab>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modal,
  contacts: state.googleContacts,
  gapiToken: state.user.gapiToken,
});

export default withRouter(connect(mapStateToProps)(ContactChoiceComponent));
