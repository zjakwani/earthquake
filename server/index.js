const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const EarthquakeAPI = require('./datasource')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    earthquakeAPI: new EarthquakeAPI()
  })
})

server.listen().then(({ url }) => {
    console.log(`go to ${url}`)
})