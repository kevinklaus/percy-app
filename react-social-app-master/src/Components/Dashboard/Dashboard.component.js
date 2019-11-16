/* eslint-disable no-undef */
import React from 'react';
import ContactImage from '../Common/ContactImage/ContactImage.component';
import GroupCard from '../Common/GroupCard.component';
import { ChatCard } from '../Common/ChatCard.component';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import CreateGroupFab from './CreateGroupFab.component';
import ContactButtons from '../Common/ContactButtons.component';
import { reassignContact } from '../../actions';
import { userService } from '../../services/user.service';
/**
 * Main Dashboard of the App
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appearContact: true,
      expanded: false,
    };
  }

  componentDidMount() {
    if (['iPhone', 'iPad', 'iPod'].indexOf(navigator.platform) === -1) {
      Notification.requestPermission();
    }
  }

  renderGetInTouchWith = () => {
    let contacts = this.props.contacts;

    contacts.sort(function(a, b) {
      return a.karma - b.karma;
    });

    return (
      <div>
        <p>
          Hi <em>{userService.getUserInfo().username}</em>! It's high time to
          get in touch with:
        </p>
        <Grid container className="speech-container">
          {contacts.slice(0, 4).map((contact, i) => (
            <Grid item key={i}>
              <ContactImage withkarma={true} key={contact.id} {...contact} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };

  /**
   * This function renders random texts as reminders,
   * selects a random contact and provides with communication tools.
   */
  renderReminders = () => {
    let index = Math.floor(
      Math.random() * Math.floor(this.props.contacts.length - 1)
    );

    let contact = this.props.contacts[index];
    const reminderTopics = [
      'will be starting a new job next Monday!',
      'had exams last week!',
      'is gonna be back from vacation tomorrow!',
      'went to see the concert on last Saturday!',
      'will be leaving for the festival on Friday!',
      'is graduating from university soon.',
    ];

    let rand = Math.floor(Math.random() * (reminderTopics.length - 1));
    console.log(rand, index);

    if (contact) {
      this.props.dispatch(reassignContact(contact));
      let name = contact.firstName;
      // name += name.slice(-1) === 's' ? '\'' : 's';

      return (
        <div>
          <p>
            {name} {reminderTopics[rand]}
            <br />
            Would you like to chat?
          </p>
          <Grid container justify="center">
            <Grid item>
              <ContactButtons contact={contact} />
            </Grid>
          </Grid>
        </div>
      );
    } else return null;
  };

  handleChange = panel => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };

  /**
   * Renders the dashboard including child components.
   */
  render() {
    return (
      <div style={{ paddingBottom: 100 }} className="fixed-background">
        {this.props.groups.length > 0 ? (
          <Grid
            container
            spacing={0}
            style={{ marginTop: 16, marginBottom: 8 }}
          >
            {this.props.groups
              .sort((g1, g2) => {
                if (g1.name < g2.name) {
                  return -1;
                }
                if (g1.name > g2.name) {
                  return 1;
                }
                return 0;
              })
              .map((group, i) => (
                <Grid item key={i} xs={12} sm={6}>
                  <GroupCard
                    number={i}
                    name={group.name}
                    value={group.value}
                    group={group}
                    open={this.state.expanded === 'panel' + i}
                    handleChange={this.handleChange}
                  />
                </Grid>
              ))}
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <ChatCard
                  content={this.renderGetInTouchWith}
                  variant="sadPercy"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ChatCard content={this.renderReminders} variant="happyPercy" />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ChatCard
                content="I couldn't find any groups or contacts. Start by adding one!"
                variant="sadPercy"
                color="secondary"
              />
            </Grid>
          </Grid>
        )}
        <CreateGroupFab />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    groups: state.groups,
  };
}

export default connect(mapStateToProps)(Dashboard);
