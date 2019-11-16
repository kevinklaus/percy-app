import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import ChipsArray from '../Common/ChipsArray.component';
import PresentationPageination from './PresentationPageination.component';
import Poll from '@material-ui/icons/Poll'


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
        <p>Research:</p>
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item>
            <Poll style={{ fontSize: 200,}}/>
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
                style={{marginTop: -20}}
                size="h4"
                content={this.renderCard} 
                variant="sadPercy" 
              />
          </Grid>
        </Grid>
        <PresentationPageination prev="survey" next="idea"/>
      </div>
    );
  }
}


export default Presentation;
