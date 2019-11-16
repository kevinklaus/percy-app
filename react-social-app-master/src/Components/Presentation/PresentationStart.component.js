import React from 'react';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import PresentationPageination from './PresentationPageination.component';

class Presentation extends React.Component {
  _detectArrowKeyPresses = event => {
    switch (event.keyCode) {
      case 37:
        console.log('Prev key pressed');
        document.getElementById('prev-button').click();
        break;
      case 39:
        console.log('Next key pressed');
        document.getElementById('next-button').click();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this._detectArrowKeyPresses);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._detectArrowKeyPresses);
  }

  renderCard() {
    return (
      <div>
        <p>Hi, I'm Percy the Social Racoon!</p>
        Nice to meet you!
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={7}>
            <PresentationCard
              size="h4"
              content={this.renderCard}
              variant="pointingPercy"
            />
          </Grid>
        </Grid>
        <PresentationPageination prev="" next="team" />
      </div>
    );
  }
}

export default Presentation;
