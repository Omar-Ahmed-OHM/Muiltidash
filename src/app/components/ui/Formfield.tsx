"use client";

import { useEffect, useState } from "react";
import Container from "../Container";
import { ApiResponse, type FieldForm } from "@/app/lib/type";
import { fetchData } from "@/app/lib/methodes";
import InputField from "./Input";
import { Eye, EyeOff } from "lucide-react";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import axios from "axios";
type Props = {
  fields: FieldForm[];
  data: Record<string, any>;
  onChange: (updatedData: Record<string, any>) => void;
};

export default function FormField({ fields, data, onChange }: Props) {
  const [formData, setFormData] = useState(data);
  const [dynamicOptions, setDynamicOptions] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fields.forEach(async (field) => {
      if (field.type === "select" && field.fetchUrl) {
        const res: ApiResponse<any> = await axios.get(field.fetchUrl);
        const options = res.data;
        setDynamicOptions((prev) => ({ ...prev, [field.name]: options }));
      }
    });
  }, [fields]);

  const handelchange = (field: string, value: any) => {
    
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <Container>
      <div dir="rtl" className="space-y-4 text-right text-black font-sans">
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
            ) : field.type === "password" ? (
            <div className="relative">

  <InputField
    name={field.name}
    type={showPassword[field.name] ? "text" : "password"}
    value={formData[field.name] || ""}
    onChange={(e) => handelchange(field.name, e.target.value)}
    placeholder={field.placeholder}
    className="w-full border rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600 text-right"
  />
  <button
    type="button"
    onClick={() => togglePasswordVisibility(field.name)}
    className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-600 hover:text-purple-600"
  >
    {showPassword[field.name] ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

            ):field.name === "phoneNumber" ? (
  <PhoneInput
    country="sa"
    value={formData[field.name] || ""}
    onChange={(value) => handelchange(field.name, value)}
    enableSearch
    preferredCountries={["eg", "sa", "ae"]}
    inputStyle={{
      width: "100%",
      padding: "12px",
      paddingLeft:'42px',
      borderRadius: "0.75rem",
      border: "1px solid #d1d5db",
      fontSize: "1rem",
      direction: "ltr",
      backgroundColor: "#f3f4f6",
    }}
    containerStyle={{ direction: "ltr", width: "100%" }}
    buttonStyle={{
      border: "none",
      backgroundColor: "#f3f4f6",
      borderRadius: "0.75rem 0 0 0.75rem",
    }}
    
  />
):(
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
  );
}
