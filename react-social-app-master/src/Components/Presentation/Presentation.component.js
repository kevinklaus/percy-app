import React from 'react';
import TopNavigation from '../navigation/TopNavigation.component';

class Presentation extends React.Component {
  render() {
    return (
      <div className="presentation-background">
        <TopNavigation presenting={true}/>
      </div>
    );
  }
}

export default Presentation;
