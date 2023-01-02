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
          <span className="footer-title">Quick Links</span>
          <a href='/#home' className="link link-hover">Home</a>
          <a href='/#category' className="link link-hover">Categories</a>
          <a href="/#about" className="link link-hover">About</a>
          <a href="/#contact" className="link link-hover">Contact</a>
        </div>
        <div>
          <span className="footer-title">Social Media</span>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Instagram</a>
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