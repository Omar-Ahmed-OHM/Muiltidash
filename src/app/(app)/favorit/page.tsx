"use client"

import { BaseUrl } from "@/app/components/Baseurl";
import { main_screen_Product } from "@/app/lib/type"
import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import Container from "@/app/components/Container";
import SmartNavbar from "@/app/components/ui/Navbar";

export default function Favorite(){
  const url = `${BaseUrl}users/favorites`;
  const [favorite, setFavorite] = useState<main_screen_Product[]>([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorite(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorite();
  }, []);

  return(
    <>
    <SmartNavbar/>
    <Container>

      {favorite.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-38 ">لم تضف أي منتج إلى المفضلة بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-32">
          {favorite.map(product => (
            <div 
              key={product._id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="object-contain max-h-full max-w-full transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 flex flex-col justify-between h-[250px]">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{product.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{product.description}</p>
                </div>

                <div>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    السعر: <span className="text-indigo-800 dark:text-indigo-300">{product.price} د.ع</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">التصنيف: {product.category}</p>
                  <p className={`text-sm font-medium ${product.stockQuantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.stockQuantity > 0 ? `متوفر: ${product.stockQuantity}` : 'غير متوفر'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
    </>
  )
}
