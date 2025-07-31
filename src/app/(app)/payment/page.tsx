"use client";

import Container from "@/app/components/Container";
import FormField from "@/app/components/ui/Formfield";
import SmartNavbar from "@/app/components/ui/Navbar";
import { FieldForm } from "@/app/lib/type";
import { useState } from "react";

export default function Paymen() {
      const [pay, setpay] = useState<Record<string, any>>({});
    
    const fields: FieldForm[] = [
      {
        label: "رقم البطاقة",
        name: "cardNumber",
        type: "text",
        requierd: true,
        placeholder: "1234 5678 9012 3456",
        maxLength: 19,
        inputMode: "numeric",
    
      },
      {
        label: "الاسم على البطاقة",
        name: "cardName",
        type: "text",
        requierd: true,
        placeholder: "محمد علي",
      },
      {
        label: "تاريخ الانتهاء",
        name: "expiry",
        type: "text",
        requierd: true,
        placeholder: "MM/YY",
        maxLength: 5,
      },
      {
        label: "CVV",
        name: "cvv",
        type: "password",
        requierd: true,
        placeholder: "123",
        maxLength: 4,
      },
    ];

    const handelsupmit=async(e: React.FormEvent)=>{
          e.preventDefault();

        try{
            console.log(
                pay
            );
            
        }
        catch(error){
            console.log(error);
            
        }
    }
  return (
    <Container>
        <section className="pb-20 md:pb-20">

        <SmartNavbar/>
        </section>
      <section className="payment p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 text-black border-[1px] border-purple-300 ">
        <h2 className="text-2xl font-semibold text-center ">معلومات الدفع</h2>

        <form className="space-y-4">
            <FormField fields={fields} data={pay} onChange={setpay} />

          {/* Submit Button */}
          <button
            type="submit"
            name="verify"
            onClick={handelsupmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            ادفع الآن
          </button>
        </form>
      </section>
    </Container>
  );
}
