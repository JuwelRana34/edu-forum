import React from 'react'
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router'

function Foter() {
  return (
    < >
    <footer className="footer mt-10  text-base-content p-10">
    <nav>
      <h6 className="footer-title">Services</h6>
      <a className="link link-hover">Branding</a>
      <a className="link link-hover">Design</a>
      <a className="link link-hover">Marketing</a>
      <a className="link link-hover">Advertisement</a>
    </nav>
    <nav>
      <h6 className="footer-title">Company</h6>
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
      <a className="link link-hover">Jobs</a>
      <a className="link link-hover">Press kit</a>
    </nav>
    <nav>
      <h6 className="footer-title">Legal</h6>
      <a className="link link-hover">Terms of use</a>
      <a className="link link-hover">Privacy policy</a>
      <a className="link link-hover">Cookie policy</a>
    </nav>
  </footer>
  <footer className="footer  text-base-content border-base-300 border-t px-10 py-4">
    <aside className="grid-flow-col items-center">
      <img className='w-14 mx-2' src='https://cdn-icons-png.flaticon.com/128/12112/12112232.png'/>
      <p>
      <span>Edu Forum bd.</span> 
        <br />
        2021 - {new Date().getFullYear()}
      </p>
    </aside>
    <nav className="md:place-self-center md:justify-self-end">
      <div className="grid grid-flow-col gap-4">
       <Link to={''}>
        <FaFacebook size={24}/>
       </Link>
       <Link to={''}>
        <FaLinkedin size={24}/>
       </Link>
       <Link to={''}>
        <FaWhatsapp size={24}/>
       </Link>
       
      </div>
    </nav>
  </footer>
  </>
  )
}

export default Foter