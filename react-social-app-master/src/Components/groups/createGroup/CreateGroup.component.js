import React from 'react';
import { connect } from 'react-redux';
import CustomSlider from '../../Common/Slider.component.js';
import { bindActionCreators } from 'redux';
import { changeInput, clickButton, moveSlider } from '../../../actions/index';
import {
  Grid,
  Button,
  TextField,
  GridList,
  GridListTile,
} from '@material-ui/core';
import TopNavigation from '../../navigation/TopNavigation.component';
import { ChatCard } from '../../Common/ChatCard.component';
import AddIcon from '@material-ui/icons/PersonAdd';
import {
  requestGooglePermission,
  createGroup,
} from '../../../actions/groups.action';
import ContactChoiceDialog from '../../Common/ContactChoiceDialog/ContactChoice.dialog';
import ContactImage from '../../Common/ContactImage/ContactImage.component';
import { createContact } from '../../../actions/contacts.action';
import { styled } from '@material-ui/core/styles';
/**  
 *  transform: Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
 */
const VerticalGridList = styled(GridList)({
  flexWrap: 'nowrap',
  transform: 'translateZ(0)',
  height: '80px',
  paddingTop: '8px',
  marginLeft: '8px !important',
  marginRight: '8px !important',
});

const VerticalGridListTile = styled(GridListTile)({
  height: '100% !important',
});

function renderContent(speech) {
  return <div>{speech}</div>;
}

/**
 * Renders the createGroup component including child components.
 */
