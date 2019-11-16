import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import ChipsArray from '../Common/ChipsArray.component';
import PresentationPageination from './PresentationPageination.component';



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

  renderCard() {
    return (
      <div>
        A question. Please raise your hand!
      </div>
    );
  }

  renderCard2() {
    return (
      <em>
        Have you ever forgotten to contact someone you care about?
      </em>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
              <PresentationCard
                size="h5"
                content={this.renderCard} 
                variant="pointingPercy" 
              />
          </Grid>
        </Grid>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
              <PresentationCard
                size="h4"
                content={this.renderCard2} 
                variant="percy" 
                color="secondary" 
              />
          </Grid>
        </Grid>
        <PresentationPageination prev="team" next="survey"/>
      </div>
    );
  }
}


export default Presentation;
