import './App.css';
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { gql, useQuery } from '@apollo/client';


const GET_EARTHQUAKES = gql`
  query GetEarthquakes($lat: Float!, $long: Float!, $radius: Int!) {
    earthquakes(lat: $lat, long: $long, radius: $radius) {
      magnitude
      location
      latitude
      longitude
    }
  }
`

function App() {
  const [lat, setLat] = useState(65)
  const [nextLat, setNextLat] = useState(0)
  const [long, setLong] = useState(111)
  const [nextLong, setNextLong] = useState(0)
  const [radius, setRadius] = useState(4200)
  const [nextRadius, setNextRadius] = useState(0)

  const { data, loading, error } = useQuery(GET_EARTHQUAKES, {
    variables: { lat, long, radius }
  })

  const handleRadiusChange = (e) => {
    setNextRadius(e.currentTarget.value)
  }

  const handleLatChange = (e) => {
    setNextLat(e.currentTarget.value)
  }

  const handleLongChange = (e) => {
    setNextLong(e.currentTarget.value)
  }

  const resetAll = (e) => {
    e.preventDefault()
    setRadius(parseInt(nextRadius))
    setNextRadius(0)
    setLat(parseFloat(nextLat))
    setNextLat(0)
    setLong(parseFloat(nextLong))
    setNextLong(0)
  }



  return (
    <div>
      <h2>My amazing earthquake app!</h2>
      <form onSubmit={resetAll} >
        <label>Enter Radius</label>
        <input value={nextRadius} onChange={handleRadiusChange}/>
        <label>Enter Lat</label>
        <input value={nextLat} onChange={handleLatChange}/>
        <label>Enter Long</label>
        <input value={nextLong} onChange={handleLongChange}/>

        <button type="submit">Submit</button>
      </form>
      {loading && <h5>Loading...</h5>}	     
      {error && <h5>Oops there is an error! Try entering a new radius.</h5>}
      {data &&	      
        <div>	        
          <h3>{data.earthquakes[0].magnitude} </h3>	 
          <h3>{data.earthquakes[0].location} </h3>
          <h3>{data.earthquakes[0].latitude} </h3>
          <h3>{data.earthquakes[0].longitude} </h3>                 
        </div>	  
      }	    
    </div>
  );
}

export default App;
