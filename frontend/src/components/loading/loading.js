import React from 'react'
import './loading.css'

const Loading = ({ show = false }) => {

    return (
        show ? (
            <div className="loading">
                <div className="loader" />
            </div>
        ) : ""

    )

}
export default Loading