import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {logOut} from '../store/actions/authActions';
import Router from "next/router";

const Logout = (props)=>{

    useEffect(()=>{
        props.logOut()
        Router.push("/")
    },[])

    return(
        <div></div>
    )
}

export default connect(null, {logOut})(Logout)