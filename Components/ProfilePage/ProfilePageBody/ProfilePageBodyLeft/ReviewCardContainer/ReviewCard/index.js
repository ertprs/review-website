import React from 'react'
import Card from '../../../../../MaterialComponents/Card';
import styles from '../../ProfilePageBodyLeftStyles';
import RatingIndicators from '../../../../../Widgets/RatingIndicators/RatingIndicators'
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined';
import FlagIcon from '@material-ui/icons/FlagOutlined';

const ReviewCard = () => {
    return (
        <Card>
            <style jsx>{styles}</style>
            <div className="cardHeader">
                <img
                    src="/static/about/images/arturs_color.png"
                    alt="user-img"
                    style={{
                        width: "auto",
                        height: "50px",
                        borderRadius: "50px"
                    }}
                />
                <div className="userNameReview">
                    <p className="userName">Shubham Chitransh</p>
                    <span className='reviews'>India</span>
                </div>
            </div>
            <div className="cardBody">
                <div className="cardBodyHeader">
                    <RatingIndicators
                        rating={4}
                        typeOfWidget="star"
                        widgetRatedColors="#21bc61"
                        widgetDimensions="20px"
                        widgetSpacings="1px"
                    />
                    <p className="time">2 hours ago</p>
                </div>
                <div className="cardBodyMain">
                    <h4>Great service and customer care.</h4>
                    <p>
                        Great service and customer care.
                        Awesome prices and fast shipping.
                    </p>
                </div>
            </div>
            <div className="cardBodyHeader">
                <div>
                    <span style={{ marginRight: "10px" }}>
                        <LikeIcon />
                        Useful
                    </span>
                    <span>
                        <i className="fa fa-share"></i>
                        Share
                    </span>
                </div>
                <p>
                    <FlagIcon />
                    Flag
                </p>
            </div>
        </Card>
    )
}

export default ReviewCard;
