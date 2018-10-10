import React from 'react';

class CurrentWeather extends React.Component {
  render() {
    let displayCurrentData = {
      display: this.props.currentVisible ? 'block' : 'none',
      margin: "0 auto"
    };

    return(
      <div className="slds-container_medium slds-m-horizontal_small" style={ displayCurrentData }>
        <div className="slds-align_absolute-center slds-text-heading_medium slds-p-vertical_medium">
          Current Weather
        </div>
        <div className="slds-page-header">
          <div className="slds-page-header__row">
            <div className="slds-page-header__col-title">
              <div className="slds-media">
                <div className="slds-media__figure">
                  <img src={`http://openweathermap.org/img/w/${this.props.currentIcon}.png`} alt="weather" />
                </div>
                <div className="slds-media__body">
                  <div className="slds-page-header__name">
                    <div className="slds-page-header__name-title">
                      <h1>
                        <span className="slds-page-header__title slds-truncate" title={ this.props.temperature }>{ this.props.temperature }&deg;F</span>
                      </h1>
                    </div>
                  </div>
                  <p className="slds-page-header__name-meta">{ this.props.description }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="slds-table slds-table_cell-buffer slds-no-row-hover slds-max-medium-table_stacked-horizontal">
          <thead>
            <tr>
              <th className="slds-text-title_caps" scope="col">
                <div className="slds-truncate" title="Humidity">Humidity</div>
              </th>
              <th className="slds-text-title_caps" scope="col">
                <div className="slds-truncate" title="Cloudiness">Cloudiness</div>
              </th>
              <th className="slds-text-title_caps" scope="col">
                <div className="slds-truncate" title="Wind Speed">Wind Speed</div>
              </th>
              <th className="slds-text-title_caps" scope="col">
                <div className="slds-truncate" title="Wind Direction">Wind Direction</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Humidity">
                <div className="slds-truncate" title={ this.props.humidity }>{ this.props.humidity }%</div>
              </td>
              <td data-label="Cloudiness">
                <div className="slds-truncate" title={ this.props.clouds }>{ this.props.clouds }%</div>
              </td>
              <td data-label="Wind Speed">
                <div className="slds-truncate" title={ this.props.speed }>{ this.props.speed }&nbsp;MPH</div>
              </td>
              <td data-label="Wind Direction">
                <div className="slds-truncate" title={ this.props.direction }>{ this.props.direction }</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default CurrentWeather;
