import React from 'react'
import Card from '../../../../../MaterialComponents/Card';
import styles from '../../ProfilePageBodyLeftStyles';
import RatingIndicators from '../../../../../Widgets/RatingIndicators/RatingIndicators'
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import EditIcon from '@material-ui/icons/EditOutlined'
import ShareIcon from '@material-ui/icons/ShareOutlined';

const ReviewCard = () => {
    return (
        <Card>
            <style jsx>{styles}</style>
            <div className="cardHeader">
                <img
                    src="/static/about/images/arturs_color.png"
                    alt="user-img"
                    className="cardImg"
                />
                <div className="userNameReview">
                    <p className="userName">Arturs Rasnacis</p>
                    <span className='reviews'>
                        <EditIcon
                            style={{ fontSize: "22px", padding: "0 4px 0 0" }}
                        />
                        <span>10</span> reviews
                    </span>
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
            <div className="cardFooter">
                <div>
                    <span className="useful">
                        <LikeIcon
                            style={{ fontSize: "22px", padding: "0 4px 0 0" }}
                        />
                        <span className="iconText">Useful</span>
                    </span>
                    <span>
                        <ShareIcon
                            style={{ fontSize: "22px", padding: "0 4px 0 0" }}
                        />
                        <span className="iconText">Share</span>
                    </span>
                </div>
                <span>
                    <FlagIcon
                        style={{ fontSize: "18px", marginRight: "16px" }}
                    />
                </span>
            </div>
        </Card>
    )
}

export default ReviewCard;