class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 7,
      unit: 1,
      frequency: 1,
      selectedContacts: [],
    };
    this.units = [
      { value: 0, label: 'day' },
      { value: 1, label: 'week' },
      { value: 2, label: 'month' },
      { value: 3, label: 'year' },
    ];
  }

  unitValueFormat = value => {
    return this.units[value] ? this.units[value].label : value;
  };

  updateUnit = (e, newValue) => {
    console.log(
      this.units.find(unit => unit.value === newValue),
      newValue,
      this,
      e
    );
    let unit = this.units.find(unit => unit.value === newValue).label;
    this.setState({ unit: newValue });
    switch (unit) {
      case 'week': {
        this.setState({ max: 7 }, updateSlider);
        break;
      }
      case 'day': {
        this.setState({ max: 5 }, updateSlider);
        break;
      }
      case 'month': {
        this.setState({ max: 4 }, updateSlider);
        break;
      }
      case 'year': {
        this.setState({ max: 12 }, updateSlider);
        break;
      }
      default: {
        this.setState({ max: 7 }, updateSlider);
      }
    }

    function updateSlider() {
      let frequency =
        this.state.frequency < this.state.max
          ? this.state.frequency
          : this.state.max;
      this.setState({ frequency });
    }
  };

  handleFreqChange = (e, newValue) => this.setState({ frequency: newValue });

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { unit, frequency } = this.state;
    const { groupNameValue } = this.props;
    this.props.createGroup(
      {
        frequencyUnit: this.units[unit].label,
        frequency,
        name: groupNameValue.toLowerCase(),
      },
      this.props.history,
      this.createContacts
    );
  };

  createContacts = () => {
    this.state.selectedContacts.forEach(contact => {
      contact.groupName = this.props.groupNameValue.toLowerCase();
      this.props.createContact(
        contact,
        contact.googleId,
        this.props.history,
        this.props.gapiToken
      );
    });
  };

  onSave = (contacts, closeModal) => {
    const contactsToSave = contacts.map(c => {
      const name = c.title.$t.split(' ');
      let email = c.gd$email
        ? c.gd$email.find(e => e.primary) || c.gd$email[0]
        : null;
      if (email) {
        email = email.address;
      }
      return {
        googleId: c.id.$t.substring(c.id.$t.lastIndexOf('/') + 1),
        firstName: name[0],
        lastName: name[1],
        phone:
          c.gd$phoneNumber && c.gd$phoneNumber.length > 0
            ? c.gd$phoneNumber.map(n => n.$t)
            : null,
        image: '',
        email,
      };
    });
    this.setState({ selectedContacts: contactsToSave });
    closeModal();
  };

  render() {
    return (
      <div className="create-group margin-bottom-15">
        <TopNavigation showBackButton={true} />
        <form name="createGroupForm" onSubmit={this.handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ChatCard
                content={() =>
                  renderContent(
                    <div>
                      <p>Start by giving your group a name</p>
                      <TextField
                        required={true}
                        fullWidth
                        variant="filled"
                        color="secondary"
                        type="text"
                        name="name"
                        label="Group name"
                        onChange={e =>
                          this.props.changeInput(e, 'createGroupNameValue')
                        }
                        value={this.props.groupNameValue}
                        placeholder="Group Name"
                      />
                    </div>
                  )
                }
                variant="percy"
              />

              <ChatCard
                hidden={this.state.selectedContacts.length > 0}
                content={() =>
                  renderContent(
                    <div>
                      <p>
                        Currently I support adding contacts from your Google
                        Account.
                      </p>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Button
                            disabled={this.props.groupNameValue.length < 1}
                            variant="contained"
                            color="secondary"
                            onClick={this.props.getGoogleContacts}
                          >
                            <AddIcon style={{ marginRight: 8 }} /> Add Contacts
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  )
                }
                variant="noPercy"
              />
              <ChatCard
                hidden={this.state.selectedContacts.length === 0}
                content={() =>
                  renderContent(
                    <div>
                      <div>
                        I added your contacts. Start collecting Karma by
                        contacting them!
                      </div>
                      <VerticalGridList cols={3.5}>
                        {this.state.selectedContacts.map((contact, i) => (
                          <VerticalGridListTile key={i}>
                            <ContactImage
                              noClick
                              colspan={3}
                              key={i}
                              id={contact.id}
                              name={contact.firstName}
                              {...contact}
                            />
                          </VerticalGridListTile>
                        ))}
                      </VerticalGridList>
                    </div>
                  )
                }
                variant="happyPercy"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ChatCard
                variant="pointingPercy"
                content={() =>
                  renderContent(
                    <div>
                      <p>
                      How often do you want to get in touch?
                      I will set a Karma goal for the group and will remind you if you lag behind.
                      You can come back and adjust this any time.</p>
                      <CustomSlider
                        title={
                          this.state.frequency +
                          ' times per ' +
                          this.units[this.state.unit].label
                        }
                        valueLabelDisplay="on"
                        color="primary"
                        min={1}
                        value={this.state.frequency}
                        max={this.state.max}
                        handleChange={(e, newValue) =>
                          this.props.moveSlider(
                            e,
                            newValue,
                            'frequency',
                            this.handleFreqChange
                          )
                        }
                      />
                      <CustomSlider
                        className="first-slider"
                        min={0}
                        minText={this.units[0].label}
                        value={this.state.unit}
                        max={3}
                        color="primary"
                        marks={this.units}
                        /* valueLabelFormat={this.unitValueFormat} */
                        maxText={this.units[3].label}
                        handleChange={(e, newValue) =>
                          this.props.moveSlider(
                            e,
                            newValue,
                            'frequency',
                            this.updateUnit
                          )
                        }
                      />
                    </div>
                  )
                }
              />
            </Grid>
          </Grid>

          <Grid container justify="center" style={{ marginTop: 32 }}>
            <Grid item>
              <Button
                disabled={this.props.groupNameValue.length < 1}
                type="submit"
                variant="contained"
                color="secondary"
                elevation={10}
              >
                Create Group {this.props.groupNameValue}
              </Button>
            </Grid>
          </Grid>
        </form>
        <ContactChoiceDialog onSave={this.onSave} />
      </div>
    );
  }
}

function updateInput(e) {
  console.log('Group name updated:', e.target.value, 'needs action');
  this.setState({ groupNameValue: e.target.value });
}

function mapStateToProps(state) {
  console.log(state);
  return {
    contacts: state.contacts,
    groupNameValue: state.input.createGroupNameValue,
    googleContacts: state.googleContacts,
    gapiToken: state.user.gapiToken,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeInput: changeInput,
      clickButton: clickButton,
      moveSlider: moveSlider,
      getGoogleContacts: requestGooglePermission,
      createGroup: createGroup,
      createContact: createContact,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(CreateGroup);
