import React from 'react';
import axios from 'axios';
const TestPage =  (props) =>{
    console.log(props.data)
    return(
        <div>API Test page</div>
    )
}

TestPage.getInitialProps= async ({query})=>{
    const url = "https://search-api-dev.cryptopolice.com/api/verify";

    const response = await axios.post(
        url,
        { domain: "https://www.google.com" }
      );

      return {data:{...response.data}}

}

export default TestPage;