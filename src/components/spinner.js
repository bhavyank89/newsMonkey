import React from 'react'
import loadingBar from './loadingBar.gif'

export default function spinner() {
    return (
        <div className='text-center'>
            <img src={loadingBar} alt="loadingBar" />
        </div>
    )
}