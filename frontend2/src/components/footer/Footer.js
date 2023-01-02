import React from 'react';
import logo from "../../images/icon.png"

const Footer = () => {
  return (
    <div className='w-full h-auto'>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <img src={logo} alt="logo" width="80" height="160" />
          <p>Order Me.<br />Providing good food</p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </div>
  )
}

export default Footer