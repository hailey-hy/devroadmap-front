import React from 'react'
import { FOOTER } from '../UI/Constants'
import './footer.css'

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="footer-team">
          <div className='footer-team-detail'>
            <h5 className="footer-content">
              {FOOTER.BACK}
            </h5>
            <div className="footer-content-detail-grid">
            <h5 className="footer-name">
              {FOOTER.BACK_NAME}
            </h5>
            <h5 className="footer-email">
              {FOOTER.BACK_EMAIL}
            </h5>
            </div>
          </div>
          <div className='footer-team-detail'>
            <h5 className="footer-content">
              {FOOTER.FRONT}
            </h5>
            <div className="footer-content-detail-grid">
            <h5 className="footer-name">
              {FOOTER.FRONT_NAME}
            </h5>
            <h5 className="footer-email">
              {FOOTER.FRONT_EMAIL}
            </h5>
            </div>
          </div>
          <div className='footer-team-detail'>
            <h5 className="footer-content">
              {FOOTER.ILLUST}
            </h5>
            <div className="footer-content-detail-grid">
            <h5 className="footer-name">
              {FOOTER.ILLUST_NAME}
            </h5>
            <h5 className="footer-email">
            {FOOTER.ILLUST_EMAIL}
            </h5>
            </div>
          </div>
          
        </div>
        <h5 class='footer-content footer-copy'>{FOOTER.COPYRIGHT}</h5>
    </footer>
  )
}

export default Footer