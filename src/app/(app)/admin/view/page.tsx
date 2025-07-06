"use client";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "@/app/components/Baseurl";
import Container from "@/app/components/Container";
import { getproduct } from "@/app/lib/type";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ViewTable() {
  const [products, setProducts] = useState<getproduct[]>([]);
  const token = Cookies.get("token_admin");
  const url = `${BaseUrl}traders/products`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.data);
      } catch (error) {
        toast.error("حدث خطأ أثناء جلب المنتجات");
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("هل أنت متأكد من حذف هذا المنتج؟");
    if (!confirmed) return;

    try {
      await axios.delete(`${BaseUrl}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((item) => String(item._id) !== id));
      toast.success("تم حذف المنتج بنجاح");
    } catch (error) {
      toast.error("فشل في حذف المنتج");
      console.log(error);
    }
  };

  return (
 <Container>
  <div className="lg:pr-72 pr-4 pl-4 mt-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
      قائمة المنتجات
    </h1>

    {/* ✅ جدول للشاشات الكبيرة فقط */}
    <div className="hidden lg:block overflow-x-auto rounded-xl shadow-xl border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-center">
        <thead className="bg-gradient-to-r from-purple-200 to-pink-200 text-gray-700 text-sm uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">الصورة</th>
            <th className="px-4 py-3">الاسم</th>
            <th className="px-4 py-3">الفئة</th>
            <th className="px-4 py-3">التاجر</th>
            <th className="px-4 py-3">السعر</th>
            <th className="px-4 py-3">الكمية</th>
            <th className="px-4 py-3">تاريخ الإضافة</th>
            <th className="px-4 py-3">التحكم</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-3">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt="product"
                      width={60}
                      height={60}
                      className="rounded-lg border object-cover mx-auto"
                      unoptimized
                    />
                  ) : (
                    <span className="text-gray-400">لا يوجد</span>
                  )}
                </td>
                <td className="px-4 py-3">{product.title}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/view_traders/${product.traderId}`}
                    className="text-purple-600 hover:underline"
                  >
                    التاجر
                  </Link>
                </td>
                <td className="px-4 py-3">{product.price} ج.م</td>
                <td className="px-4 py-3">{product.stockQuantity}</td>
                <td className="px-4 py-3">
                  {new Date(product.createdAt).toLocaleDateString("ar-EG")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <Link href={`/admin/update/${product._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md">
                        تعديل
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(String(product._id))}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-gray-500 py-6 text-center">
                لا توجد منتجات حالياً.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* ✅ بطاقات للموبايل فقط */}
    <div className="lg:hidden space-y-4 mt-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-2">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt="product"
                  width={60}
                  height={60}
                  className="rounded-md border object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-gray-400">لا يوجد صورة</span>
              )}
              <div>
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            </div>
            <p><span className="font-semibold">السعر:</span> {product.price} ج.م</p>
            <p><span className="font-semibold">الكمية:</span> {product.stockQuantity}</p>
            <p><span className="font-semibold">تاريخ الإضافة:</span> {new Date(product.createdAt).toLocaleDateString("ar-EG")}</p>
            <p>
              <span className="font-semibold">التاجر: </span>
              <Link
                href={`/admin/view_traders/${product.traderId}`}
                className="text-purple-600 hover:underline"
              >
                التاجر
              </Link>
            </p>
            <div className="flex gap-2 justify-end mt-3">
              <Link href={`/admin/update/${product._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md">
                  تعديل
                </button>
              </Link>
              <button
                onClick={() => handleDelete(String(product._id))}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md"
              >
                حذف
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-6">لا توجد منتجات حالياً.</p>
      )}
    </div>
  </div>
</Container>


  );
}
