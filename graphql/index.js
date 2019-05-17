const { gql } = require('apollo-server')

const typeDefs = gql`
    type IpInfo {
        ip: String
        city: String
        region: String
        region_code: String
        country: String
        country_name: String
        continent_code: String
        in_eu: Boolean
        postal: String
        latitude: Float
        longitude: Float
        timezone: String
        utc_offset: String
        country_calling_code: String
        currency: String
        languages: String
        asn: String
        org: String
    }

    type Query {
        myIpInfo: IpInfo
        ipInfo(address: String): IpInfo
    }
`

const resolvers = {
    Query: {
        myIpInfo: async (root, args, { ip, clientIP }) => {
            const { source } = ip
            return await source(clientIP)
        },

        ipInfo: async (root, { address }, { ip }) => {
            const { source } = ip
            return await source(address)
        }
    }
}

module.exports = { typeDefs, resolvers }