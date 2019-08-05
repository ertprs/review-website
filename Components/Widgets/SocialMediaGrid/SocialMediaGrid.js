import React from 'react';
import SocialIconBox from '../SocialIconBox/SocialIconBox';
const SocialMediaGrid = (props)=>{

    //TODO: GET SOCIAL DETAILS AS AN ARRAY AND LOOP
    return(
        <div>
            <div className="row">
                <div className="col-md-6">
                    <SocialIconBox iconName="facebook" caption="followers" followersCount={212404} iconStyles={{color:"#3C5A99"}} />
                </div>
                <div className="col-md-6">
                    <SocialIconBox iconName="twitter" caption="followers" followersCount={200125} iconStyles={{color:"#38A1F3"}} />
                </div>
            </div>

            <div className="row" style={{marginTop:"5%"}}>
                <div className="col-md-6">
                    <SocialIconBox iconName="medium" caption="followers" followersCount={125896} iconStyles={{color:"#00ab6c"}} />
                </div>
                <div className="col-md-6">
                    <SocialIconBox iconName="linkedin" caption="followers" followersCount={123598} iconStyles={{color:"#0077B5"}} />
                </div>
            </div>
        </div>
    )
}

export default SocialMediaGrid;