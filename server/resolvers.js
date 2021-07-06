module.exports = {
    Query: {
        earthquakes: (_, { lat, long }, { dataSources }) => 
            dataSources.earthquakeAPI.getEarthquakes({ lat, long }, 0),
        ip: (_, __, { dataSources }) => 
            dataSources.ipAPI.getIp(), 
        earthquakesIp: async (_, __, { dataSources }) => {
            ip = await dataSources.ipAPI.getIp()
            lat = ip.lat
            long = ip.long
            return dataSources.earthquakeAPI.getEarthquakes({ lat, long }, 0)
        }
    }
}