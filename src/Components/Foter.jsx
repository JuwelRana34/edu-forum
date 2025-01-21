import React from 'react'
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router'
import useCheckAdmin from '../Routers/useCheckAdmin';

function Foter() {
  const role = useCheckAdmin()
  return (
    <>
      <footer className="footer mt-1  text-base-content py-5 px-10">
        <nav>
          <h6 className="footer-title">features</h6>
          <p className="">Post</p>
          <p className="">Comment</p>
          <p className="">Premium Member</p>
        </nav>
        <nav>
          <h6 className="footer-title">Links</h6>
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          {role === "user" ? (
            <Link to={"/Dashboard/MyProfile"} className="hover:underline">
              Profile
            </Link>
          ) : (
            <Link to={"/Dashboard/AdminProfile"} className="hover:underline">
              Profile
            </Link>
          )}
          <Link to={"/MemberShip"} className="hover:underline">
            Member Ship
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <p className="">01767632836</p>
          <p className="">juwelrana3426@gmail.com</p>
          <p className="">Dhaka, Bangladesh</p>
        </nav>
      </footer>
      <footer className="footer  text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <img
            className="w-14 mx-2"
            src="https://cdn-icons-png.flaticon.com/128/12112/12112232.png"
          />
          <p>
            <Link to={"/"} className="Logo text-xl text-[#23a4f8] md:text-3xl">
              Edu Forum bd.
            </Link>
            <br />
            2021 - {new Date().getFullYear()}
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <Link to={"https://www.facebook.com/juwel34/"} target="_blank">
              <FaFacebook size={24} />
            </Link>
            <Link
              target="_blank"
              to={"https://www.linkedin.com/in/md-juwel-rana/"}
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              target="_blank"
              to={"https://wa.me/+8801761632836?text=MESSAGE"}
            >
              <FaWhatsapp size={24} />
            </Link>
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Foter