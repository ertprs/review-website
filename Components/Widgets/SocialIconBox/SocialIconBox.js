import React from 'react';
import {socialIconBoxStyles} from './socialIconBoxStyles';

const SocialIconBox = ({iconName, caption, followersCount, iconStyles})=>{
    return(
        <div className="socialIconBoxContainer">
            <style jsx>
                {socialIconBoxStyles}
            </style>
            <div className="socialIconContainer">
                <div><i className={`fa fa-${iconName}`} style={{...iconStyles}}></i></div>
            </div>
            <div className="socialFollowersContainer">
                <div className="followers">{followersCount}</div>
                <div className="caption">{caption}</div>
            </div>
        </div>
    )
}

export default SocialIconBox;