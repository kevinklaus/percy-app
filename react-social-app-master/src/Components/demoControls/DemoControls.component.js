import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import TopNavigation from '../navigation/TopNavigation.component';
import CustomSlider from '../Common/Slider.component';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './DemoControls.css';
import { bindActionCreators } from 'redux';
import { resetKarma } from '../../actions/contacts.action';
import { ChatCard } from '../Common/ChatCard.component';
import { withRouter } from 'react-router-dom';
import { groupIntervalFinish } from '../../actions';
/**
 */

let interval;

/**
 * This component was used to demonstrate and adjust Notification functionalities
 * during the Showtime. It also served as access point to our in-app presentation views.
 * @param {object} props - turn notification interval on/off for demo purpose
 * @param {boolean} props.switchOn - turn notification interval on/off for demo purpose
 * @param {number} props.notificationsPerMinute - notification interval
 */
class DemoControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOn: false,
      notificationsPerMinute: 10,
    };
  }
  clickStartPresenting = (props, history) => {
    history.push({
      pathname: 'presentation/start',
    });
  };

  showNotification = () => {
    if (Notification.permission === 'granted') {
      const title = 'Demo Notification from Percy';
      const options = {
        actions: [
          {
            action: 'back-to-app',
            title: 'Open Percy',
            icon: 'icon.ico',
          },
          {
            action: 'close',
            title: 'Close',
          },
        ],
        body: 'Lets checkout Percy!',
        icon: 'icon.ico',
        badge: 'icon.ico',
        tag: 'demo-notification', // reusing this tag closes already fired notifications
        renotify: true,
      };

      //var notification = new Notification(title, options);

      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, options);
      });
    }
  };

  switchNotification = e => {
    this.setState({ switchOn: e.target.checked });
    if (e.target.checked && !interval) {
      interval = setInterval(
        this.sendNotification,
        (60 / this.state.notificationsPerMinute
          ? this.state.notificationsPerMinute
          : 10) * 1000
      );
    } else if (!e.target.checked) {
      clearInterval(interval);
    } else if (e.target.checked) {
      clearInterval(interval);
      setInterval(
        interval,
        (60 / this.state.notificationsPerMinute
          ? this.state.notificationsPerMinute
          : 10) * 1000
      );
    }
  };

  setNotificationsPerMinute = (e, value) => {
    this.setState({ notificationsPerMinute: value });
    if (this.state.switchOn) {
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(this.sendNotification, (60 / value) * 1000);
    }
  };

  sendNotification = () => {
    if (Notification.permission === 'granted') {
      const title = 'Demo Notification from Percy';
      const options = {
        actions: [
          {
            action: 'open-group',
            title:
              'Open ' + this.props.groups && this.props.groups.length > 0
                ? this.props.groups[0].name
                : 'sample group',
            icon: 'icon.ico',
          },
          {
            action: 'close',
            title: 'Close',
          },
        ],
        body:
          'Interval for sample group has finished and restarted. Click to update interval.',
        icon: 'icon.ico',
        badge: 'icon.ico',
        tag: 'demo-notification', // reusing this tag closes already fired notifications
        renotify: true,
      };

      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, options);
      });
    }
  };

  renderControls = () => {
    return (
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.showNotification}
          >
            <span role="img" aria-label="emoji">
              🔥
            </span>
            Test Notification 📝
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.resetKarma(0)}
          >
            <span role="img" aria-label="emoji">
              ⏪
            </span>
            Reset Karma{' '}
            <span role="img" aria-label="emoji">
              🧘🏼‍♂️
            </span>
          </Button>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                onChange={this.switchNotification}
                color="secondary"
                inputProps={{ 'aria-label': 'Switch A' }}
              />
            }
            label="Turn Notifications ON/OFF"
          />
        </Grid>
        <Grid item>
          <CustomSlider
            color="primary"
            title="Notifications per minute"
            min={1}
            valueLabelDisplay="on"
            default={10}
            max={20}
            handleChange={this.setNotificationsPerMinute}
          />
        </Grid>
      </Grid>
    );
  };

  renderPresentationCard = () => {
    const { history } = this.props;

    return (
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.clickStartPresenting(this.props, history)}
          >
            <span role="img" aria-label="emoji">
              🔥
            </span>
            Start Presenting
          </Button>
        </Grid>
      </Grid>
    );
  };

  render() {
    return (
      <div>
        <TopNavigation showBackButton={true} />
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <ChatCard variant="percy" content={this.renderControls} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChatCard
              variant="pointingPercy"
              content={this.renderPresentationCard}
            />
          </Grid>
        </Grid>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetKarma: resetKarma,
      intervalFinished: groupIntervalFinish,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DemoControls));
