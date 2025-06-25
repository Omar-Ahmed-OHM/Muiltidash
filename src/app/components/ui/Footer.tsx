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

import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#6B2B7A] text-white mt-20 rounded-t-3xl shadow-2xl pb-3">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <Image src={Logo} alt="Hoor Hyper Logo" width={150} height={75} className="mb-4" />
            <p className="text-sm leading-relaxed text-gray-100">
              هايبر حور – كل احتياجات بيتك من مكان واحد. عروض يومية، جودة مضمونة، وخدمة عملاء ممتازة.
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
              <li><a href="#" className="hover:text-gray-200">العروض اليومية</a></li>
              <li><a href="#" className="hover:text-gray-200">البقالة</a></li>
              <li><a href="#" className="hover:text-gray-200">خضار وفاكهة</a></li>
              <li><a href="#" className="hover:text-gray-200">أدوات منزلية</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-gray-100">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> الفرع الرئيسي: شارع الثورة، القاهرة</li>
              <li className="flex items-center gap-2"><FaPhoneAlt /> 0100 123 4567</li>
              <li className="flex items-center gap-2"><FaEnvelope /> support@hoorhyper.com</li>
            </ul>
          </div>

          {/* Promotions */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-purple-300 pb-2">عروضنا مستمرة!</h3>
            <p className="text-sm text-gray-100 leading-relaxed mb-3">
              استمتع بأقوى التخفيضات على آلاف المنتجات يوميًا. وفر أكتر وعيش تجربة تسوق ذكية من بيتك!
            </p>
            <ul className="list-disc list-inside text-sm text-purple-100 space-y-1">
              <li>توصيل سريع وآمن لجميع المحافظات</li>
              <li>خدمة عملاء 24/7</li>
              <li>خصومات نهاية الأسبوع %</li>
              <li>منتجات طازجة يوميًا</li>
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
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة – <span className="font-semibold">Hoor Hyper Market</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
