import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import ContactImage from './ContactImage/ContactImage.component';
import ContactButtons from './ContactButtons.component';
import { connect } from 'react-redux';
import { ChatCard } from '../Common/ChatCard.component';
import TopNavigation from '../navigation/TopNavigation.component';
import ChipsArray from './ChipsArray.component';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import * as contactsActions from '../../actions/contacts.action';
import { demoActions } from '../../actions/demo.actions';
import { groupsActions } from '../../actions/groups.action';
import { reassignContact } from '../../actions';

let number = 0;
let firstName,
  lastName = 'Name';

/**
 * ContactView component shows the profile of the contact.
 * It contains the picture of the contact, the name of the contact, the communication tools,
 * 2 chatCards and a button to for contact deletion
 */
class ContactView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      answered: false,
    };
  }

  /**
   * This function loads the contact and makes it upper case
   * @memberof ContactView
   */
  loadContact = () => {
    this.contact =
      Object.keys(this.props.contact).length > 0 ? this.props.contact : null;
    if (
      !this.contact ||
      this.contact.id !== parseInt(this.props.match.params.id)
    ) {
      this.contact = this.props.contacts.find(
        c => c.id == parseInt(this.props.match.params.id)
      );
    }
    if (this.contact) {
      this.props.reassignContact(this.contact);
      number = this.contact.tel1;
      firstName =
        this.contact.firstName.charAt(0).toUpperCase() +
        this.contact.firstName.slice(1);
      lastName =
        this.contact.lastName.charAt(0).toUpperCase() +
        this.contact.lastName.slice(1);
    }
  };

  /**
   * This function increases the karma of the contact.
   * It is called by clicking on the YES button
   * @memberof ContactView
   */

  answerPercyYes = () => {
    this.setState({ answered: true });
    const group = this.props.groups.find(g => g.name === this.contact.group);
    this.props.increaseKarma(this.contact, group);
  };
  /**
   * This function renders the second chat card and checks if the user has been in touch with the contact.
   * @memberof ContactView
   */
  renderBeenInTouch = () => {
    return (
      <div className="margin-bottom-15">
        <Grid container>
          <p>Have you been in touch with {firstName} lately?</p>
        </Grid>
        <Grid container justify="flex-end" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.setState({ answered: true })}
            >
              No
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={this.answerPercyYes}
              variant="contained"
              color="secondary"
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
  /**
   * This function lists the topics which the user added.
   * @memberof ContactView
   */
  renderTopics = () => {
    return (
      <div>
        <p>{firstName} and you talked about this:</p>
        <Grid container justify="flex-start">
          <ChipsArray />
        </Grid>
      </div>
    );
  };

  render() {
    this.loadContact();
    return this.contact ? (
      <div className="withBackground">
        <TopNavigation showBackButton={true} />
        <Grid container justify="center">
          <ContactImage
            withkarma="true"
            variant="bigAvatar"
            key={this.contact.id}
            styles={{ marginTop: -50 }}
            {...this.contact}
          />
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" display="block">
              {firstName + ' ' + lastName}
            </Typography>
          </Grid>
          <ContactButtons />
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <ChatCard content={this.renderTopics} variant="pointingPercy" />
          </Grid>
          {!this.state.answered ? (
            <Grid item xs={12} sm={6}>
              <ChatCard content={this.renderBeenInTouch} variant="percy" />
            </Grid>
          ) : null}
        </Grid>
        <Grid container justify="center" className="text-center">
          <Grid item>
            <Button
              style={{ margin: 40 }}
              variant="contained"
              color="default"
              onClick={() =>
                this.props.deleteContact(this.contact.id, this.props.history)
              }
            >
              Delete Contact
            </Button>
          </Grid>
        </Grid>
      </div>
    ) : null;
  }
}
function mapStateToProps(state) {
  return {
    contact: state.contact,
    contacts: state.contacts,
    groups: state.groups,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteContact: contactsActions.deleteContact,
      increaseKarma: demoActions.increaseKarma,
      calculateGroupKarma: groupsActions.calculateGroupKarma,
      reassignContact: reassignContact,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ContactView);
