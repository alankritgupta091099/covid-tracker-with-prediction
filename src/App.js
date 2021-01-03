import React from 'react';
import './App.css';
import {ScatterplotLayer} from 'deck.gl';
import DeckGL from '@deck.gl/react'
import {StaticMap} from 'react-map-gl';
import axios from 'axios';

import Table from './components/Table.js';


export default class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       countries:[]
    }
  }
  

  componentDidMount() {
    axios
      .get('https://corona.lmao.ninja/v2/countries?yesterday&sort')
      .then(async (result) => {
        const sortedArr = await result.data.sort(function(a,b){
          return b.cases - a.cases
        })
        var arr = [];
        var totalCases = 0;
        sortedArr.forEach(async element => {
          totalCases+=element.cases;
          await arr.push({
            countryName:element.country,
            tests:element.tests,
            active:element.active,
            deaths:element.deaths,
            cases: element.cases,
            coordinates: [element.countryInfo.long, element.countryInfo.lat]
          })
        });
        this.setState({
          countries: arr,
          totalCases
        })
      }).catch((err) => {
        console.log(err)
      });
  }
  
  _renderTooltip() {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    var boxData=""
    if(hoveredObject)
    {
      boxData= `<div>
      ${"<b>Country Name: </b> <i>"+hoveredObject.countryName+"</i><br>"}
      ${"<b>Total tests conducted: </b> <i>"+hoveredObject.tests+"</i><br>"}
      ${"<b>Total Cases: </b> <i>"+hoveredObject.cases+"</i><br>"}
      ${"<b>Active Cases: </b> <i>"+hoveredObject.active+"</i><br>"}
      ${"<b>Death Count: </b> <i>"+hoveredObject.deaths+"</i><br>"}
      </div>`
    }
    
    return hoveredObject && (
      <div 
      style={{        
        display: 'flex',
        position: 'fixed', 
        borderRadius:'0 12px 0 12px',
        padding:'7px 18px',
        zIndex: 1, 
        fontFamily:'Ubuntu',
        textTransform:'uppercase',
        width:'360px',
        height:'auto',
        pointerEvents: 'none', 
        backgroundColor:'#6F8385',
        color:'#fff',
        left: pointerX, 
        top: pointerY
        }}      
      dangerouslySetInnerHTML={{
        __html:boxData
        }}>

      </div>
    )
  }

  render() {

    const initialViewState = {
      longitude: -80, 
      latitude: 74.5, 
      zoom: 1.1,
    };

    const layer = new ScatterplotLayer({
      data: this.state.countries,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      radiusScale: 300,
      radiusMinPixels: 1,
      radiusMaxPixels: 50,
      lineWidthMinPixels: 0.2,
      getPosition: d => d.coordinates,
      getRadius: d => Math.sqrt(d.cases),
      getFillColor: d => [255, 0, 200, 100],
      onHover: info => this.setState({
        hoveredObject: info.object,
        pointerX: info.x,
        pointerY: info.y
      })
    });
    
   
    
    return (
      <>      
      <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={layer}
        >
          <StaticMap 
            mapboxApiAccessToken={'pk.eyJ1IjoiYWxhbmtyaXQiLCJhIjoiY2s3ZG9pYm40MGI5MTNobnc5ams4Nm50dSJ9.QgPqHcdj2FeNtpeailF3Bg'}
            mapStyle={'mapbox://styles/mapbox/light-v10'}
          /> 
          <Table className="sidebar" data={this.state.countries} totalCases={this.state.totalCases}/>
          { this._renderTooltip() }
      </DeckGL>
      </>      
    )
  }
}