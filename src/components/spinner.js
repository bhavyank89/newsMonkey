import React, { Component } from 'react'
import loadingBar from './loadingBar.gif'

export default class spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loadingBar} alt="loadingBar" />
            </div>
        )
    }
}
