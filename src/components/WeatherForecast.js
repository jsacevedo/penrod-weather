import React from 'react';

class WeatherForecast extends React.Component {
  render() {
    let displayForecastData = {
      display: this.props.forecastVisible ? 'block' : 'none',
      margin: "0 auto"
    };

    return(
      <div className="slds-container_medium slds-m-horizontal_small" style={ displayForecastData }>
        <div className="slds-align_absolute-center slds-text-heading_medium slds-p-vertical_medium">5-Day Temperature Forecast</div>
        <table className="slds-table slds-table_cell-buffer slds-table_bordered slds-table_striped slds-max-medium-table_stacked-horizontal slds-no-row-hover">
          <thead>
            <tr>
              <th className="slds-text-title_caps" scope="col">
                <div className="slds-truncate" title="Day of the Week">Day of the Week</div>
              </th>
              <th className="slds-text-title_caps" scope="col">
                <div className="slds-truncate" title="High Temperature">High Temperature</div>
              </th>
              <th className="slds-text-title_caps" scope="col">
                <div className="slds-truncate" title="Low Temperature">Low Temperature</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Day of the Week">
                <div className="slds-truncate" title={ this.props.dayOneName }>{ this.props.dayOneName }</div>
              </td>
              <td data-label="High Temperature">
                <div className="slds-truncate" title={ this.props.dayOneHiTemp }>{ this.props.dayOneHiTemp }&deg;F</div>
              </td>
              <td data-label="Low Temperature">
                <div className="slds-truncate" title={ this.props.dayOneLowTemp }>{ this.props.dayOneLowTemp }&deg;F</div>
              </td>
            </tr>
            <tr>
              <td data-label="Day of the Week">
                <div className="slds-truncate" title={ this.props.dayTwoName }>{ this.props.dayTwoName }</div>
              </td>
              <td data-label="High Temperature">
                <div className="slds-truncate" title={ this.props.dayTwoHiTemp }>{ this.props.dayTwoHiTemp }&deg;F</div>
              </td>
              <td data-label="Low Temperature">
                <div className="slds-truncate" title={ this.props.dayTwoLowTemp }>{ this.props.dayTwoLowTemp }&deg;F</div>
              </td>
            </tr>
            <tr>
              <td data-label="Day of the Week">
                <div className="slds-truncate" title={ this.props.dayThreeName }>{ this.props.dayThreeName }</div>
              </td>
              <td data-label="High Temperature">
                <div className="slds-truncate" title={ this.props.dayThreeHiTemp }>{ this.props.dayThreeHiTemp }&deg;F</div>
              </td>
              <td data-label="Low Temperature">
                <div className="slds-truncate" title={ this.props.dayThreeLowTemp }>{ this.props.dayThreeLowTemp }&deg;F</div>
              </td>
            </tr>
            <tr>
              <td data-label="Day of the Week">
                <div className="slds-truncate" title={ this.props.dayFourName }>{ this.props.dayFourName }</div>
              </td>
              <td data-label="High Temperature">
                <div className="slds-truncate" title={ this.props.dayFourHiTemp }>{ this.props.dayFourHiTemp }&deg;F</div>
              </td>
              <td data-label="Low Temperature">
                <div className="slds-truncate" title={ this.props.dayFourLowTemp }>{ this.props.dayFourLowTemp }&deg;F</div>
              </td>
            </tr>
            <tr>
              <td data-label="Day of the Week">
                <div className="slds-truncate" title={ this.props.dayFiveName }>{ this.props.dayFiveName }</div>
              </td>
              <td data-label="High Temperature">
                <div className="slds-truncate" title={ this.props.dayFiveHiTemp }>{ this.props.dayFiveHiTemp }&deg;F</div>
              </td>
              <td data-label="Low Temperature">
                <div className="slds-truncate" title={ this.props.dayFiveLowTemp }>{ this.props.dayFiveLowTemp }&deg;F</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ); // End of return
  } // End of render
}; // End of WeatherForecast

export default WeatherForecast;
