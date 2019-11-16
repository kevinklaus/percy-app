import React from 'react';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
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
        <Grid container spacing={8}  justify="center" alignItems="center">
          <Grid item>
            Hi, I'm Percy!
          </Grid>
        </Grid>
      </div>
    );
  }

  renderCard2() {
    return (
      <div>
        <Grid container spacing={8}  justify="center" alignItems="center">
          <Grid item>
            <em>
              Start collecting Karma and revive authentic social interactions!
            </em>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid container  spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={5}>
              <PresentationCard
                size="h2"
                content={this.renderCard} 
                variant="percy" 
              />
          </Grid>
        </Grid>
        <Grid container  spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={5}>
              <PresentationCard
                size="h4"
                content={this.renderCard2} 
                variant="pointingPercy" 
                color="secondary"
              />
          </Grid>
        </Grid>
        <PresentationPageination prev="tech" next="end"/>
      </div>
    );
  }
}


export default Presentation;
