import React from 'react';
import { reviewListStyles } from './reviewListStyles';

const RepliedBox = () => {
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
                        Edit
                    </button>
                    <button disabled={false} className="postReplyButton">
                        <i className="fa fa-trash-o postReplyIcon"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RepliedBox;