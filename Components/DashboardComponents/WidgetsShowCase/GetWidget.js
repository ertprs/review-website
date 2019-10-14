import React, { Component } from 'react'

export default class GetWidget extends Component {

    renderWidgetInfo = ()=>{
        const {widget} = this.props;
        return(
            <div>
                <h3>About the {widget.title}</h3>
                <p>In short, the Micro TrustBoxes are great little starters that communicate You can trust us.</p>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-6">
                    {this.renderWidgetInfo()}
                </div>
                <div className="col-md-6">
                    {/* {this.getYourWidgetBox()} */}
                </div>
            </div>
        )
    }
}
