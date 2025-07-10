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
import { LoginRequiredModal } from '@/app/components/ui/Pop-up-login';

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
  const [register, setRegister] = useState<boolean>(false);
  const url = `${BaseUrl}users/shopping`;
  const deleteorder = `${BaseUrl}users/cancelled-order/`;
  const token = Cookies.get("token");

  useEffect(() => {
    const getCart = async () => {
      try {
        if (!token) {
          setRegister(true);
          return;
        }

        const res = await axios.get<{ data: CartAndOrdersResponseshoping }>(url, {
          headers: { Authorization: `Bearer ${token}` },
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
      if (!token) {
        setRegister(true);
        return;
      }

      const res = await axios.post(
        url,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("تم شراء المنتج بنجاح ✅");

      setAllProducts((prev) => {
        const productToMove = prev.find(p => p._id === productId && p.type === 'order');
        if (!productToMove) return prev;

        return [
          ...prev.filter(p => !(p._id === productId && p.type === 'order')),
          { ...productToMove, type: 'cart' },
        ];
      });

    } catch (error: any) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء الشراء ❌");
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      if (!token) {
        setRegister(true);
        return;
      }

      const res = await axios.delete(url, {
        data: { productId },
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("تم حذف المنتج من السلة 🗑️");
      setAllProducts(prev =>
        prev.filter(p => !(p._id === productId && p.type === 'cart'))
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل حذف المنتج ❌");
    }
  };

  const handelcanceleorder = async (productId: string) => {
    try {
      const res = await axios.put(
        `${deleteorder}${productId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("تم إلغاء الطلب بنجاح ❌");

      setAllProducts(prev =>
        prev.filter(p => !(p._id === productId && p.type === 'order'))
      );

    } catch (error: any) {
      toast.error("فشل في إلغاء الطلب ❌");
    }
  };

  const renderProductCard = (product: ProductWithType, index: number) => (
    <div key={`${product.type}-${product._id}-${index}`} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-4 p-4 items-center">
        <div className="w-[80px] sm:w-[100px] h-[80px] sm:h-[100px]">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              width={100}
              height={100}
              className="rounded-lg object-cover border border-gray-200 w-full h-full"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs sm:text-sm">
              لا صورة
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#4B116B]">{product.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{product.description}</p>
            <p className="text-sm sm:text-base font-semibold text-purple-900 mt-1">{product.price} ج.م</p>

            {product.type === 'order' && (
              <span className="inline-block text-[10px] sm:text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1">
                تم شراؤه سابقًا
              </span>
            )}
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {product.type === 'cart' && (
              <button
                onClick={() => handleRemoveFromCart(product._id)}
                className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1.5 rounded-full hover:bg-red-200 text-xs sm:text-sm transition"
              >
                <Trash size={16} /> حذف
              </button>
            )}

            {product.type === 'order' && (
              <>
                <button
                  onClick={() => handelshoping(product._id)}
                  className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1.5 rounded-full hover:bg-purple-700 text-xs sm:text-sm transition"
                >
                  <ShoppingCart size={16} /> إعادة الشراء
                </button>

                <button
                  onClick={() => handelcanceleorder(product._id)}
                  className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 text-xs sm:text-sm transition"
                >
                  <Trash size={16} /> إلغاء الطلب
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4e1ff] via-white to-[#f6f0ff] p-6 mt-12">
      <SmartNavbar />
      <Container>
        <h2 className="text-4xl font-bold text-center text-[#6B2B7A] my-10">🛍️ مشترياتي</h2>

        <section className="mb-16">
          <div className="bg-white rounded-xl shadow p-6 border border-purple-200">
            <h3 className="text-2xl font-semibold text-[#6B2B7A] border-b border-purple-100 pb-2 mb-6">
              🛒 سلة المشتريات
            </h3>

            {allProducts.filter(p => p.type === 'cart').length === 0 ? (
              <p className="text-gray-500">لا توجد منتجات في السلة.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.filter(p => p.type === 'cart').map(renderProductCard)}
              </div>
            )}
          </div>
        </section>

        <div className="w-full my-10 border-t border-dashed border-purple-300" />

        <section className="mb-16">
          <div className="bg-white rounded-xl shadow p-6 border border-purple-200">
            <h3 className="text-2xl font-semibold text-[#6B2B7A] border-b border-purple-100 pb-2 mb-6">
              📜 قائمة المحفوظات
            </h3>

            {allProducts.filter(p => p.type === 'order').length === 0 ? (
              <p className="text-gray-500">لا توجد طلبات محفوظة.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.filter(p => p.type === 'order').map(renderProductCard)}
              </div>
            )}
          </div>
        </section>

        <LoginRequiredModal show={register} />
      </Container>
    </div>
  );
}
