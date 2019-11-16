import React from 'react';
import '../groups.css';
import { connect } from 'react-redux';
import ContactImage from '../../Common/ContactImage/ContactImage.component';
import CustomSlider from '../../Common/Slider.component';
import { bindActionCreators } from 'redux';
import { changeInput, moveSlider, reassignGroup } from '../../../actions/index';
import {
  Grid,
  Button,
  TextField,
  GridList,
  GridListTile,
} from '@material-ui/core';
import TopNavigation from '../../navigation/TopNavigation.component';
import { ChatCard } from '../../Common/ChatCard.component';
import {
  groupsActions,
  requestGooglePermission,
} from '../../../actions/groups.action';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/PersonAdd';
import ContactChoiceDialog from '../../Common/ContactChoiceDialog/ContactChoice.dialog';
import Zoom from '@material-ui/core/Zoom';
import { styled } from '@material-ui/styles';

function renderContent(speech) {
  return <div>{speech}</div>;
}

/**
 * @memberof GroupSettings
 * transform: promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.

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

/**
 * Component for managing group settings
 */
class GroupSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max: 7,
      unit: 1,
      frequency: 1,
    };
    this.units = [
      { value: 0, label: 'day' },
      { value: 1, label: 'week' },
      { value: 2, label: 'month' },
      { value: 3, label: 'year' },
    ];
  }

  componentDidMount() {
    console.log(this.group);
    if (this.group) {
      this.props.reassignGroup(this.group);
      const unit = this.units.find(
        unit => unit.label === this.group.frequencyUnit
      ).value;
      this.setState({
        unit,
        frequency: this.group.frequency || 1,
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props !== this.props) {
      if (this.group) {
        this.props.reassignGroup(this.group);
        const unit = this.units.find(
          unit => unit.label === this.group.frequencyUnit
        ).value;
        this.setState({
          unit,
          frequency: this.group.frequency || 1,
        });
      }
    }
  }

  loadGroup = () => {
    this.group =
      this.props.group && Object.keys(this.props.group).length > 0
        ? this.props.group
        : null;
    console.log(this.group, this.props.groups);
    console.log(this.props.location);
    if (
      (!this.group || Object.keys(this.group).length < 1) &&
      this.props.groups
    ) {
      this.group = this.props.groups.find(
        g => g.name === this.props.match.params.name
      );
      this.props.reassignGroup(this.group);
      console.log(this.group);
    }
  };

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
    const startTimer =
      this.group.frequencyUnit !== this.units[unit].label ||
      this.group.frequency !== frequency;
    const oldName = this.props.match.params.name;
    this.props.editGroup(
      {
        startTimer,
        frequencyUnit: this.units[unit].label,
        frequency,
        name: groupNameValue,
      },
      oldName,
      this.props.history
    );
  };

  render() {
    this.loadGroup();
    return this.group ? (
      <div className="create-group margin-bottom-15">
        <TopNavigation showBackButton={true} />
        <form
          name="editGroupForm"
          className="edit-group-form"
          onSubmit={this.handleSubmit}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <ChatCard
                content={() =>
                  renderContent(
                    <div>
                      <p>You can change the name here</p>
                      <TextField
                        required={true}
                        fullWidth
                        variant="filled"
                        color="secondary"
                        type="text"
                        name="name"
                        label="Group name"
                        onChange={e =>
                          this.props.changeInput(e, 'groupNameValue')
                        }
                        value={this.props.groupNameValue}
                        placeholder="Group Name"
                      />
                    </div>
                  )
                }
                variant="percy"
              />
            </Grid>
            <Grid
              hidden={
                this.props.contacts.filter(
                  contact =>
                    contact.group === this.props.match.params.name.toLowerCase()
                ).length < 1
              }
              item
              xs={12}
              sm={6}
            >
              <ChatCard
                variant="pointingPercy"
                content={() =>
                  renderContent(
                    <div>
                      <div>These are the contacts in your group:</div>
                      <VerticalGridList cols={3.5}>
                        {this.props.contacts.map(contact =>
                          contact.group ===
                          this.props.match.params.name.toLowerCase() ? (
                            <VerticalGridListTile key={contact.id}>
                              <ContactImage
                                colspan={3}
                                key={contact.id}
                                id={contact.id}
                                name={contact.firstName}
                                {...contact}
                              />
                            </VerticalGridListTile>
                          ) : null
                        )}
                      </VerticalGridList>
                    </div>
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <ChatCard
                variant="pointingPercy"
                content={() =>
                  renderContent(
                    <div>
                      <p>
                        How often do you want to get in touch with{' '}
                        {this.props.groupNameValue}?
                      </p>

                      <CustomSlider
                        valueLabelDisplay="auto"
                        color="primary"
                        title={
                          this.state.frequency +
                          ' times per ' +
                          this.units[this.state.unit].label
                        }
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
          <Grid container justify="center" className="text-center">
            <Grid item>
              <Button
                style={{
                  marginTop: 16,
                }}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Save Changes to {this.props.groupNameValue}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify="center" className="text-center">
          <Grid item>
            <Button
              style={{
                marginTop: 16,
              }}
              variant="contained"
              color="default"
              onClick={() =>
                this.props.deleteGroup(
                  this.props.match.params.name,
                  this.props.history
                )
              }
            >
              Delete Group
            </Button>
          </Grid>
        </Grid>
        <Zoom
          in={true}
          timeout={1000}
          style={{
            transitionDelay: '1000ms',
          }}
          unmountOnExit
        >
          <Fab
            onClick={this.props.getGoogleContacts}
            color="secondary"
            className="floating-action-right"
            aria-label="Add"
            variant="extended"
          >
            <AddIcon style={{ marginRight: 8 }} /> Add
          </Fab>
        </Zoom>

        <ContactChoiceDialog groupName={this.group.name} />
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    groupNameValue: state.input.groupNameValue,
    group: state.group,
    groups: state.groups,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeInput: changeInput,
      moveSlider: moveSlider,
      editGroup: groupsActions.editGroup,
      deleteGroup: groupsActions.deleteGroup,
      getGoogleContacts: requestGooglePermission,
      reassignGroup: reassignGroup,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(GroupSettings);
