"use client";
import { BaseUrl } from '@/app/components/Baseurl';
import Container from '@/app/components/Container';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SmartNavbar from '@/app/components/ui/Navbar';
import Image from 'next/image';
import { ShoppingCart, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductWithType {
  _id: string;
  title: string;
  traderId: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  images: string[];
  createdAt: string;
  __v: number;
  type: 'cart' | 'order';
}

interface Product {
  _id: string;
  title: string;
  traderId: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  images: string[];
  createdAt: string;
  __v: number;
}

interface Ordershoping {
  _id: string;
  userId: string;
  productId: Product;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  __v: number;
}

interface CartAndOrdersResponseshoping {
  cart: Product[];
  orders: Ordershoping[];
}

export default function Favorite() {
  const [allProducts, setAllProducts] = useState<ProductWithType[]>([]);
  const url = `${BaseUrl}users/shopping`;
  const token = Cookies.get("token");

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await axios.get<{ data: CartAndOrdersResponseshoping }>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartWithType: ProductWithType[] = res.data.data.cart.map((item) => ({
          ...item,
          type: 'cart',
        }));

        const ordersWithType: ProductWithType[] = res.data.data.orders.map((order) => ({
          ...order.productId,
          type: 'order',
        }));

        setAllProducts([...cartWithType, ...ordersWithType]);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    getCart();
  }, []);

 const handelshoping = async (productId: string) => {
  try {
    const res = await axios.post(
      url,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("تم شراء المنتج بنجاح ✅");
    console.log("Purchased:", res.data);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "حدث خطأ أثناء الشراء ❌");
    console.error("Error:", error.response?.data || error.message);
  }
};

const handleRemoveFromCart = async (productId: string) => {
  try {
    const res = await axios.delete(
      url,
      {
        data: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("تم حذف المنتج من السلة 🗑️");
    setAllProducts(prev =>
      prev.filter(p => !(p._id === productId && p.type === 'cart'))
    );
  } catch (error: any) {
    toast.error(error.response?.data?.message || "فشل حذف المنتج ❌");
    console.error("Error:", error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4e1ff] via-white to-[#f6f0ff] p-6 mt-12">
      <SmartNavbar />
      <Container>
        <h2 className="text-4xl font-bold text-center text-[#6B2B7A] my-10">🛍️ مشترياتي</h2>

        {/* 🛒 سلة المشتريات */}
        <h3 className="text-2xl font-semibold text-[#6B2B7A] mt-10 mb-4">سلة المشتريات</h3>
        {allProducts.filter(p => p.type === 'cart').length === 0 ? (
          <p className="text-gray-500">لا توجد منتجات في السلة.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProducts.filter(p => p.type === 'cart').map((product, index) => (
              <div key={`cart-${product._id}-${index}`} className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-4 items-center">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="rounded-xl object-cover border border-gray-200"
                    unoptimized
                  />
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                    لا صورة
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#4B116B]">{product.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <p className="text-base font-bold text-purple-900 mt-1">{product.price} ج.م</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handelshoping(product._id)}
                      className="flex items-center justify-center bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
                      title="شراء"
                    >
                      <ShoppingCart size={18} />
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(product._id)}
                      className="flex items-center justify-center bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
                      title="حذف"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 📜 قائمة المحفوظات */}
        <h3 className="text-2xl font-semibold text-[#6B2B7A] mt-12 mb-4">قائمة المحفوظات</h3>
        {allProducts.filter(p => p.type === 'order').length === 0 ? (
          <p className="text-gray-500">لا توجد طلبات محفوظة.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProducts.filter(p => p.type === 'order').map((product, index) => (
              <div key={`order-${product._id}-${index}`} className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-4 items-center">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="rounded-xl object-cover border border-gray-200"
                    unoptimized
                  />
                ) : (
                  <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                    لا صورة
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#4B116B]">{product.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <p className="text-base font-bold text-purple-900 mt-1">{product.price} ج.م</p>
                  <p className="text-sm text-green-600 mt-1">تم شراؤه سابقًا</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
