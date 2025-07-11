"use client";

import Container from "./components/Container";
import { Card } from "./components/ui/Card";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Slider } from "./components/ui/Slider";
import { useEffect, useState } from "react";
import SliderSkeleton from "./components/ui/SliderSkeleton";
import LogoImageAnimation from "./components/ui/Loader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import SmartNavbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import { ApiResponse, gethome, Pagination, ProductSliderItem, main_screen_Product, AddFavorit } from "./lib/type";
import { BaseUrl } from "./components/Baseurl";
import { fetchData } from "./lib/methodes";
import Cookies from 'js-cookie'
import axios from "axios";
import toast from "react-hot-toast";
import { LoginRequiredModal } from "./components/ui/Pop-up-login";
import { CallApi } from "./lib/utilits";
export default function HomePage() {
  const [showLogo, setShowLogo] = useState(true);
  const [products, setProducts] = useState<main_screen_Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [add,setadd]=useState<boolean>(true);
  const [register,setregister]=useState<boolean>(false)



  const urlfav = `${BaseUrl}users/favorites`;
  const token = Cookies.get("token");

  const productSliderItems: ProductSliderItem[] = [
    {
      id: 1,
      title: "عنوان 1",
      image: '/asset/images/سلايدر اوكسي.png',
      product_id: 101,
    },
    {
      id: 2,
      title: "عنوان 2",
      image: '/asset/images/سلايدر اوكسي.png',
      product_id: 102,
    },
    {
      id: 3,
      title: "عنوان 3",
      image: '/asset/images/سلايدر اوكسي.png',
      product_id: 103,
    },
  ];

  // Show logo once
  useEffect(() => {
    const hasShownLogo = sessionStorage.getItem("hasShownLogo");
    if (hasShownLogo) {
      setShowLogo(false);
    } else {
      setTimeout(() => {
        setShowLogo(false);
        sessionStorage.setItem("hasShownLogo", "true");
      }, 2000);
    }
  }, []);

  const fetchProducts = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const res: ApiResponse<gethome> = await CallApi("get",`${BaseUrl}main/main-screen?page=${page}&limit=10`);
      const newProducts = res.data.products;

      setProducts(prev => [...prev, ...newProducts]);
      setPage(prev => prev + 1);

      if (newProducts.length === 0 || page >= res.data.pagination.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loadingMore &&
        hasMore
      ) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  if (showLogo) return <LogoImageAnimation />;
  if (products.length === 0 && !loadingMore) return <SliderSkeleton />;





if(add){

  const handelfavorit=async(id:string)=>{
    try{
      const res:ApiResponse<AddFavorit>=await axios.post(urlfav, {productId:id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res.data);   
      toast.success("تم الاضافه للمفضله")   
    }
    catch(error){
      console.error("Error fetching products:", error);
    }
  }
}



  const handelfavorit = async (id: string) => {
    try {
      if(!token){
        setregister(true);
        return;
      }
      else{
        setregister(false);
      }
      if (add) {
        // Add to favorites
        const res: ApiResponse<AddFavorit> = await axios.post(urlfav, { productId: id }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('تم تنفيذ العمليه بنجاح ')
        console.log(res.data);
      } 
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <section className="bg-white">
      <SmartNavbar />
      <Container>
        {/* Header SVG */}
        <div className="absolute inset-x-0 top-[20px] h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] z-0 pointer-events-none overflow-hidden w-full aspect-[1440/220] sm:aspect-[1440/300] lg:aspect-[1440/400] ">
          <svg viewBox="0 0 1440 220" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#F5EFFF" />
                <stop offset="100%" stopColor="#fdfbff" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </div>

        {/* Slider Section */}
        <div className="w-full bg-white pt-4 mt-28">
          <div className="max-w-screen-xl mx-auto p-5 text-black z-[10000]">
            {productSliderItems.length > 0 && (
              <Slider
                items={productSliderItems}
                height="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
                objectFit="cover"
                showNavigation={true}
                showPagination={true}
                autoPlayDelay={3000}
              />
            )}
          </div>
        </div>

        {/* Best Selling Products */}
       {/* Best Selling Products */}
<div className="w-full bg-white mt-6 relative shadow-sm rounded-xl">
  <div className="flex justify-center items-center text-2xl mb-4 ">
    <h2 className="text-btn-color font-bold text-[26px] sm:text-[30px] mb-4 tracking-tight">الأكثر مبيعاً</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8 pb-8">
    {products.map((product, index) => (
      <div key={index} className="transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <Card {...product} handellove={() => { handelfavorit(String(product._id)); setadd(true); }} />
      </div>
    ))}
  </div>

  {loadingMore && (
    <div className="text-center py-6">
      <p className="text-sm text-gray-500">جاري تحميل المزيد من المنتجات...</p>
    </div>
  )}
</div>
<LoginRequiredModal show={register}/>
      </Container>
      <Footer />
    </section>
  );
}
