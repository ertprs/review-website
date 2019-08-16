import React from 'react';
import TestComponent from '../Components/TestComponent/TestComponent';

const TestPage =  (props) =>{
    
    return(
        <div style={{margin:"150px 0 150px 25px"}}>
            <TestComponent domain={props.domain} />
        </div>
    )
}

TestPage.getInitialProps=  ({query})=>{
    const url = "https://search-api-dev.cryptopolice.com/api/verify";
    return {domain:query.domain}

}

export default TestPage;