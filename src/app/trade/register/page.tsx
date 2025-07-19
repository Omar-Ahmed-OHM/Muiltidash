"use client";
import { useState, Fragment } from "react";
import Container from "@/app/components/Container";
import FormField from "@/app/components/ui/Formfield";
import { ApiResponse, FieldForm, signup_user } from "@/app/lib/type";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SmartNavbar from "@/app/components/ui/Navbar";
import Logo from '../../../../public/asset/images/ويمي تك.jpg'
import { BaseUrl } from "@/app/components/Baseurl";
import toast from 'react-hot-toast';
import axios from "axios";
import { Dialog, Transition } from '@headlessui/react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [agree, setAgree] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields: FieldForm[] = [
    { name: "firstName", label: "الاسم الاول", type: "text", placeholder: "ادخل اسمك الاول" ,requierd:true },
    { name: "lastName", label: "الاسم الاخير", type: "text", placeholder: "ادخل اسمك الاخير",requierd:true },
    { name: "email", label: "البريد الإلكتروني", type: "email", placeholder: "ادخل بريدك الالكتروني",requierd:true },
    { name: "phoneNumber", label: "رقم الهاتف", type: "text", placeholder: "ادخل رقم هاتفك",requierd:true },
    { name: "password", label: "الرقم السري", type: "password", placeholder: "ادخل الرقم السري" ,requierd:true},
    { name: "address", label: "العنوان", type: "text", placeholder: "ادخل العنوان" ,requierd:true},
    { name: "googleMapLink", label: "لينك جوجل ماب", type: "url", placeholder: "ادخل لينك  الموقع" ,requierd:true},
  ];

  const url = `${BaseUrl}traders/signup`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      toast.error("يجب الموافقة على الشروط والأحكام قبل التسجيل");
      return;
    }

    try {
      const res: ApiResponse<signup_user> = await axios.post(url, formData, {
        validateStatus: () => true,
      });

      const status = res.status;

      if (status === 200 || status === 201) {
        toast.success('تم تسجيل الدخول بنجاح 🎉');
        router.push("/trade/login_trade");
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

  const termsText = `
رقم الوثيقة: WIMY-TC-001
تاريخ الإصدار: 2025/05/23
اسم الوثيقة: الشروط والأحكام الخاصة بالبائعين في منصة Wimi Tech

مرحبًا بك في Wimi Tech، شريكك في النجاح!

منصة Wimi Tech هي منصة إلكترونية تهدف إلى تمكين البائعين من عرض وبيع منتجاتهم التقنية بطريقة سهلة وآمنة. يُرجى قراءة هذه الشروط والأحكام بعناية قبل الانضمام كبائع على المنصة. إن تسجيلك في المنصة يُعد موافقة صريحة منك على جميع ما ورد في هذه الوثيقة.

1. الأهلية:
- يجب أن يكون البائع شخصًا طبيعيًا أو اعتباريًا يمتلك سجلًا تجاريًا ساريًا في الدولة التي يعمل بها.
- يجب أن يكون عمر البائع 18 عامًا فأكثر إذا كان شخصًا طبيعيًا.

2. إنشاء الحساب:
- يجب تقديم معلومات صحيحة وكاملة أثناء عملية التسجيل.
- يتحمل البائع مسؤولية الحفاظ على سرية بيانات الدخول الخاصة به.
- يحق لإدارة المنصة رفض أو تعليق أي حساب في حال الاشتباه في نشاط غير قانوني أو مخالف للشروط.

3. المنتجات المسموح بها:
- يُسمح فقط ببيع المنتجات التقنية والإلكترونية مثل (الهواتف، الحواسيب، الإكسسوارات، البرمجيات...إلخ).
- يُمنع بيع أي منتجات محظورة قانونيًا أو لا تتوافق مع سياسات الجودة الخاصة بالمنصة.

4. التزامات البائع:
- الالتزام بتوفير منتجات أصلية وذات جودة عالية.
- توصيل الطلبات في الوقت المحدد دون تأخير.
- تقديم خدمة عملاء ممتازة ومعالجة الشكاوى بجدية.
- تحديث المخزون بشكل دوري لتفادي بيع منتجات غير متوفرة.

5. العمولات والرسوم:
- تفرض Wimi Tech عمولة على كل عملية بيع تتم من خلال المنصة، وتُحدد قيمتها في اتفاقية منفصلة.
- تُخصم العمولة تلقائيًا قبل تحويل أرباح البائع.

6. الدفع والتحويلات:
- تُحول أرباح البائع أسبوعيًا أو شهريًا حسب الاتفاق، إلى الحساب البنكي المسجل.
- يجب أن تكون بيانات الحساب البنكي صحيحة ويعود للبائع أو مؤسسته التجارية.

7. حقوق الملكية الفكرية:
- يضمن البائع أن لديه الحقوق القانونية لبيع المنتجات والعلامات التجارية المعروضة.
- لا تتحمل Wimi Tech مسؤولية أي انتهاك لحقوق الملكية ناتج عن نشاط البائع.

8. المحتوى والبيانات:
- يتحمل البائع مسؤولية المحتوى المعروض (صور، وصف، أسعار).
- تحتفظ Wimi Tech بالحق في تعديل أو حذف أي محتوى مخالف.

9. الإنهاء والتعليق:
- يمكن لأي من الطرفين إنهاء العلاقة بإشعار كتابي.
- يحق لـ Wimi Tech تعليق أو إنهاء حساب البائع في حال خرق الشروط.

10. التعديلات على الشروط:
- تحتفظ Wimi Tech بحق تعديل هذه الشروط في أي وقت، وسيتم إشعار البائعين بالتعديلات عبر البريد الإلكتروني أو إشعار داخل النظام.

11. القانون المعمول به:
- تخضع هذه الاتفاقية لقوانين الدولة التي تأسست بها Wimi Tech.
- تُحل النزاعات من خلال القنوات القانونية أو التحكيم حسب الحالة.

نتطلع لشراكة مثمرة وناجحة معك في Wimi Tech.
  `;

  return (
    <>
      <SmartNavbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center py-10 px-4">
        <Container>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-2xl rounded-3xl p-8 w-full  space-y-6 border border-purple-100 mt-5"
          >
            <div className="flex flex-col items-center space-y-2">
              <Image src={Logo} alt="شعار الموقع" width={60} height={60} className="rounded-full shadow-md" unoptimized />
              <h2 className="text-2xl font-bold bg-text-gradient bg-clip-text text-transparent text-center flex items-center gap-1">
                <Sparkles className="w-5 h-5 text-orange-400 animate-bounce" />
                إنشاء حساب جديد
              </h2>
            </div>

            <FormField fields={fields} data={formData} onChange={setFormData} />

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <label className="text-sm text-gray-600 text-right leading-relaxed">
                أوافق على{" "}
                <span className="text-purple-600 underline cursor-pointer hover:text-orange-500 transition" onClick={() => setIsModalOpen(true)}>
                  الشروط والأحكام
                </span>{" "}
                و{" "}
                <span className="text-purple-600 underline cursor-pointer hover:text-orange-500 transition" onClick={() => setIsModalOpen(true)}>
                  سياسة الخصوصية
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agree}
              className={`w-full font-bold py-2 rounded-lg shadow-lg transition-all duration-300 ${
                agree
                  ? "bg-black  text-white hover:scale-[1.02]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto text-right">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all space-y-4">
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-purple-700">
                    الشروط والأحكام الخاصة بالبائعين في منصة Wimi Tech
                  </Dialog.Title>
                  <div className="max-h-[60vh] overflow-y-auto text-sm leading-loose text-gray-700 whitespace-pre-wrap">
                    {termsText}
                  </div>
                  <div className="mt-4 text-left">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                      onClick={() => setIsModalOpen(false)}
                    >
                      إغلاق
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
