import React, { Component } from 'react'
import ReviewCard from './ReviewCard'
import WriteReviewCard from '../WriteReviewCard';

export default class index extends Component {
    render() {
        return (
            <div>
                <WriteReviewCard />
                <div style={{ marginBottom: "25px" }}><ReviewCard /></div>
                <div style={{ marginBottom: "25px" }}><ReviewCard /></div>
                <div style={{ marginBottom: "25px" }}><ReviewCard /></div>
            </div>
        )
    }
}
