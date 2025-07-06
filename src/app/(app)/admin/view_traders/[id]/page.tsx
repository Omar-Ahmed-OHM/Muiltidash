"use client";

import { BaseUrl } from "@/app/components/Baseurl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiResponse, Trader } from "@/app/lib/type";
import Cookies from "js-cookie";
import axios from "axios";
import Container from "@/app/components/Container";
import { UserCircle } from "lucide-react"; // أيقونة بروفايل

export default function Traders() {
  const pathname = usePathname();
  const productid = pathname.split("/").pop();
  const token = Cookies.get("token_admin");
  const [trader, setTrader] = useState<Trader>();

  const url = `${BaseUrl}traders`;

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrader(res.data.data.trader);
        console.log(
            `Traders: ${JSON.stringify(res.data, null, 2)}`
        );
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchTraders();
  }, []);

  return (
 <Container>
  <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-pink-50">
    {trader ? (
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-purple-100 text-gray-800">
        <div className="flex flex-col items-center">
          <UserCircle className="w-20 h-20 text-purple-500 mb-4" />
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
            بيانات التاجر
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base">
          <p>
            <span className="font-semibold text-purple-700">الاسم:</span>{" "}
            {trader.firstName} {trader.lastName}
          </p>
          <p>
            <span className="font-semibold text-purple-700">البريد الإلكتروني:</span>{" "}
            {trader.email}
          </p>
          <p>
            <span className="font-semibold text-purple-700">رقم الهاتف:</span>{" "}
            {trader.phoneNumber}
          </p>
          <p>
            <span className="font-semibold text-purple-700">تاريخ التسجيل:</span>{" "}
            {trader.createdAt
              ? new Date(trader.createdAt).toLocaleDateString("ar-EG")
              : "غير متوفر"}
          </p>
          <p>
            <span className="font-semibold text-purple-700">معرّف التاجر:</span>{" "}
            {trader._id}
          </p>
        </div>
      </div>
    ) : (
      <p className="text-center mt-10 text-gray-500 text-lg">
        جاري تحميل بيانات التاجر...
      </p>
    )}
  </div>
</Container>

  );
}
