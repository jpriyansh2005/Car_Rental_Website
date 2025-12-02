import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role')
      if (data.success) {
        setIsOwner(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 liquid-glass"
    >
      {/* NAVBAR */}
      <div className="w-full border-b border-borderColor shadow-md px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex items-center justify-between backdrop-blur-xl">
        
        {/* Logo */}
        <Link to="/">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={assets.logo}
            alt="logo"
            className="h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-12 ml-12">
          {menuLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`relative text-[15px] font-semibold tracking-wide transition-all ${
                isActive(link.path)
                  ? "text-gray-900"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.name}

              {/* Active underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all ${
                  isActive(link.path) ? "w-full bg-green-600" : "w-0 bg-green-600"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden sm:flex items-center gap-6">

          <button
            onClick={() => (isOwner ? navigate('/owner') : changeRole())}
            className="text-[15px] font-medium hover:text-black transition"
          >
            {isOwner ? 'Dashboard' : 'List cars'}
          </button>

          {/* Green Login / Logout */}
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true)
            }}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[15px] font-semibold shadow-md transition"
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden p-1"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden fixed top-16 right-0 w-full h-screen bg-white shadow-lg p-6">
          <div className="flex flex-col gap-6 text-lg">
            {menuLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-black"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                isOwner ? navigate('/owner') : changeRole()
                setOpen(false)
              }}
              className="text-left hover:text-black"
            >
              {isOwner ? 'Dashboard' : 'List cars'}
            </button>

            <button
              onClick={() => {
                user ? logout() : setShowLogin(true)
                setOpen(false)
              }}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg w-max"
            >
              {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      )}

      {/* Liquid glass animation */}
      <style>{`
        .liquid-glass {
          background: rgba(255,255,255,0.28);
          backdrop-filter: blur(14px);
          position: relative;
          overflow: hidden;
        }

        .liquid-glass::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45), rgba(255,255,255,0.05));
          animation: liquidMove 10s ease-in-out infinite;
          opacity: 0.55;
        }

        @keyframes liquidMove {
          0%   { transform: translate(0%, 0%) scale(1); }
          50%  { transform: translate(25%, 25%) scale(1.15); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
      `}</style>
    </motion.nav>
  )
}

export default Navbar
