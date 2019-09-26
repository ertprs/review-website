import React, { Component } from 'react'
import ReviewCard from './ReviewCard'
import WriteReviewCard from '../WriteReviewCard';
import _get from 'lodash/get';
import Paper from '../../../../MaterialComponents/Paper';
import ContentLoader from 'react-content-loader'
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

const MyLoader = () => (
    <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="70" y="15" rx="4" ry="4" width="117" height="6" />
        <rect x="70" y="35" rx="3" ry="3" width="85" height="6" />
        <rect x="0" y="80" rx="3" ry="3" width="350" height="6" />
        <rect x="0" y="100" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="120" rx="3" ry="3" width="201" height="6" />
        <circle cx="30" cy="30" r="30" />
    </ContentLoader>
)

class ReviewCardContainer extends Component {
    render() {
        const { domainProfileData, isLoading } = this.props
        const domainReviews = ((domainProfileData || {}).domainReviews || {}).data || []
        return (
            <div>
                <WriteReviewCard />
                {isLoading ? <MyLoader /> : domainReviews && domainReviews.length < 1 ?
                    <Paper>
                        <div style={{ padding: "50px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "25px" }}>
                            <h1 style={{ fontSize: "22px" }}>No Reviews Found</h1>
                        </div>
                    </Paper> :
                    domainReviews && domainReviews.map(review => {
                        return (
                            <div style={{ marginBottom: "25px" }} key={uuid()}>
                                <ReviewCard review={review || {}} />
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