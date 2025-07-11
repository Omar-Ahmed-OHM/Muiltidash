"use client";
import { useState } from "react";
import Container from "@/app/components/Container";
import FormField from "@/app/components/ui/Formfield";
import { ApiResponse, FieldForm, signup_user } from "@/app/lib/type";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SmartNavbar from "@/app/components/ui/Navbar";
import Logo from '../../../../public/asset/images/ويمي تك.jpg'
import { Postresponse } from "@/app/lib/methodes";
import { BaseUrl } from "@/app/components/Baseurl";
import toast from 'react-hot-toast';
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const fields: FieldForm[] = [
    { name: "firstName", label: "الاسم الاول", type: "text", placeholder: "ادخل اسمك الاول" },
    { name: "lastName", label: "الاسم الاخير", type: "text", placeholder: "ادخل اسمك الاخير" },
    { name: "email", label: "البريد الإلكتروني", type: "email", placeholder: "ادخل بريدك الالكتروني" },
    { name: "phoneNumber", label: "رقم الهاتف", type: "text", placeholder: "ادخل رقم هاتفك" },
    { name: "password", label: "الرقم السري", type: "password", placeholder: "ادخل الرقم السري" },
  ];

  const [formData, setFormData] = useState<Record<string, any>>({});
const url = `${BaseUrl}traders/signup`
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log(formData);
  try {
    const res: ApiResponse<signup_user> = await axios.post(url, formData,
      {
        validateStatus: () => true,
      }
    );
    console.log('Data:', typeof(res.data));

    const status = res.status;

    if (status === 200 || status === 201) {
        toast.success('تم تسجيل الدخول بنجاح 🎉');
        router.push("/login-trader");
    } else if (status === 400) {
      toast.error('البيانات غير صحيحة، تحقق من الإدخال');

    } else if (status === 401) {
      toast.error('غير مصرح، تحقق من البريد أو كلمة المرور');

    } else if (status === 409) {
      toast.error('المستخدم موجود بالفعل');

    } else if (status === 500) {
      toast.error('خطأ في السيرفر، حاول لاحقًا');

    } else {
      toast.error(`خطأ غير معروف: ${status}`);
    }

  } catch (error: any) {
    console.log(error);
    toast.error('حدث خطأ في عملية التسجيل');
  }
};

  return (
    <>
      <SmartNavbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center py-10 px-4 ">
        <Container>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6 border border-purple-100 mt-5"
          >
            {/* شعار */}
            <div className="flex flex-col items-center space-y-2">
              <Image
                src={Logo}
                alt="شعار الموقع"
                width={60}
                height={60}
                className="rounded-full shadow-md"
              unoptimized
              />
              <h2 className="text-2xl font-bold text-purple-800 text-center flex items-center gap-1">
                <Sparkles className="w-5 h-5 text-orange-400 animate-bounce" />
                إنشاء حساب جديد
              </h2>
            </div>

            <FormField fields={fields} data={formData} onChange={setFormData} />

            <p className="text-xs text-gray-600 text-right leading-relaxed">
              بالضغط على الزر، فأنت توافق على{" "}
              <span className="text-purple-600 underline cursor-pointer hover:text-orange-500 transition">
                شروط الاستخدام
              </span>{" "}
              و{" "}
              <span className="text-purple-600 underline cursor-pointer hover:text-orange-500 transition">
                سياسة الخصوصية
              </span>.
            </p>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-700 to-orange-400 text-white font-bold py-2 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              إنشاء حساب جديد
            </button>

            <p className="text-center text-sm text-gray-700">
              لديك حساب بالفعل؟{" "}
              <Link href="/trade/login_trade">
                <span className="text-purple-700 font-semibold underline cursor-pointer hover:text-orange-500 transition">
                  تسجيل الدخول
                </span>
              </Link>
            </p>
          </form>
        </Container>
      </div>
    </>
  );
}
