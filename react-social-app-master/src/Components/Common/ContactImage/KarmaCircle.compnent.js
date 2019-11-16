import React from 'react';
import Grid from '@material-ui/core/Grid';

/**
 * Small component rendering a progress circle around a contagt image
 * @param {object} props
 * @param {string} props.variant - 'bigAvatar' for larger contact image or undefined for standard size
 * @param {number} props.radius - radius of the circle
 * @param {number} props.thickness - thickness of the cirlce stroke
 * @param {number} props.percentage [input=0] - the progress of the circle will fill up by percentage from 0 to 100
 */
class KarmaCircle extends React.Component {
  constructor(props) {
    super(props);

    const { radius, thickness } = this.props;

    this.normalizedRadius = radius - thickness * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

/**
  * in case the percentage is missing do not show the progress circle   
  * @memberof KarmaCircle
 */
  render() {
    const { radius, thickness, percentage } = this.props;

    if (!percentage) return null;

    const strokeDashoffset =
      this.circumference - (percentage / 100) * this.circumference;

    const strokeDashoffsetFoundation =
      this.circumference - 1 * this.circumference;

    return (
      <Grid container justify="center" style={{ marginBottom: -115 }}>
        <Grid item>
          <svg
            height={radius * 2}
            width={radius * 2}
            className={
              this.props.variant == 'bigAvatar' ? '' : 'contact-karma-circle'
            }
          >
            <circle
              stroke="rgba(132, 200, 135,0.7)"
              fill="transparent"
              strokeWidth={thickness}
              strokeDasharray={this.circumference + ' ' + this.circumference}
              style={{ strokeDashoffset: strokeDashoffsetFoundation }}
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#FF9100"
              fill="transparent"
              strokeWidth={thickness}
              strokeDasharray={this.circumference + ' ' + this.circumference}
              style={{ strokeDashoffset }}
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
        </Grid>
      </Grid>
    );
  }
}

export default KarmaCircle;
