"use client";
import Container from "@/app/components/Container";
import { usePathname } from "next/navigation";
export default function Categories(){
    const pathname = usePathname();
    const categoryId = pathname.split("/").pop();

    return (
        <Container>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Categories Page</h1>
                <p className="text-gray-600">This is the categories page content for category {categoryId}.</p>
            </div>
        </Container>
    )
}