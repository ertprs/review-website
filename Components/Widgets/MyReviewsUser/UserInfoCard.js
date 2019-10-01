import React from 'react';
import { reviewListStyles } from './myReviewsStyles';

const UserInfoCard = (props) => {
    return (
        <div>
            <style jsx>{reviewListStyles}</style>
            <div className="userInfoCard">
                <div className="row">
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-5">
                        <div className="displayFlex">
                            <img
                                src="/static/images/pic.jpeg"
                                alt="user-img"
                            />
                            <div className="verticalAlign">
                                <h3 className="userName">Shubham Chitransh</h3>
                                <p className='countryName'>India</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-5">
                        <div className="displayFlex">
                            <div className="verticalAlign">
                                <h3>3</h3>
                                <p>Reviews</p>
                            </div>
                            <div className="verticalAlign">
                                <h3>5</h3>
                                <p>Reads</p>
                            </div>
                            <div className="verticalAlign">
                                <h3>0</h3>
                                <p>Useful</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserInfoCard;