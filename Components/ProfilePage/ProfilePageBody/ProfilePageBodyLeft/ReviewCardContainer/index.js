import React, { Component } from 'react'
import ReviewCard from './ReviewCard'
import WriteReviewCard from '../WriteReviewCard';
import _get from 'lodash/get';
import Paper from '../../../../MaterialComponents/Paper';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import ReviewCardPlaceholder from './ReviewCardPlaceholder';

class ReviewCardContainer extends Component {
    render() {
        const { domainProfileData, isLoading } = this.props
        const domainReviewsData = (((domainProfileData || {}).domainReviewsWillCome || {}).data || [])
        const domainReviewsWillCome = (((domainProfileData || {}).domainReviewsWillCome || {}).willCome || false)
        return (
            <div>
                <WriteReviewCard />
                {
                    isLoading ? <ReviewCardPlaceholder /> : domainReviewsWillCome ?
                        domainReviewsData.map(review => {
                            return (
                                <div style={{ marginBottom: "25px" }} key={uuid()}>
                                    <ReviewCard isLoading={isLoading} review={review || {}} />
                                </div>
                            )
                        }) : <Paper>
                            <div style={{ padding: "50px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "25px" }}>
                                <h1 style={{ fontSize: "22px" }}>No Reviews Found</h1>
                            </div>
                        </Paper>
                }
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