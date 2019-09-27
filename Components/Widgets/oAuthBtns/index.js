import React, { Component } from 'react'
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
    googleClientId,
    facebookAppId,
    loginApiOAuth
} from "../../../utility/config";
import { authenticationPageStyles } from '../../Styles/authenticationPageStyles';
import { logIn } from '../../../store/actions/authActions';
import { connect } from 'react-redux';

class OAuthButtons extends Component {
    OAuthSignIn = (response, name) => {
        console.log(response, "res");
        const { logIn } = this.props
        let reqBody = {}
        let loginType = 0
        if (name === 'google') {
            reqBody = {
                provider: name,
                data: {
                    id_token: _get(response, "Zi.id_token", "")
                }
            }
            logIn(reqBody, loginApiOAuth, 3)
        } else if (name === 'facebook') {
            reqBody = {
                provider: name,
                data: {
                    accessToken: response.accessToken
                }
            }
            logIn(reqBody, loginApiOAuth, 2)
        }
    };

    componentClicked = (res) => {
        console.log(res, 'res')
    }

    render() {
        return (
            <div>
                <style jsx>{authenticationPageStyles}</style>
                <GoogleLogin
                    clientId={googleClientId}
                    render={renderProps => (
                        <button
                            className="loginBtn loginBtn--google"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            Login with Google
                    </button>
                    )}
                    onSuccess={response => this.OAuthSignIn(response, "google")}
                    onFailure={response => this.OAuthSignIn(response, "google")}
                    cookiePolicy={"single_host_origin"}
                />
                <FacebookLogin
                    appId={facebookAppId}
                    // autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={response => this.OAuthSignIn(response, "facebook")}
                    render={renderProps => (
                        <button
                            className="loginBtn loginBtn--facebook"
                            onClick={renderProps.onClick}
                        >
                            Login with Facebook
                    </button>
                    )}
                />
            </div>
        )
    }
}

export default connect(null, { logIn })(OAuthButtons);
