const { gql } = require('apollo-server')

const typeDefs = gql`
    # earthquake schema
    type Earthquake {
        magnitude: Float!
        location: String!
        latitude: Float!
        longitude: Float!
    }

    type ip {
        country: String!
        state: String!
        city: String!
        lat: Float!
        long: Float!
        ip: String!
    }

    # query
    type Query {
        earthquakes(lat: Float!, long: Float!): [Earthquake]
        ip: ip
        earthquakesIp: [Earthquake]
    }
`
module.exports = typeDefs
