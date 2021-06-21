const { RESTDataSource } = require('apollo-datasource-rest')

class EarthquakeAPI extends RESTDataSource {
  constructor() {
    super()
  }

  async getEarthquakes({ lat, long }, radius) {
      const response = await this.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime=2021-06-21&latitude=${lat}&longitude=${long}&maxradiuskm=${radius}`)
      if (response.features.length > 0) {
        return response.features.map(earthquake => this.earthquakeReducer(earthquake))
      }
      else {
        return this.getEarthquakes({lat, long}, (radius + 100))
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