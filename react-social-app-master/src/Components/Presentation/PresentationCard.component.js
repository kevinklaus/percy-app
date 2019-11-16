import React from 'react';
import percy from '../../img/percy.svg';
import pointingPercy from '../../img/pointingPercy.svg';
import happyPercy from '../../img/happyPercy.svg';
import sadPercy from '../../img/sadPercy.svg';
import { Card, CardContent, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function PresentationCard(props) {
  const classes = useStyles();

  return (
    <Grow hidden={props.hidden} in={true} timeout={1000}>
      <div>
        {props.variant === 'percy' && (
          <img
            className="percy-chat-card"
            alt="percy"
            src={percy}
            style={{ height: 110 }}
          />
        )}
        {props.variant === 'pointingPercy' && (
          <img
            className="percy-chat-card"
            alt="percy"
            src={pointingPercy}
            style={{ height: 110 }}
          />
        )}
        {props.variant === 'sadPercy' && (
          <img
            className="percy-chat-card"
            alt="percy"
            src={sadPercy}
            style={{
              height: 150,
              marginLeft: -35,
              marginBottom: -25,
              marginTop: 0,
            }}
          />
        )}
        {props.variant === 'happyPercy' && (
          <img
            className="percy-chat-card"
            alt="percy"
            src={happyPercy}
            style={{
              height: 140,
              marginLeft: -35,
              marginBottom: -20,
              marginTop: 0,
            }}
          />
        )}
        <Card 
          className={props.color + " chat-card present"} 
          elevation={20}
        >
          <CardContent className="chat-text" component="div">
            <Typography variant={props.size} display="block">
              {typeof props.content === 'string'
                ? props.content
                : props.content()}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grow>
  );
}

export default PresentationCard;
