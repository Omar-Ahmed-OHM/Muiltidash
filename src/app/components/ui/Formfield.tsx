"use client"
import { useEffect, useState } from "react";
import Container from "../Container";
import {ApiResponse, type  FieldForm } from "@/app/lib/type";
import { fetchData } from "@/app/lib/methodes";
import InputField from "./Input";

type Props = {
fields: FieldForm[];
data: Record<string, any>;
onChange: (updatedData: Record<string, any>) => void;
};
export default function FormField({ fields, data, onChange }: Props){
  const [formData, setFormData] = useState(data);
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});
useEffect(()=>{
    fields.forEach(async(field)=>{
        if(field.type==="select"&&field.fetchUrl){
            const res:ApiResponse<any>=await fetchData(field.fetchUrl);
            const optons= res.data;
            setDynamicOptions((prev)=>({...prev,[field.name]:optons}));

        }
    })
},[fields])
const handelchange=(field:string,value:any)=>{
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
}
    return (
      <Container>
      <div dir="rtl" className="space-y-4 text-right text-black font-sans ">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="block mb-1 text-sm">{field.label}</label>

         {field.type === "select" ? (
<div className="bg-purple-100 rounded-xl p-2 flex justify-between items-center text-center overflow-hidden">
  {(field.options || dynamicOptions[field.name] || []).map((opt, idx, arr) => (
    <div
      key={opt}
      className={`flex-1 py-2 cursor-pointer relative transition
        ${formData[field.name] === opt
          ? "bg-purple-600 text-white"
          : "text-purple-800 hover:bg-purple-200"}
        ${idx === 0 ? "rounded-r-lg" : ""}
        ${idx === arr.length - 1 ? "rounded-l-lg" : ""}
        ${idx !== arr.length - 1 ? "border-l border-purple-300" : ""}
      `}
      onClick={() => handelchange(field.name, opt)}
    >
      {opt}
    </div>
  ))}
</div>


) : (
  <InputField
    name={field.name}
    type={field.type}
    value={formData[field.name] || ""}
    onChange={(e) => handelchange(field.name, e.target.value)}
    placeholder={field.placeholder}
    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
  />
)}

          </div>
        ))}
      </div>
    </Container>
    )
}