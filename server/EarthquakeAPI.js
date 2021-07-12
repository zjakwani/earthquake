const { RESTDataSource } = require('apollo-datasource-rest')

class EarthquakeAPI extends RESTDataSource {
  constructor() {
    super()
  }

  async getEarthquakes({ lat, long }, radius) {
      const base = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime="
      const d = new Date();
      const response = await this.get(base
        + d.getFullYear() + "-" 
        + (d.getMonth() + 1) + "-"
        + d.getDate()
        + `&latitude=${lat}&longitude=${long}&maxradiuskm=${radius}`)
      if (response.features.length > 4) {
        return response.features.map(earthquake => this.earthquakeReducer(earthquake))
      }
      else {
        return this.getEarthquakes({lat, long}, (radius + 400))
      }
  }

  earthquakeReducer(response) {
      return {
          magnitude: response.properties.mag,
          location: response.properties.place,
          latitude: response.geometry.coordinates[0],
          longitude: response.geometry.coordinates[1]
      }
  }
}

module.exports = EarthquakeAPI