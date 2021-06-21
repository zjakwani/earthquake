import './App.css';
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';


const GET_EARTHQUAKES = gql`
  query GetEarthquakes($lat: Float!, $long: Float!) {
    earthquakes(lat: $lat, long: $long) {
      magnitude
      location
      latitude
      longitude
    }
  }
`


function App() {
  const [lat, setLat] = useState(33.5)
  const [nextLat, setNextLat] = useState(0)
  const [long, setLong] = useState(-112.1)
  const [nextLong, setNextLong] = useState(0)

  function EarthquakeData({ lat, long }) {
    const { data, loading, error } = useQuery(GET_EARTHQUAKES, {
      variables: { lat, long }})

    if (loading) return <h5>loading</h5>
    if (error) return <h5>{`Error! ${error.message}`}{lat}{long}</h5>
      return (
        <div>
              {data.earthquakes.map((earthquake) => (
                <div>
                  <h3>{earthquake.magnitude}</h3>
                  <h3>{earthquake.location} </h3>
                  <h3>{earthquake.latitude} </h3>
                  <h3>{earthquake.longitude} </h3> 
                  <h3>----</h3>
                </div>
              ))} 
        </div>
      )
  }


  const handleLatChange = (e) => {
    setNextLat(e.currentTarget.value)
  }

  const handleLongChange = (e) => {
    setNextLong(e.currentTarget.value)
  }

  const resetAll = (e) => {
    e.preventDefault()
    setLat(parseFloat(nextLat))
    setNextLat(0)
    setLong(parseFloat(nextLong))
    setNextLong(0)
  }



  return (
    <div>
      <h2>My amazing earthquake app!</h2>
      <h3>{lat}</h3>
      <h3>{long}</h3>
      <form onSubmit={resetAll} >
        <label>Enter Lat</label>
        <input onChange={handleLatChange}/>
        <label>Enter Long</label>
        <input onChange={handleLongChange}/>
        <button type="submit">Submit</button>
      </form>
      <EarthquakeData lat={lat} long={long}/>
    </div>
  );
}



export default App;
