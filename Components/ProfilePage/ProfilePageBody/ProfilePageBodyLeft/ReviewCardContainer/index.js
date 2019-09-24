import React, { Component } from 'react'
import ReviewCard from './ReviewCard'

export default class index extends Component {
    render() {
        return (
            <div>
                <div style={{marginBottom:"25px"}}><ReviewCard /></div>
                <div style={{marginBottom:"25px"}}><ReviewCard /></div>
                <div style={{marginBottom:"25px"}}><ReviewCard /></div>
            </div>
        )
    }
}
