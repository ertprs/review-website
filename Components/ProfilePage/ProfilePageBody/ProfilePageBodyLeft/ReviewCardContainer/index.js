import React, { Component } from 'react'
import ReviewCard from './ReviewCard'
import WriteReviewCard from '../WriteReviewCard';
import _get from 'lodash/get';
import Paper from '../../../../MaterialComponents/Paper';
import uuid from 'uuid/v1';

export default class index extends Component {
    render() {

        return (
            <div>
                <WriteReviewCard />
                {_get(this.props, 'domainReviews', []).length < 1 ?
                    <Paper>
                        <div style={{ padding: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h1 style={{ fontSize: "22px" }}>No Reviews Found</h1>
                        </div>
                    </Paper> :
                    _get(this.props, 'domainReviews', []).map(review => {
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
