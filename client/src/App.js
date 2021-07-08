import './App.css';
import React, { useState } from 'react'
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
const GET_IP = gql`
  query GetIp {
    ip {
      lat
      long
      country
      state
      city
      ip
    }
    earthquakesIp {
      magnitude
      location
      latitude
      longitude
    }
  }
`





function App() {


  const { data: ipData, loading: ipLoading, error: ipError } = useQuery(GET_IP)


  const [lat, setLat] = useState(0)
  const [nextLat, setNextLat] = useState(0)
  const [long, setLong] = useState(0)
  const [nextLong, setNextLong] = useState(0)

  const { data, loading, error } = useQuery(GET_EARTHQUAKES, {
    variables: { lat, long }
  })

  function CurrentInfo() {
    if (loading || ipLoading) return <h5>loading</h5>
    if (error || ipError) return <h5>{`Error! ${error.message}`}</h5>
    if (lat === 0 && long === 0) {
      return (
        <div>
          <h4>Detected IP address: {ipData.ip.ip}</h4>
          <h5>Country: {ipData.ip.country}, State: {ipData.ip.state}, City: {ipData.ip.city} </h5>
          <h5>Lat: {ipData.ip.lat}</h5>
          <h5>Long: {ipData.ip.long}</h5>
        </div>
      )
    }
    else {
      return (
        <div>
          <h3>{lat}</h3>
          <h3>{long}</h3>
        </div>
      )
    }
  }

  function EarthquakeData() {
    if (loading || ipLoading) return <h5>loading</h5>
    if (error || ipError) return <h5>{`Error! ${error.message}`}</h5>
    if (lat === 0 && long === 0) {
      return EarthquakeDisplay(ipData.earthquakesIp)
    }
    else {
      return EarthquakeDisplay(data.earthquakes)
    }
  }

  function EarthquakeDisplay(earthquakes) {
    return (
      <div>
        {earthquakes.map((earthquake) => (
          <div>
            <h3>{earthquake.magnitude}</h3>
            <h3>{earthquake.location} </h3>
            <h3>{earthquake.latitude} </h3>
            <h3>{earthquake.longitude} </h3>
            <h3>------</h3>
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
      <h2>earthquake app</h2>
      <CurrentInfo/>
      <form onSubmit={resetAll} >
        <label>Enter Lat</label>
        <input value={nextLat} onChange={handleLatChange} />
        <label>Enter Long</label>
        <input value={nextLong} onChange={handleLongChange} />
        <button type="submit">Submit</button>
      </form>
      <EarthquakeData lat={lat} long={long} />
    </div>
  );
}



export default App;
