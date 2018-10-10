import React from 'react';

class Menu extends React.Component {
  render() {
    return(
      <div className="slds-container_medium slds-m-horizontal_small" style={ {margin: "0 auto"} }>
        <div className="slds-grid slds-gutters_x-small slds-grid_pull-padded-x-small slds-wrap">
          <div className="slds-text-align_center slds-text-align_center slds-col slds-size_1-of-1">Select a Location</div>
          <div className="slds-col slds-size_1-of-2 slds-p-around_x-small">
            <button style={ {height: '3rem'} } className="slds-button slds-button_brand slds-size_1-of-1 slds-text-heading_medium" name="chicago" onClick={(event) => this.props.getWeather(event)}>Chicago</button>
          </div>
          <div className="slds-col slds-size_1-of-2 slds-p-around_x-small">
            <button style={ {height: '3rem'} } className="slds-button slds-button_brand slds-size_1-of-1 slds-text-heading_medium" name="dallas" onClick={(event) => this.props.getWeather(event)}>Dallas</button>
          </div>
          <div className="slds-col slds-size_1-of-2 slds-p-around_x-small">
            <button style={ {height: '3rem'} } className="slds-button slds-button_brand slds-size_1-of-1 slds-text-heading_medium" name="milwaukee" onClick={(event) => this.props.getWeather(event)}>Milwaukee</button>
          </div>
          <div className="slds-col slds-size_1-of-2 slds-p-around_x-small">
            <button style={ {height: '3rem'} } className="slds-button slds-button_brand slds-size_1-of-1 slds-text-heading_medium" name="minneapolis" onClick={(event) => this.props.getWeather(event)}>Minneapolis</button>
          </div>
        </div>
      </div>
    ) // End of return
  } // End of render
} // End of Menu

export default Menu;
