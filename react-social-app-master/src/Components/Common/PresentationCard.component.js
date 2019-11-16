import React from 'react';
import percy from '../../img/percy.svg';
import pointingPercy from '../../img/pointingPercy.svg';
import happyPercy from '../../img/happyPercy.svg';
import sadPercy from '../../img/sadPercy.svg';
import { Card, CardContent, Grow } from '@material-ui/core';

/**
 * This component was made for presenting the app on Showtime
 * It includes ChatCards with text
 */
export class PresentationCard extends React.Component {
  render() {
    return (
      <Grow
        hidden={this.props.hidden}
        in={true}
        timeout={800}
        style={{
          transitionDelay: this.props.delay,
        }}
      >
        <div className={this.props.className}>
          {this.props.variant === 'percy' && (
            <img className="percy-chat-card" alt="percy" src={percy} />
          )}
          {this.props.variant === 'pointingPercy' && (
            <img className="percy-chat-card" alt="percy" src={pointingPercy} />
          )}
          {this.props.variant === 'sadPercy' && (
            <img
              className="percy-chat-card"
              alt="percy"
              src={sadPercy}
              style={{
                height: 80,
                marginLeft: -17,
                marginBottom: -23,
                marginTop: 0,
              }}
            />
          )}
          {this.props.variant === 'happyPercy' && (
            <img
              className="percy-chat-card"
              alt="percy"
              src={happyPercy}
              style={{
                height: 80,
                marginLeft: -15,
                marginBottom: -15,
                marginTop: 0,
              }}
            />
          )}
          <Card className={'chat-card ' + this.props.color} elevation={4}>
            <CardContent className="chat-text" component="div">
              {typeof this.props.content === 'string'
                ? this.props.content
                : this.props.content()}
            </CardContent>
          </Card>
        </div>
      </Grow>
    );
  }
}
