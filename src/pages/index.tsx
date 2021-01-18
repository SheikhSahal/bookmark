import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const Bookmarks = gql`
{
  bookmarks{
    id
    title
    url
  }
}
`;


const ADD_BOOKMARKS = gql`
      mutation addBookmar($url:String!, $title: String!){
        addBookmark(url : $url, title: $title){
          id
        }
      }
`;

export default function Home() {

  let titleField;
  let titleUrl;


  const { error, loading, data } = useQuery(Bookmarks);

  const [addBookmark] = useMutation(ADD_BOOKMARKS);

  const handleSubmit = () => {
    console.log(titleField.value)
    console.log(titleUrl.value)
    addBookmark({
      variables:{
        url: titleUrl.value,
        title:titleField.value
      }
    })
  }

  console.log(data);

  if (error)
    return <h3>{error}</h3>
  if (loading)
    return <h3>loading...</h3>



  return <div>
    <label>
      Bookmark title: <br />
      <input type="text"  ref={node => titleField = node}/>
    </label>
    <br />
    <label>
      Bookmark Url: <br />
      <input type="text" ref={node => titleUrl = node}/>
    </label>

    <br />
    <button onClick={handleSubmit}>add Bookmark</button>
  </div>
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