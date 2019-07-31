import React from 'react';
import AmpLinkWrapper from '../../AmpWrappers/AmpLinkWrapper';
import {shareBtnStyles} from './shareBtnStyles';

// OPEN share link in a new tab (modify amplinkwrapper)

const ShareBtn = (props)=>{
    return(
        <div>
            <style jsx>
                {shareBtnStyles}
            </style>
            <AmpLinkWrapper href={props.shareURL} alt="Share Button" styles={{textDecoration:"none", color:"#fff"}}>
            <div className="shareBtn">
                <span>{props.btnText}</span> {props.shareIcon ? <i className={props.shareIcon}></i> : null}
            </div>
            </AmpLinkWrapper>
        </div>
    )
}

export default ShareBtn;