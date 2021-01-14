import React,{useEffect, useState} from "react"
import {useQuery, useMutation} from '@apollo/client';
import gql from 'graphql-tag';

const Bookmarks = gql`
{
  allAuthors{
    id
    name
  }
}
`;



export default function Home(){

  const {error, loading, data} = useQuery(Bookmarks);

  if(error)
      return <h3>{error}</h3>
  if(loading)
    return <h3>loading...</h3>
    
  console.log(data);

  return <h1>Hellow world</h1>
}


// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link> <br />
//     <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
//   </Layout>
// )

// export default IndexPage