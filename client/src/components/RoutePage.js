import React from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import BusCard from '../components/Card';
import Quote from '../components/Quote'

class RoutePage extends React.Component {
  state = {
    routes: [],
    selectedRoute: null,
    selectedDirection: null,
    directionsLoaded: false,
    selectedStopCode: null,
    stopsLoaded: false,
    selectedStop: null,
    isLoaded: false,
    directions: [],
    stops: []
  };

  componentDidMount = async () => {
    const response = await axios.get(
      'https://svc.metrotransit.org/nextripv2/routes'
    );
    const routes = response.data;
    this.setState({ routes, isLoaded: true, directionsLoaded: false });
  };

  handleRouteSelection = async (e, hello) => {
    console.log(hello)
    let index;
    if (e.target.localName === 'span') {
      index = e.target.parentNode.getAttribute('index');
    } else {
      index = e.target.getAttribute('index');
    }
    const selectedRoute = await this.state.routes[index];
    this.getRouteDirections(selectedRoute.RouteId);
    this.setState({ selectedRoute });
  };

  handleDirectionSelection = async e => {
    let index;
    if (e.target.localName === 'span') {
      index = e.target.parentNode.getAttribute('index');
    } else {
      index = e.target.getAttribute('index');
    }
    const selectedDirection = await this.state.directions[index].DirectionId;
    this.getStops(this.state.selectedRoute.RouteId, selectedDirection);
    this.setState({ selectedDirection });
  };

  handleStopSelection = async e => {
    let index;
    if (e.target.localName === 'span') {
      index = e.target.parentNode.getAttribute('index');
    } else {
      index = e.target.getAttribute('index');
    }
    const stopCode = this.state.stops[index].PlaceCode;
    const selectedStop = (
      await axios.get(
        `https://svc.metrotransit.org/nextripv2/${this.state.selectedRoute.RouteId}/${this.state.selectedDirection}/${stopCode}`
      )
    ).data;
    this.setState({ selectedStop, stopLoaded: true });
  };

  getRouteDirections = async routeId => {
    const response = await axios.get(
      `https://svc.metrotransit.org/nextripv2/directions/${routeId}`
    );
    const directions = response.data;
    this.setState({ directions, directionsLoaded: true });
  };

  getStops = async (routeId, routeDirection) => {
    const response = await axios.get(
      `https://svc.metrotransit.org/nextripv2/stops/${routeId}/${routeDirection}`
    );
    const stops = response.data;
    this.setState({ stops, stopsLoaded: true });
  };

  render = () => {
    if (this.state.isLoaded) {
      return (
        <>
          <div>
            <h1>Times by route</h1>
            <Quote />
            <Dropdown
              selectOnNavigation={false}
              search
              className="route-dropdown"
              onChange={this.handleRouteSelection}
              placeholder="Select Route"
              fluid
              selection
              options={this.state.routes.map((route, index) => {
                return {
                  key: route.RouteId,
                  text: route.Description,
                  value: index,
                  index
                };
              })}
            />
            {this.state.directions.length > 0 && this.state.directionsLoaded ? (
              <Dropdown
              selectOnNavigation={false}
                search
                className="route-dropdown"
                onChange={this.handleDirectionSelection}
                placeholder="Select Direction"
                fluid
                selection
                options={this.state.directions.map((direction, index) => {
                  return {
                    key: index,
                    text: direction.DirectionName,
                    value: direction.DirectionName,
                    index
                  };
                })}
              />
            ) : null}
            {this.state.stops.length > 0 && this.state.stopsLoaded ? (
              <Dropdown
              selectOnNavigation={false}
                search
                className="route-dropdown"
                onChange={this.handleStopSelection}
                placeholder="Select Stop"
                fluid
                selection
                options={this.state.stops.map((stop, index) => {
                  return {
                    key: stop.PlaceCode,
                    text: stop.Description,
                    value: stop.Description,
                    index
                  };
                })}
              />
            ) : null}
            {this.state.selectedStop ? (
              <div className="ui vertical segment">
                <div id="" className="ui centered cards">
                  <BusCard
                    stopId={this.state.selectedStop.Stop.StopId}
                    type="by-route"></BusCard>
                </div>
              </div>
            ) : null}
          </div>
        </>
      );
    } else {
      return null;
    }
  };
}

export default RoutePage;
