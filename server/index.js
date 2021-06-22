const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const EarthquakeAPI = require('./EarthquakeAPI')
const ipAPI = require('./ipAPI')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    earthquakeAPI: new EarthquakeAPI(),
    ipAPI: new ipAPI()
  })
})

server.listen().then(({ url }) => {
    console.log(`go to ${url}`)
})