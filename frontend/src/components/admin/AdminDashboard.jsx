
import React, { useEffect, useState } from "react";
import { HardDrive, Users, FileText } from "lucide-react";

const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
        " " +
        sizes[i]
    );
};

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFiles: 0,
        totalStorageUsed: 0,
    });

    const [topUsers, setTopUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = () => {
        const mockStats = {
            totalUsers: 128,
            totalFiles: 1542,
            totalStorageUsed: 5368709120,
        };

        const mockTopUsers = [
            {
                userId: "user001",
                email: "admin@example.com",
                role: "admin",
                usedStorage: 2147483648,
            },
            {
                userId: "user002",
                email: "hiep@example.com",
                role: "user",
                usedStorage: 1073741824,
            },
            {
                userId: "user003",
                email: "student@example.com",
                role: "user",
                usedStorage: 524288000,
            },
            {
                userId: "user004",
                email: "demo@example.com",
                role: "user",
                usedStorage: 104857600,
            },
        ];

        setStats(mockStats);
        setTopUsers(mockTopUsers);
        setLoading(false);
    };

    if (loading) {
        return (
            <div
                className="p-6 min-h-screen"
                style={{ backgroundColor: "#ff0000" }}
            >
                <p className="text-white">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div
            className="p-6 min-h-screen"
            style={{ backgroundColor: "#ff0000" }}
        >
            {/* Tiêu đề */}
            <h1 className="text-2xl font-bold mb-6 text-white">
                Dashboard Hệ Thống
            </h1>

            {/* Thẻ thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Tổng User</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats.totalUsers}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow flex items-center">
                    <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Tổng File</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats.totalFiles.toLocaleString("vi-VN")}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600 mr-4">
                        <HardDrive size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">
                            Dung lượng sử dụng
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {formatBytes(stats.totalStorageUsed)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bảng Top User */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Top User dùng nhiều dung lượng
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Đã dùng</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {topUsers.length > 0 ? (
                                topUsers.map((user) => (
                                    <tr key={user.userId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-700">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${
                                                    user.role === "admin"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {formatBytes(user.usedStorage)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

