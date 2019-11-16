import React from 'react';
import KarmaCircle from './KarmaCircle.compnent';
import { connect } from 'react-redux';
import { clickContactImage } from '../../../actions/index';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: 5,
    marginBottom: 10,
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.dark,
    fontSize: 20,
  },
  bigAvatar: {
    margin: 20,
    marginTop: 0,
    width: 100,
    height: 100,
    backgroundColor: theme.palette.primary.dark,
    fontSize: 40,
  },
}));

/**
 * Small component rendering a contact image in a circle
 * @class
 * @param {Object} props
 * @param {string} props.firstName - the first name
 * @param {string} props.lastName - the last name
 * @param {string} props.image - base64 representation of Google contact image
 * @param {boolean} props.noClick - If the image should be clickable
 * @param {object} props.history - router history for navigation
 * @param {Number} props.karma - the karma value of the contact
 * @param {boolean} props.withkarma - boolean to show/hide karma circle
 * @param {strint} props.variant - 'bigAvatar' for larger contact image or undefined for standard size
 * @returns {React.Component} an instance of ContactImage
 */
function ContactImage(props) {
  const classes = useStyles();
  const percentage = props.karma > 1 ? 1 : props.karma;
  const width = props.variant === 'bigAvatar' ? 130 : 76;
  const thickness = props.variant === 'bigAvatar' ? 6 : 3;

  return (
    <Grow timeout={1000} in={true} mountOnEnter unmountOnExit>
      <div
        className="contact-container"
        onClick={() =>
          !props.noClick ? props.clickContactImage(props, props.history) : null
        }
      >
        {props.withkarma ? (
          <KarmaCircle
            variant={props.variant}
            radius={width / 2}
            thickness={thickness}
            percentage={percentage * 100 || 0.1}
          />
        ) : null}
        <Avatar
          className={
            props.variant == 'bigAvatar' ? classes.bigAvatar : classes.avatar
          }
          src={
            props.image !== ''
              ? 'data:image/png;base64,' +
                props.image
                  .substring(2, props.image.length - 1)
                  .split('\\n')
                  .join('')
              : ''
          }
        >
          {props.image === '' ? (
            <span>
              {props.firstName
                ? props.firstName.substring(0, 1).toUpperCase()
                : ''}
              {props.lastName
                ? props.lastName.substring(0, 1).toUpperCase()
                : ''}
            </span>
          ) : null}
        </Avatar>
      </div>
    </Grow>
  );
}
/**
 * Redux function for passing parts of state to component
 * @param {object} state the redux state
 */
function mapStateToProps(state) {
  return {};
}

/**
 * Redux function for passing action creators to component
 * @param {function} dispatch the redux dispatch function
 */
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ clickContactImage: clickContactImage }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(ContactImage)
);
