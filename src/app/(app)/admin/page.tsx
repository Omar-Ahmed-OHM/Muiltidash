"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import { OrderItem } from "@/app/lib/type";
import toast from "react-hot-toast";
import { BaseUrl } from "@/app/components/Baseurl";
import axios from "axios";
import Cookies from "js-cookie";
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
} from "recharts";
import Link from "next/link";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

export default function Admin() {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const token = Cookies.get("token_admin");

    const getOrdersUrl = `${BaseUrl}reports/orders`;

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(getOrdersUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 200) {
                    setOrders(res.data.data);
                    toast.success("تم تحميل الطلبات بنجاح");
                }
            } catch (err) {
                toast.error("حدث خطأ أثناء تحميل الطلبات");
                console.error(err);
            }
        };

        getOrders();
    }, []);

    const countByStatus = orders.reduce((acc: Record<string, number>, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {});

    const statusData = Object.entries(countByStatus).map(([status, count]) => ({
        name: status,
        value: count,
    }));

    const totalOrders = orders.length;
    const totalPrice = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    return (
        <Container>
            <div className="space-y-6">

                {/* Dashboard Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DashboardCard title="إجمالي الطلبات" value={totalOrders} color="bg-indigo-500" />
                    <DashboardCard title="قيد التنفيذ" value={countByStatus["Pending"] || 0} color="bg-yellow-500" />
                    <DashboardCard title="مكتمل" value={countByStatus["Completed"] || 0} color="bg-green-500" />
                    <DashboardCard title="إجمالي المبلغ" value={`${totalPrice} ج.م`} color="bg-blue-500" />
                </div>

                {/* Pie Chart */}
                <div className="bg-white shadow rounded-2xl p-4 w-full max-w-xl mx-auto">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">حالات الطلبات</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label
                            >
                                {statusData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Card View */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {orders.map((order) => (
                        <Link href={`/admin/update/${order.productId}`}
                            className="bg-white p-4 rounded-2xl shadow-lg flex flex-col gap-2"
                            key={order._id}

                        >

                            <div
                                className="bg-white p-4 rounded-2xl shadow flex flex-col gap-2"
                            >
                                <h3 className="text-sm font-semibold text-gray-800">طلب رقم: {order._id.slice(-6)}</h3>
                                <p className="text-sm text-gray-500">الحالة: <span className="font-bold">{order.status}</span></p>
                                <p className="text-sm text-gray-500">الدفع: {order.paymentState}</p>
                                <p className="text-sm text-gray-500">الكمية: {order.quantity}</p>
                                <p className="text-sm text-gray-500">المبلغ: {order.totalPrice} ج.م</p>
                                <p className="text-xs text-gray-400 mt-1">تاريخ: {new Date(order.orderDate).toLocaleDateString("ar-EG")}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Container>
    );
}

function DashboardCard({ title, value, color }: { title: string; value: number | string; color: string }) {
    return (
        <div className={`p-4 rounded-2xl text-white shadow ${color}`}>
            <h4 className="text-sm font-medium">{title}</h4>
            <div className="text-2xl font-bold mt-2">{value}</div>
        </div>
    );
}
