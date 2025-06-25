"use client";

import { useState } from "react";
import Container from "@/app/components/Container";
import { Button } from "@/app/components/ui/Button";
import FormField from "@/app/components/ui/Formfield";
import { AddProductState, FieldForm } from "@/app/lib/type";
import { Upload } from "lucide-react";
import InputField from "@/app/components/ui/Input";

export default function AddProductPage() {
  const [data, setData] = useState<AddProductState>({
    name: "",
    description: "",
    stock: 0,
    price: "",
    image: "",
  });

  const fields: FieldForm[] = [
    {
      name: "name",
      label: "عنوان المنتج",
      type: "text",
      placeholder: "مثلاً: ساعة نسائية أنيقة",
    },
    {
      name: "description",
      label: "الوصف",
      type: "text",
      placeholder: "أكتب وصفاً مختصراً للمنتج...",
    },
    {
      name: "stock",
      label: "الكمية في المخزون",
      type: "number",
      placeholder: "مثلاً: 25",
    },
    {
      name: "price",
      label: "السعر",
      type: "number",
      placeholder: "مثلاً: 150.00",
    },
  ];

  const handleChange = (updatedData: Record<string, any>) => {
    setData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("بيانات الإرسال:", data);
  };

  return (
    <Container>
      <div className="min-h-screen bg-gradient-to-br from-[#faf0ff] via-[#fef8f5] to-[#fff] flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md border border-purple-100 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#6B2B7A] mb-2">🚀 إضافة منتج جديد</h2>
            <p className="text-sm text-gray-500">قم بملء التفاصيل التالية لإضافة منتجك إلى المتجر</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* صورة المنتج */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#6B2B7A]">صورة المنتج</label>
              <div className="flex items-center gap-2 bg-white-50 px-4 py-2 rounded-xl border border-purple-200 focus-within:ring-2 focus-within:ring-purple-300">
                <Upload size={18} className="text-purple-500 shrink-0" />
                <InputField
                  onChange={(e) => handleChange({ image: e.target.files?.[0] || "" })}
                  name="image"
                  type="file"
                  className="flex-1 text-sm  focus:outline-none text-purple-800 bg-white"
                />
              </div>
            </div>

            {/* الحقول الديناميكية */}
            <FormField fields={fields} data={data} onChange={handleChange} />

            {/* زر الإرسال */}
            <Button
              type="submit"
              classname="w-full bg-gradient-to-r from-[#6B2B7A] to-[#a14bc0] hover:from-[#5c226a] hover:to-[#9444b2] text-white font-bold py-3 text-lg rounded-xl transition duration-300 shadow-md hover:shadow-lg"
            >
              🎉 إضافة المنتج
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
