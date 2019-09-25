import React, { Component } from 'react';
import ReviewCard from '../Components/Widgets/MyReviewsBusiness/ReviewCard';
import UserInfoCard from '../Components/Widgets/MyReviewsUser/UserInfoCard';
import Layout from '../hoc/layout/layout';

class MyReviewsUser extends Component {
    render() {
        return (
            <Layout>
                <div style={{ margin: "77px 0px" }}>
                    {/* <div className="container"> */}
                    <UserInfoCard />
                    <ReviewCard rating={4} />
                    {/* <ReviewCard rating={3} />
                    <ReviewCard rating={4.5} />
                    <ReviewCard rating={3} />
                    <ReviewCard rating={5} /> */}
                    {/* </div> */}
                </div>
            </Layout>
        )
    }
}

export default MyReviewsUser;