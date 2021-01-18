const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb'),
  q=faunadb.query;

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

// const authors = [
//   { id: 1, name: 'Terry Pratchett', married: false },
//   { id: 2, name: 'Stephen King', married: true },
//   { id: 3, name: 'JK Rowling', married: false },
// ]

const resolvers = {
  Query: {
    bookmarks: async (root,args, context) =>{
      try{
        var adminClient = new faunadb.Client({secret:'fnAD_g50O-ACDRrSwACvkqC8rhsA5hlFDkAyJXr'});
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('bookmark'))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        // return[{
        //   id: 1,
        //   title:"Temp title" ,
        //   url: "Temp Url"
        // }]
      }catch(err){
        console.log(err);
      }
      // return authors;
    } ,
  },
  Mutation:{
    addBookmark:(_, {title,url}) =>{
        console.log(title,url);
        return{
          id: 1,
          title,
          url
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
