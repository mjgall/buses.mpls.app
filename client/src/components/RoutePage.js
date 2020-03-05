import React from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import BusCard from '../components/Card'

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

  handleRouteSelection = async e => {
    const index = e.target.getAttribute('index');
    const selectedRoute = await this.state.routes[index];
    await this.getRouteDirections(selectedRoute.RouteId);
    this.setState({ selectedRoute });
  };

  handleDirectionSelection = async e => {
    const index = e.target.getAttribute('index');
    const selectedDirection = await this.state.directions[index].DirectionId;
    this.getStops(this.state.selectedRoute.RouteId, selectedDirection);
    this.setState({ selectedDirection })
  };

  handleStopSelection = async e => {
    const index = e.target.getAttribute('index');
    const stopCode = this.state.stops[index].PlaceCode
    const selectedStop = (await axios.get(`https://svc.metrotransit.org/nextripv2/${this.state.selectedRoute.RouteId}/${this.state.selectedDirection}/${stopCode}`)).data
    this.setState({ selectedStop, stopLoaded: true })
  }

  getRouteDirections = async routeId => {
    const response = await axios.get(
      `https://svc.metrotransit.org/nextripv2/directions/${routeId}`
    );
    const directions = response.data;
    console.log(directions);
    this.setState({ directions, directionsLoaded: true });
  };

  getStops = async (routeId, routeDirection) => {
    const response = await axios.get(
      `https://svc.metrotransit.org/nextripv2/stops/${routeId}/${routeDirection}`
    );
    const stops = response.data;
    console.log(stops);
    this.setState({ stops, stopsLoaded: true });
  };

  render = () => {
    if (this.state.isLoaded) {
      return (
        <>
          <div>
            <h1>Get times by route</h1>
            <Dropdown
              onChange={ this.handleRouteSelection }
              placeholder="Select Route"
              fluid
              selection
              options={ this.state.routes.map((route, index) => {
                return {
                  key: route.RouteId,
                  text: route.Description,
                  value: route.RouteId,
                  index
                };
              }) }
            />
            { this.state.directions.length > 0 && this.state.directionsLoaded ? (
              <Dropdown
                onChange={ this.handleDirectionSelection }
                placeholder="Select Direction"
                fluid
                selection
                options={ this.state.directions.map((direction, index) => {
                  return {
                    key: index,
                    text: direction.DirectionName,
                    value: direction.DirectionName,
                    index
                  };
                }) }
              />
            ) : null }
            { this.state.stops.length > 0 && this.state.stopsLoaded ? (
              <Dropdown
                onChange={ this.handleStopSelection }
                placeholder="Select Stop"
                fluid
                selection
                options={ this.state.stops.map((stop, index) => {
                  return {
                    key: stop.PlaceCode,
                    text: stop.Description,
                    value: stop.Description,
                    index
                  };
                }) }
              />
            ) : null }
            { this.state.selectedStop ? <BusCard stopId={ this.state.selectedStop.Stop.StopId }></BusCard> : null }
          </div>
        </>
      );
    } else {
      return null;
    }
  };
}

export default RoutePage;
