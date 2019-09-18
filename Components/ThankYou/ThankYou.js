import React from 'react';

class ThankYou extends React.Component{

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render(){
        return(
            <div style={{height:"50vh"}}>
                <h2 style={{color:"green"}}>Thank you for your review, we will contact you shortly!</h2>
            </div>
        )
    }
}

export default ThankYou;