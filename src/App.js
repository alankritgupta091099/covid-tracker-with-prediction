import React from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';
import {ScatterplotLayer} from 'deck.gl';
import DeckGL from '@deck.gl/react'
import {StaticMap} from 'react-map-gl';

import Table from './components/Table.js';


export default class App extends React.Component {

  componentDidMount() {
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [this.state.lng, this.state.lat],
    //   zoom: this.state.zoom,
    //   // maxBounds: this.state.bounds
    // });
  }
  
  render() {

    const initialViewState = {
      longitude: 77, 
      latitude: 22, 
      zoom: 3.9,
    };

    const layer = new ScatterplotLayer({
      id: 'bart-stations',
      data: [
        {name: 'Colma', passengers: 4214, coordinates: [77.1025, 28.7041]},   
      ],
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 60000,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: d => d.coordinates,
      getRadius: d => Math.sqrt(d.exits),
      getFillColor: d => [255, 140, 0],
      getLineColor: d => [0, 0, 0]
    });
    

    return (
      <>      
      <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={layer}
        >
          <StaticMap 
            mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
            mapStyle={'mapbox://styles/mapbox/streets-v11'}
          /> 
          <Table className="sidebar"/>
          {/* { this._renderTooltip() } */}
      </DeckGL>
      </>      
    )
  }
}