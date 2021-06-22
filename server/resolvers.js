module.exports = {
    Query: {
        earthquakes: (_, { lat, long }, { dataSources }) => 
            dataSources.earthquakeAPI.getEarthquakes({ lat, long }, 0),
        ip: (_, __, { dataSources }) => 
            dataSources.ipAPI.getIp() 
    }
}