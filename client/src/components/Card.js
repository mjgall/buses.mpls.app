import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/index';

class BusCard extends React.Component {
  state = {
    buses: [],
    isLoading: true
  };

  _isMounted = false;


  sendNewStop = async () => {
    await axios.put('/api/stops/add', {
      stop: this.props.stopId,
      location: this.props.location
    });
  };

  removeStop = async () => {
    await axios.put('/api/stops/remove', {
      stop: this.props.stopId,
      location: this.props.location
    });

    this.removeCard();
  };

  fetchBuses = async id => {
    const response = await fetch(
      `https://svc.metrotransit.org/NexTrip/${id}?format=json`
    );
    const data = await response.json();
    if (this._isMounted) {
      this.setState({ isLoading: false, buses: data.slice(0, 6) });
    }
    
  };

  removeCard = () => {
    if (this.props.type === 'default') {
      this.props.removeCard(this.props.inArray);
    } else if (this.props.type === 'user') {
      this.props.removeUserCard(this.props.inArray);
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchBuses(this.props.stopId);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="card" data-key={this.props.inArray}>
        <div className="content">
          <Icon
            name="window close outline"
            style={{ float: 'right', color: 'red' }}
            onClick={this.removeCard}
            id="close-card"
          />
          <div className="header">{this.props.location}</div>

          <div className="meta">{this.props.stopId}</div>
          <div className="description">
            <ul>
              {this.state.buses.map((bus, index) => (
                <li className={bus.Actual.toString()} key={index}>
                  {bus.Route}
                  {bus.Terminal} -- {bus.DepartureText}
                </li>
              ))}
            </ul>
          </div>
          <div className="footer">
            {this.props.auth ? (
              <div id="logged-in-actions">
                <Popup
                  trigger={
                    <Icon
                      name="plus square outline"
                      style={{ float: 'right', color: 'green' }}
                      onClick={this.sendNewStop}
                      id="save-stop"
                    />
                  }
                  content="Save to user"
                  size="mini"
                  position="left center"
                />
                <Popup
                  trigger={
                    <Icon
                      name="minus square outline"
                      style={{ float: 'right', color: 'gold' }}
                      onClick={this.removeStop}
                      id="save-stop"
                    />
                  }
                  size="mini"
                  content="Remove from user"
                  position="left center"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(BusCard);
