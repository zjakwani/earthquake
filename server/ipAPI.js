const { RESTDataSource } = require('apollo-datasource-rest')

class ipAPI extends RESTDataSource {
    constructor() {
      super()
    }
  
    async getIp() {
      const response = await this.get("https://freegeoip.app/json/")
      return this.ipReducer(response);
    }
  
    ipReducer(response) {
      return {
        country: response.country_name,
        state: response.region_name,
        city: response.city,
        lat: parseFloat(response.latitude),
        long: parseFloat(response.longitude)
      }
    }
}

module.exports = ipAPI;