import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="footer-team">
          <div className='footer-team-detail'>
            <h5 className="footer-content">
              Backend Developer
            </h5>
            <div className="footer-content-detail-grid">
            <h5 className="footer-name">
              양정민
            </h5>
            <h5 className="footer-email">
            wjdals0814@naver.com
            </h5>
            </div>
          </div>
          <div className='footer-team-detail'>
            <h5 className="footer-content">
              Frontend Developer
            </h5>
            <div className="footer-content-detail-grid">
            <h5 className="footer-name">
              전해연
            </h5>
            <h5 className="footer-email">
            lillyine.hy@gmail.com
            </h5>
            </div>
          </div>
          <div className='footer-team-detail'>
            <h5 className="footer-content">
              Illustrator
            </h5>
            <div className="footer-content-detail-grid">
            <h5 className="footer-name">
              한유나
            </h5>
            <h5 className="footer-email">
            yunahan914@gmail.com
            </h5>
            </div>
          </div>
          
        </div>
        <h5 class='footer-content footer-copy'>Copyright 2022.Team Gardener all rights reserved.</h5>
    </footer>
  )
}

export default Footer