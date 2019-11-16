import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import ChipsArray from '../Common/ChipsArray.component';
import PresentationPageination from './PresentationPageination.component';
import romy from '../../img/contacts/romy.jpg';
import mark from '../../img/contacts/mark.jpg';
import kev from '../../img/contacts/kev.jpg';
import guelcan from '../../img/contacts/guelcan.jpg';
import kat from '../../img/contacts/kat.jpg';
import pavel from '../../img/contacts/pavel.jpg';
import Avatar from '@material-ui/core/Avatar';

const images = [romy, mark, kev, guelcan, kat, pavel];


class Presentation extends React.Component {

  _detectArrowKeyPresses = (event) => { 
    switch (event.keyCode) {
      case 37:
        console.log('Prev key pressed');
        document.getElementById("prev-button").click();
        break;
      case 39:
        console.log('Next key pressed');
        document.getElementById("next-button").click();
        break;
    }
  };

  componentDidMount(){
    document.addEventListener("keydown", this._detectArrowKeyPresses);
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this._detectArrowKeyPresses);
  };

  renderBeenInTouch() {
    return (
      <div>
        <Grid container>
          <p>Have you been in touch with lately?</p>
        </Grid>
        <Grid container justify="flex-end" spacing={1}>
          <Grid item>
            <Button variant="contained" color="secondary">
              No
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">
              Yes
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-start">
          <ChipsArray />
        </Grid>
      </div>
    );
  }

  renderCard() {
    return (
      <div>
        <p>Team Percy:</p>
        <Grid container spacing={4} justify="space-around">
            { images.map((src, i) => (
                <Grid item key={i} >
                  <Avatar alt="team" src={src} key={i} style={{width: 120, height: 120}}/>
                </Grid>
              ))
            }
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={8} md={7} lg={6} xl={4}>
              <PresentationCard
                style={{marginTop: -20}}
                size="h4"
                content={this.renderCard} 
                variant="pointingPercy" 
              />
          </Grid>
        </Grid>
        <PresentationPageination prev="start" next="question"/>
      </div>
    );
  }
}


export default Presentation;
