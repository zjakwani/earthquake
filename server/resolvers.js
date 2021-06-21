module.exports = {
    Query: {
        earthquakes: (_, { lat, long }, { dataSources }) =>
        dataSources.earthquakeAPI.getEarthquakes({ lat, long }, 0)
    }
}