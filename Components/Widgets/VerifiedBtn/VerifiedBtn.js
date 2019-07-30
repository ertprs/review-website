import React from 'react';
import {verifiedBtnStyles} from './verifiedBtnStyles';
const VerifiedBtn = ()=>{

    return(
        <div className="verifiedBtnContainer">
            <style jsx>
                {verifiedBtnStyles}
            </style>
            <div className="icon-container"><i className="fa fa-check"></i></div>
            <div className="text-container">Verified</div>
        </div>
    )
}

export default VerifiedBtn;