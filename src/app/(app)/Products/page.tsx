"use client";
import { useEffect, useRef, useState } from "react";
import { Searchproduct } from "@/app/store/SearchproductsStore";
import { fetchData } from "@/app/lib/methodes";
import { ApiResponse, HomePageData } from "@/app/lib/type";
import { Card } from "@/app/components/ui/Card";
import Image from "next/image";
import InputField from "@/app/components/ui/Input";
import { Heart, Search, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";
import Logo from '../../../../public/asset/images/حورلوجو-1.png'
import debounce from "lodash.debounce";
export default function ProductPage() {
  const [inputValue, setInputValue] = useState("");
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    products,
    fetchProducts,
    hasMore,
    loading,
    setSearchTerm,
  } = Searchproduct();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response: ApiResponse<HomePageData> = await fetchData(
          "https://hoorbookapp.com/api/home"
        );
        setHomeData(response.data);
      } catch (error) {
        console.error("Home Data Error:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (inputValue === "") return; 
    fetchProducts(true, inputValue);
  }, []);

  // Debounce input

const debouncedSearch = useRef(
  debounce((value: string) => {
    setSearchTerm(value);
    fetchProducts(true, value);
  }, 500)
).current;

useEffect(() => {
  if (inputValue.trim()) {
    debouncedSearch(inputValue);
  }
}, [inputValue]);


  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts(false);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  const isSearching = inputValue.trim().length > 0;
  const renderProducts = isSearching ? products : homeData?.topSelling ?? [];

  return (
    <div className="p-4">
   <div dir="rtl" className="navbar px-4 py-2 flex items-center justify-center gap-[40px] shadow-sm bg-btn-color">
    
    <div className="text-white font-bold text-lg">
    <Image src={Logo} alt="شعار الموقع" className="h-[42px] w-[55px] rounded-[10px]" />
    </div>
    
    <div className="flex flex-1 mx-4 max-w-xl bg-white rounded-lg outline-none overflow-hidden shadow-inner">
    <div className="flex-grow">
       <InputField
              type="text"
              name="search"
              placeholder="بتدور على ايه؟"
              onChange={(e) => setInputValue(e.target.value)}
              className="!bg-white text-black placeholder:text-gray-400 border-solid-[1px] border-gray-400 outline-none focus:ring-0"
            />
    </div>
    <div className=" px-4 py-2  font-bold text-sm flex items-center rounded-none rounded-l-lg text-black">
      <Search className="ml-1" size={18} />
    </div>
    </div>
    
    <div className="flex items-center space-x-4 rtl:space-x-reverse text-white">
    <Link href={'/register'}>
    <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition">
      <User2 size={22} />
      <span className="text-sm">تسجيل دخول</span>
    </div>
    </Link>
    
    <div className="h-6 w-px bg-gray-400"></div>
    
    <Heart size={22} className="cursor-pointer hover:text-yellow-400 transition" />
    
    <div className="h-6 w-px bg-gray-400"></div>
    
    <ShoppingCart size={22} className="cursor-pointer hover:text-yellow-400 transition" />
    </div>
    </div>
    

      {renderProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">لا توجد منتجات</p>
      )}

      <div className="flex gap-4 flex-wrap justify-center">
        {renderProducts.map((image, index) => (
          <div
            key={index}
            className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] truncate"
            dir="rtl"
          >
            <Card
              id={index + 1}
              image={image.image}
              name={image.name}
              description={image.description}
              price={image.price}
              originalPrice={image.originalPrice}
              category={image.category}
              discount={image.discount}
              love={image.love}
              stock={image.stock}
              soldOut={image.soldOut}
              packet_pieces={image.packet_pieces}
              packet_price={image.packet_price}
              piece_price_after_offer={image.piece_price_after_offer}
              packet_price_after_offer={image.packet_price_after_offer}
              reviews_avg={image.reviews_avg}
              handellove={() => console.log(`Liked product ${image.id}`)}
            />
          </div>
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {isSearching && hasMore && (
        <div ref={loaderRef} className="h-10 w-full mt-4" />
      )}
    </div>
  );
}
