import React from 'react';

class Titles extends React.Component {
  render() {
    let displayCity = {
      display: this.props.currentVisible ? 'block' : 'none'
    };

    return(
      <div className="slds-container_medium slds-m-horizontal_small" style={ {margin: "0 auto"} }>
        <div className="slds-align_absolute-center slds-text-heading_large slds-border_bottom slds-p-top_medium">
          Penrod <span style={ displayCity }>&nbsp;- { this.props.showCity }</span>
        </div>
      </div>
    );
  }
};

export default Titles;
