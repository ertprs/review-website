import React, { Component } from "react";
import { authenticationPageStyles } from "../Components/Styles/authenticationPageStyles";
import FormField from "../Components/Widgets/FormField/FormField";
import validate from "../utility/validate";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import { baseURL, activateUserApi } from "../utility/config";
import Loader from "../Components/Widgets/Loader/Loader";
import Router from "next/router";
import Layout from "../hoc/layout/layout";

class ActivateUser extends Component {
    state = {
        isLoading: true,
        success: false
    };

    componentDidMount() {
        const url = window.location.href;
        if (url) {
            let splitUrlArray = url.split("/");
            let token = "";
            if (!_isEmpty(splitUrlArray) && Array.isArray(splitUrlArray)) {
                token = splitUrlArray[splitUrlArray.length - 1];
            }
            if (token) {
                axios
                    .get(`${baseURL}${activateUserApi}/${token}`)
                    .then(result => {
                        let success = _get(result, "data.success", false);
                        this.setState({ success, isLoading: false });
                    })
                    .catch(error => {
                        let success = _get(error, "response.data.success", false);
                        this.setState({ success, isLoading: false });
                    });
            }
        }
    }

    onLoginClick = () => {
        window.location.assign('/login')
    }

    showData = () => {
        const { isLoading, success } = this.state
        let data
        if (isLoading) {
            data = (
                <div className="card">
                    <style jsx> {authenticationPageStyles} </style>
                    <Loader />
                </div>
            )
        } else {
            if (success) {
                data = (
                    <div className="card">
                        <style jsx> {authenticationPageStyles} </style>
                        <div className="cardHeading">
                            <h2 style={{ color: 'green' }}> Account activated successfully! </h2>{" "}
                        </div>
                        <button className="registerBtn" onClick={this.onLoginClick}>
                            Go to Login
                        </button>
                    </div>
                )
            } else {
                data = (
                    <div className="card">
                        <style jsx> {authenticationPageStyles} </style>
                        <div className="cardHeading">
                            <h2 style={{ color: "red" }}>Something went wrong!</h2>
                        </div>
                        <button className="registerBtn" onClick={this.onLoginClick}>
                            Go to Login
                        </button>
                    </div>
                )
            }
        }
        return data
    }

    render() {
        return (
            <Layout>
                <div className="mainContainer">
                    <div className="container">
                        <div className="col-md-6 offset-md-3">
                            <style jsx> {authenticationPageStyles} </style>
                            {this.showData()}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default ActivateUser;
