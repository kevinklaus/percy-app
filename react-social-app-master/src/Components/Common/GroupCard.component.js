import React from 'react';
import ContactImage from './ContactImage/ContactImage.component';
import { connect } from 'react-redux';
import Grow from '@material-ui/core/Grow';
import { openGroupSettings } from '../../actions/index';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router-dom';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Settings from '@material-ui/icons/Settings';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
function renderContacts(props) {
  let contactsInGroup = props.contacts.filter(
    contact => contact.group === props.name.toLowerCase()
  );
  if (contactsInGroup.length > 0) {
    return contactsInGroup.map((contact, i) => (
      <ContactImage key={i} withkarma="true" width={70} {...contact} />
    ));
  } else return <div className="no-content">Nobody here right now</div>;
}
/**
 * This function navigates to the group settings
 * @memberof GroupCard
 * @param {object} props
 * @param {object} history
 */
function clickGroupSettings(props, history) {
  props.dispatch(openGroupSettings(props.group, props.name, 'groupNameValue'));
  history.push({
    pathname: `groups/${props.name}/settings`,
    state: { groupName: props.name },
  });
}

/**
 * Component to render a card containing group specific info
 * @param {object} props
 * @param {string} props.name - group name
 * @param {Number} props.value - current percentage for progress bar
 */
function GroupCard(props) {
  const { history } = props;

  return (
    <Grow timeout={1200} in={true} mountOnEnter unmountOnExit>
      <div className="group-card">
        <ExpansionPanel
          expanded={props.open}
          onChange={props.handleChange('panel' + props.number)}
          elevation={4}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            IconButtonProps={{ color: 'secondary' }}
            aria-controls={'panel' + props.number + 'bh-content'}
            id={'panel' + props.number + 'bh-header'}
          >
            <Typography onClick={() => clickGroupSettings(props, history)}>
              {props.name.toUpperCase()}
              <Settings fontSize="small" style={{ marginLeft: 8 }} />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify="flex-start" spacing={0}>
              {renderContacts(props)}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <div>
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={props.group.value}
          />
        </div>
      </div>
    </Grow>
  );
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
  };
}

export default connect(mapStateToProps)(withRouter(GroupCard));
