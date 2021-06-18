module.exports = {
    Query: {
        earthquakes: (_, { lat, long, radius }, { dataSources }) =>
        dataSources.earthquakeAPI.getEarthquakes({ lat, long, radius }),
    }
}