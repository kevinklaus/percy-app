import React from 'react';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import PresentationPageination from './PresentationPageination.component';
import LightIcon from '@material-ui/icons/WbIncandescent'


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
        <p>Idea:</p>
        <Grid container spacing={8}  alignItems="center" justify="center">
          <Grid item>
            <LightIcon style={{ fontSize: 200,}} />
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
              <PresentationCard
                size="h4"
                content={this.renderCard} 
                variant="happyPercy" 
                color="secondary"
              />
          </Grid>
        </Grid>
        <PresentationPageination prev="research" next="concept"/>
      </div>
    );
  }
}


export default Presentation;
