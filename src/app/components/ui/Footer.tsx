import React from 'react'
import Image from 'next/image'
import Container from '../Container'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from 'react-icons/fa'

import Logo from '../../../../public/asset/images/ويمي تك.jpg'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#6B2B7A] text-white mt-20 rounded-t-3xl shadow-2xl pb-3">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <Image src={Logo} alt="Wemi Tech Logo" width={150} height={75} className="mb-4 rounded-full" unoptimized />
            <p className="text-sm leading-relaxed text-gray-100">
              ويمى تك – منصتك الإلكترونية الذكية لبيع وشراء المنتجات. نوفر حلول تجارة إلكترونية متكاملة للأفراد والتجار.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-white hover:text-purple-200 transition"><FaFacebookF size={18} /></Link>
              <Link href="#" className="text-white hover:text-purple-200 transition"><FaInstagram size={18} /></Link>
              <Link href="#" className="text-white hover:text-purple-200 transition"><FaTwitter size={18} /></Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">أقسامنا</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-gray-200">الإلكترونيات</Link></li>
              <li><Link href="#" className="hover:text-gray-200">منتجات العناية</Link></li>
              <li><Link href="#" className="hover:text-gray-200">منتجات منزلية</Link></li>
              <li><Link href="#" className="hover:text-gray-200">متجر التجار</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-gray-100">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> المقر الرئيسي: القاهرة، مصر</li>
              <li className="flex items-center gap-2"><FaPhoneAlt /> 0100 123 4567</li>
              <li className="flex items-center gap-2"><FaEnvelope /> support@wemitech.com</li>
            </ul>
          </div>

          {/* Promotions */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">لماذا ويمى تك؟</h3>
            <p className="text-sm text-gray-100 leading-relaxed mb-3">
              نقدم لك تجربة تجارة إلكترونية مرنة وآمنة، سواء كنت مشتريًا أو تاجرًا.
            </p>
            <ul className="list-disc list-inside text-sm text-purple-100 space-y-1">
              <li>منصة موثوقة للتجار</li>
              <li>شحن سريع وآمن</li>
              <li>طرق دفع متعددة</li>
              <li>دعم فني مستمر</li>
            </ul>
            <div className="flex items-center gap-4 mt-6 text-white opacity-80">
              <FaCcVisa size={32} className="hover:opacity-100 transition" />
              <FaCcMastercard size={32} className="hover:opacity-100 transition" />
              <FaCcPaypal size={32} className="hover:opacity-100 transition" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-purple-400 pt-6 text-center text-sm text-gray-200">
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة – <span className="font-semibold">Wemi Tech</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
