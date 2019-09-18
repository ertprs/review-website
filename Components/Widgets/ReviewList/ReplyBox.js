import React from 'react';
import { reviewListStyles } from './reviewListStyles';
import FormField from "../FormField/FormField";

const ReplyBox = () => {
    return (
        <div className="replyCard">
            <style jsx> {reviewListStyles}</style>
            <div className="row">
                <div className="col-md-3">
                    <div className="companyName">
                        <p>Cunami</p>
                    </div>
                </div>
                <div className="col-md-6 replyInputBox">
                    <FormField
                        // {...formData.password}
                        element="textarea"
                        // handleChange={this.handleChange}
                        // type="password"
                        // id="password"
                        rows="5"
                        col="5"
                    />
                    <button disabled={false} className="postReplyButton">
                        <i className="fa fa-pencil postReplyIcon"></i>
                        Post Reply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReplyBox;