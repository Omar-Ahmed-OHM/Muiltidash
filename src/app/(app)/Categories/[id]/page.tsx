"use client";
import { BaseUrl } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import SmartNavbar from "@/app/components/ui/Navbar";
import { fetchData } from "@/app/lib/methodes";
import { ApiResponse, Product } from "@/app/lib/type";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";

export default function ProductDetailsPage() {
  const pathname = usePathname();
  const productid = pathname.split("/").pop();
  const url = `${BaseUrl}products/${productid}`;
  const [details, setDetails] = useState<Product | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res: ApiResponse<Product> = await fetchData(url);
        setDetails(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, []);

  if (!details) {
    return (
      <Container>
        <div className="flex items-center justify-center h-screen text-lg font-medium">
          جاري تحميل المنتج...
        </div>
      </Container>
    );
  }

return (
  <>
    <SmartNavbar />
    <Container>
      <div className="grid lg:grid-cols-2  gap-10  p-12 max-w-7xl mx-auto">
        {/* Images Section */}
     <div className="w-full relative rounded-xl shadow-lg overflow-hidden pt-12 mt-8">
  {details.images && details.images.length > 1 ? (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      }}
      pagination={{ clickable: true }}
      className="w-full rounded-xl"
    >
      {details.images.map((img: string, i: number) => (
        <SwiperSlide key={i}>
          <img
            src={img}
            alt={`Product image ${i + 1}`}
            className="w-full h-72 sm:h-[400px] object-cover rounded-xl transition-all duration-300"
          />
        </SwiperSlide>
      ))}

      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-3 z-10 bg-white text-purple-700 p-2 rounded-full shadow-md cursor-pointer hover:bg-purple-100 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-3 z-10 bg-white text-purple-700 p-2 rounded-full shadow-md cursor-pointer hover:bg-purple-100 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </Swiper>
  ) : details.images && details.images.length === 1 ? (
    <Image
      src={details.images[0]}
      alt="Product"
      className="w-full h-72 sm:h-[400px] object-cover rounded-xl shadow-lg"
      unoptimized
    />
  ) : (
    <div className="text-center text-gray-500 text-lg font-medium">
      لا توجد صور لهذا المنتج
    </div>
  )}
</div>


        {/* Product Info Section */}
        <div className="w-full space-y-6 pt-8">
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-4">📦 تفاصيل المنتج</h2>
            <ul className="space-y-3 text-gray-800 text-base sm:text-lg">
              <li>
                <span className="font-semibold text-gray-600">اسم المنتج:</span> {details.title}
              </li>
              <li>
                <span className="font-semibold text-gray-600">السعر:</span>{" "}
                <span className="text-green-700 font-bold">{details.price} جنيه</span>
              </li>
              <li>
                <span className="font-semibold text-gray-600">القسم:</span> {details.category}
              </li>
              <li>
                <span className="font-semibold text-gray-600">الكمية المتاحة:</span>{" "}
                {details.stockQuantity}
              </li>
              <li>
                <span className="font-semibold text-gray-600">الوصف:</span> {details.description}
              </li>
            </ul>
          </div>

          {/* Trader Info */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold text-purple-700 mb-3">👨‍💼 بيانات التاجر</h3>
            <ul className="space-y-2 text-gray-700 text-base sm:text-lg">
              <li>
                <span className="font-semibold text-gray-600">الاسم:</span>{" "}
                {details.traderId.firstName}
              </li>
              <li>
                <span className="font-semibold text-gray-600">البريد:</span>{" "}
                {details.traderId.email}
              </li>
              <li>
                <span className="font-semibold text-gray-600">الهاتف:</span>{" "}
                {details.traderId.phoneNumber}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </>
);



}
