import React from 'react';

class BusCard extends React.Component {
  state = {
    buses: []
  };

  fetchBuses = async id => {
    const response = await fetch(
      `https://svc.metrotransit.org/NexTrip/${id}?format=json`
    );
    const data = await response.json();
    this.setState({ buses: data.slice(0, 6) });
  };

  async componentWillMount() {
    this.fetchBuses(this.props.stopId);
  }

  render() {
    return (
      <div className="card">
        <div className="content">
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
        </div>
      </div>
    );
  }
}

export default BusCard;
