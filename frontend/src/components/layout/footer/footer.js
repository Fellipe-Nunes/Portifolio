import React from 'react'
import './footer.css'
import imgLogo from '../../../assets/img/logo.png'

const Footer = () => (
    <footer>
        <div className="projectName">
            BOOTCAMP - Full Stack :: MERN
      </div>
        <div className="copyRight">
            <img src={imgLogo} alt="" />
        </div>
    </footer>
)


export default Footer