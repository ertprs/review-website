import React, { Component } from 'react'
import ReviewCard from './ReviewCard'
import WriteReviewCard from '../WriteReviewCard';
import _get from 'lodash/get';
import Paper from '../../../../MaterialComponents/Paper';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

class ReviewCardContainer extends Component {
    render() {
        const { domainProfileData, isLoading } = this.props
        const domainReviews = ((domainProfileData || {}).domainReviews || {}).data || []
        return (
            <div>
                <WriteReviewCard />
                {domainReviews && domainReviews.length < 1 && !isLoading ?
                    <Paper>
                        <div style={{ padding: "50px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "25px" }}>
                            <h1 style={{ fontSize: "22px" }}>No Reviews Found</h1>
                        </div>
                    </Paper> :
                    domainReviews && domainReviews.map(review => {
                        return (
                            <div style={{ marginBottom: "25px" }} key={uuid()}>
                                <ReviewCard isLoading={isLoading} review={review || {}} />
                            </div>
                        )
                    })}

            </div>
        )
    }
}

const mapStateToProps = state => {
    const { profileData } = state
    const { domainProfileData, isLoading } = profileData
    return { domainProfileData, isLoading }
}

export default connect(mapStateToProps)(ReviewCardContainer);