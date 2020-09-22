import React, { useState, useEffect } from 'react';
import './style.css'

const Alert = (props) => {

    const [isShow, setShow] = useState(props.show || false)

    const closeAlert = () => {
        setShow(false)
    }

    useEffect(() => {
        setShow(props.show)
        return () => setShow(false)
    }, [props.show])

    const createAlert = (type, icon, message, messageRedirect = false) =>
        isShow ?
            (
                <div className={`alert alert-${type}`} >
                    <span>
                        <i className={`fa fa-${icon}`}></i> {message}
                        <br />
                        {messageRedirect ? (<small> Você será redirecionado para a Lista</small>) : ""}
                    </span>
                    <div style={{ cursor: 'pointer' }} onClick={closeAlert}><i className="fa fa-close" /></div>
                </div>
            )
            : ""




    const checkAlert = () => {
        switch (props.type) {
            case 'success':
                return createAlert('success', 'check', props.message, true)
            case 'error':
                return createAlert('error', 'warning', props.message)
            default:
                return createAlert('info', 'question-circle', 'Aconteu algo inesperado, tente novamente !')
        }
    }

    return (
        <React.Fragment>
            <div className="boxAlert">
                {checkAlert()}
            </div>
        </React.Fragment>
    )

}

export default Alert