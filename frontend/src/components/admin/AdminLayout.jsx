
import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FolderOpen,
    LogOut,
} from "lucide-react";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            path: "/admin/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            path: "/admin/users",
            label: "Quản lý User",
            icon: <Users size={20} />,
        },
        {
            path: "/admin/files",
            label: "Quản lý File",
            icon: <FolderOpen size={20} />,
        },
    ];

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                minHeight: "100vh",
                backgroundColor: "#ff0000",
            }}
        >
            {/* SIDEBAR */}
            <aside
                style={{
                    width: "256px",
                    minWidth: "256px",
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #111827 0%, #1f2937 100%)",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        height: "64px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #374151",
                    }}
                >
                    <h2 style={{ color: "#60a5fa", fontSize: "20px", fontWeight: "bold" }}>
                        ADMIN PANEL
                    </h2>
                </div>

                <nav style={{ flex: 1, padding: "24px 16px" }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "12px 16px",
                                    marginBottom: "8px",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    color: isActive ? "#ffffff" : "#9ca3af",
                                    backgroundColor: isActive ? "#2563eb" : "transparent",
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: "16px", borderTop: "1px solid #374151" }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            width: "100%",
                            padding: "12px 16px",
                            border: "none",
                            borderRadius: "8px",
                            backgroundColor: "transparent",
                            color: "#d1d5db",
                            cursor: "pointer",
                        }}
                    >
                        <LogOut size={20} />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main
                style={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: "100vh",
                    padding: "24px",
                    boxSizing: "border-box",
                    backgroundColor: "#ff0000",
                }}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

