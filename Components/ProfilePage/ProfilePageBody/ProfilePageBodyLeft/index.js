import React, { Component } from 'react'
import ReviewCardContainer from './ReviewCardContainer'

class ProfilePageBodyLeft extends Component {
    render() {
        return (
            <div>
                <ReviewCardContainer {...this.props} />
            </div>
        )
    }
}

export default ProfilePageBodyLeft;
