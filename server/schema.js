const { gql } = require('apollo-server')

const typeDefs = gql`
    # earthquake schema
    type Earthquake {
        magnitude: Float!
        location: String!
        latitude: Float!
        longitude: Float!
    }

    # query
    type Query {
        earthquakes(lat: Float!, long: Float!, radius: Int!): [Earthquake]
    }
`
module.exports = typeDefs
