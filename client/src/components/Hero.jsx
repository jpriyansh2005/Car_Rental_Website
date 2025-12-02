import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()

    const handleSearch = (e)=>{
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className='h-screen flex flex-col items-center justify-center gap-14 bg-white-200 text-center'>

        {/* Moving gradient headline */}
        <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-4xl md:text-5xl font-semibold 
                       bg-gradient-to-r from-green-400 to-black bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient'>
          Luxury cars on Rent
        </motion.h1>
      
      {/* ===== Neon Gradient Border (Light Theme Inside) ===== */}
      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className='w-full max-w-80 md:max-w-200'
      >

        {/* Outer glowing neon border */}
        <div className="p-[2px] rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 bg-[length:200%_100%] animate-gradient neon-glow">

          {/* Inner WHITE search box (original theme restored) */}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-full w-full bg-white shadow-xl'>

            {/* LEFT Inputs */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
                
                {/* Location */}
                <div className='flex flex-col items-start gap-2'>
                    <select 
                      required 
                      value={pickupLocation} 
                      onChange={(e)=>setPickupLocation(e.target.value)}
                      className="px-3 py-2 rounded-md outline-none border border-gray-300"
                    >
                        <option value="">Pickup Location</option>
                        {cityList.map((city)=> (
                          <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <p className='px-1 text-sm text-gray-600'>
                      {pickupLocation ? pickupLocation : 'Please select location'}
                    </p>
                </div>

                {/* Pickup Date */}
                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='pickup-date' className="text-sm text-gray-600">Pick-up Date</label>
                    <input 
                      value={pickupDate} 
                      onChange={e=>setPickupDate(e.target.value)} 
                      type="date" 
                      id="pickup-date" 
                      min={new Date().toISOString().split('T')[0]}
                      className='text-sm text-gray-700 px-3 py-2 border border-gray-300 rounded-md'
                      required
                    />
                </div>

                {/* Return Date */}
                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='return-date' className="text-sm text-gray-600">Return Date</label>
                    <input 
                      value={returnDate} 
                      onChange={e=>setReturnDate(e.target.value)} 
                      type="date" 
                      id="return-date" 
                      className='text-sm text-gray-700 px-3 py-2 border border-gray-300 rounded-md'
                      required
                    />
                </div>

            </div>

            {/* RIGHT Search Button (GREEN) */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className='flex items-center justify-center gap-1 px-9 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full cursor-pointer max-sm:mt-4 shadow-lg'
            >
                <img src={assets.search_icon} alt="search" className='w-4 h-4 invert brightness-0 contrast-200' />
                Search
            </motion.button>

          </div>
        </div>
      </motion.form>

      {/* Car Image */}
      <motion.img 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car} 
        alt="car" 
        className='max-h-74 relative w-full max-w-4xl mx-auto animate-float transition-all duration-500 ease-in-out hover:-translate-y-3 hover:scale-105'
      />

      {/* Gradient + Glow Animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 100%;
          animation: gradient 5s ease infinite;
        }

        /* stronger neon glow */
        .neon-glow {
          box-shadow:
            0 10px 40px rgba(16,185,129,0.18),
            0 0 80px rgba(16,185,129,0.18),
            inset 0 0 40px rgba(6,95,60,0.15);
          animation: neonPulse 3.2s ease-in-out infinite;
        }

        @keyframes neonPulse {
          0% {
            box-shadow: 
              0 10px 40px rgba(16,185,129,0.14),
              0 0 60px rgba(16,185,129,0.14);
          }
          50% {
            box-shadow: 
              0 12px 70px rgba(16,185,129,0.22),
              0 0 120px rgba(16,185,129,0.25);
          }
          100% {
            box-shadow: 
              0 10px 40px rgba(16,185,129,0.14),
              0 0 60px rgba(16,185,129,0.14);
          }
        }
      `}</style>
    </motion.div>
  )
}

export default Hero
