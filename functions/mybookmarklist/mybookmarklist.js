const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
   bookmarks:[Bookmark]
  }
  type Bookmark {
    id: ID!
    title: String!
    url : String!
  }
`

const authors = [
  { id: 1, name: 'Terry Pratchett', married: false },
  { id: 2, name: 'Stephen King', married: true },
  { id: 3, name: 'JK Rowling', married: false },
]

const resolvers = {
  Query: {
    allAuthors: (root,args, context) =>{
      return authors;
    } ,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
