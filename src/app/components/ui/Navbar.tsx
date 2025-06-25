'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, User2 } from 'lucide-react'
import Logo from '../../../../public/asset/images/حورلوجو-1.png'

const SmartNavbar = () => {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    const currentScrollY = window.scrollY
    setVisible(currentScrollY < lastScrollY || currentScrollY < 80)
    setLastScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <header
      dir="rtl"
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } bg-gradient-to-tr from-[#6B2B7A] via-[#844C9A] to-[#6B2B7A] shadow-lg backdrop-blur-md`}
    >
      {/* الشريط الرئيسي */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* الشعار */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="شعار"
            className="w-[46px] h-[46px] rounded-full "
          />
        </Link>

        {/* شريط البحث */}
        <div className="hidden md:flex flex-1 max-w-lg items-center bg-white/90 backdrop-blur rounded-full px-4 py-1 shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition">
          <Search className="text-gray-500 ml-2" size={18} />
          <input
            type="text"
            placeholder="إبحث عن منتج..."
            className="bg-transparent flex-1 text-sm focus:outline-none text-gray-800 placeholder:text-gray-400"
          />
        </div>

        {/* الأيقونات */}
        <div className="flex items-center gap-4 text-white text-xs sm:text-sm">
          <Link
            href="/register"
            className="flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110"
          >
            <div className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
              <User2 size={20} />
            </div>
          </Link>

          <div className="border-l border-white/30 h-6 mx-1" />

          <Link
            href="/wishlist"
            className="flex flex-col items-center hover:text-pink-300 transition transform hover:scale-110"
          >
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-300/20 transition">
              <Heart size={20} />
            </div>
          </Link>

          <div className="border-l border-white/30 h-6 mx-1" />

          <Link
            href="/cart"
            className="flex flex-col items-center hover:text-yellow-400 transition transform hover:scale-110"
          >
            <div className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition">
              <ShoppingCart size={20} />
            </div>
          </Link>
        </div>
      </div>

      {/* البحث في الموبايل */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-yellow-400 transition">
          <Search className="text-gray-500 ml-2" size={18} />
          <input
            type="text"
            placeholder="إبحث عن منتج..."
            className="bg-transparent flex-1 text-sm focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>
    </header>
  )
}

export default SmartNavbar
