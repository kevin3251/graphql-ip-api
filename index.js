const { ApolloServer } = require('apollo-server')
const ip = require('./models/ip')
const { typeDefs, resolvers } = require('./graphql')

const server = new ApolloServer({
    typeDefs, resolvers,
    context: async ({ req }) => {
        const { ip: localIP} = await ip.local()
        const forwardedIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip']
        const remoteAddress = req.connection.remoteAddress.match('::') ?
            '' : req.connection.remoteAddress

        return {
            ip,
            clientIP: forwardedIP || remoteAddress || localIP
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})