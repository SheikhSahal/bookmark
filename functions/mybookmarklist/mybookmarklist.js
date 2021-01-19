const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
   bookmarks:[Bookmark]
  }
  type Bookmark {
    id: ID!
    title: String!
    url : String!
  }
  type Mutation {
    addBookmark(title: String!, url: String!): Bookmark
  }
`


const resolvers = {
  Query: {
    bookmarks: async (root, args, context) => {
      try {
        var adminClient = new faunadb.Client({ secret: 'fnAD_g50O-ACDRrSwACvkqC8rhsA5hlFDkAyJXr' });
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('Bookmarks'))),
            q.Lambda(x => q.Get(x))
          )
        )
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addBookmark: async (_, { title, url }) => {
      console.log("====================================")
      console.log(title,url)
      try {
        var adminClient = new faunadb.Client({ secret: 'fnAD_g50O-ACDRrSwACvkqC8rhsA5hlFDkAyJXr' });
        const result = await adminClient.query(
          q.Create(
            q.Collection('Bookmarks'),
            {
              data: {
                title,
                url
              }
            },
          )
        )
        return result.data.data;
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
