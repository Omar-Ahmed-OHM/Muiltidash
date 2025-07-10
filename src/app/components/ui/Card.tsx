import { type CardProps } from '@/app/lib/type'
import React, { useState } from 'react'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import Container from '../Container'
import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import Link from 'next/link'

export const Card: React.FC<CardProps> = ({
  _id, title, description, images, category,
  price, discount, originalPrice,
  stockQuantity, soldOut = false, love = false, handellove = () => {},
  packet_pieces, packet_price, piece_price_after_offer,
  packet_price_after_offer, reviews_avg
}) => {
  const [loveit, setLove] = useState<boolean>(love)
  const handleLoveToggle = () => {
    setLove(!loveit); handellove()
  }

  

  return (
    <Container>
      <div className="w-[300px] h-[520px] flex flex-col justify-between rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#e8f3f0] to-[#f8f8f8] hover:shadow-xl transition relative mx-auto group">
        
        {/* زر القلب */}
        <div className="absolute top-2 left-2 bg-pink-100 p-1 rounded-full cursor-pointer z-40" onClick={handleLoveToggle}>
          {loveit ? (
            <Heart size={18} className="text-pink-500" fill="#ec4899" stroke="#ec4899" />
          ) : (
            <Heart size={18} className="text-gray-500" fill="none" stroke="#6b7280" />
          )}
        </div>

        {/* الأوفرلي */}
        <div className="absolute inset-0 bg-[#6B2B7A]/80 flex flex-col items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Image src={Logo} alt="Logo" width={220} height={220} className="w-[120px] h-[120px] object-contain rounded-full mb-4" unoptimized />
          <div dir="rtl">
            <Link href={`/Categories/${_id}`}>
              <button className="font-bold text-lg px-6 py-2 rounded-xl bg-[#ffc94d] transition w-full">عرض التفاصيل</button>
            </Link>
          </div>
        </div>

        {/* الصورة */}
        <div className="relative w-full h-[200px] bg-white flex items-center justify-center">
          <Image
            src={images?.[0] || '/no-image.png'}
            alt={title}
            width={180}
            height={180}
            className="object-contain max-h-[180px]"
            unoptimized
          />
        </div>

        {/* المحتوى */}
        <div className="p-4 flex flex-col justify-between flex-grow space-y-1 text-left" dir="rtl">
          <h2 className="text-base font-bold text-gray-900 line-clamp-1">{title}</h2>

          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>


          <div className="flex items-center justify-between mt-1">
            <div>
              <span className="font-bold text-lg text-black">
                {piece_price_after_offer ?? price} ج.م
              </span>
              {originalPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">{originalPrice} ج.م</span>
              )}
            </div>
            {discount && (
              <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-semibold">
                خصم {discount}%
              </span>
            )}
          </div>

          {packet_price && packet_pieces !== undefined && (
            <p className="text-xs text-gray-600 mt-1">
              بالكرتونة: {packet_price_after_offer ?? packet_price} ج.م ({packet_pieces} قطعة)
            </p>
          )}

          {typeof stockQuantity === 'number' && (
            <p className={`text-xs font-bold mt-1 ${
              stockQuantity === 0 ? 'text-red-500' :
              stockQuantity <= 4 ? 'text-orange-300' :
              'text-gray-600'
            }`}>
              {stockQuantity === 0
                ? 'غير متوفر'
                : stockQuantity <= 4
                ? `متبقى ${stockQuantity}`
                : `الكمية: ${stockQuantity}`}
            </p>
          )}

          {soldOut && (
            <span className="text-red-600 font-bold text-lg mt-1">نفذت الكمية</span>
          )}
        </div>
      </div>
    </Container>
  )
}
