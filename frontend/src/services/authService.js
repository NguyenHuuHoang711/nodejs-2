import { handleLogout } from '../utils/axiosClient';

// =====================================================
// FRONTEND PREVIEW ONLY
// Không gọi Backend/API thật.
// =====================================================

let currentUser = null;

// Lấy user đã lưu trong session
const loadUser = () => {
    try {
        const savedUser = sessionStorage.getItem('preview_user');

        if (savedUser) {
            currentUser = JSON.parse(savedUser);
        }
    } catch (error) {
        console.error('[authService] Cannot load preview user:', error);
        currentUser = null;
    }
};

// Khởi tạo user khi app load
loadUser();

const register = async (email, password) => {
    // Preview only
    const mockUser = {
        _id: `preview-${Date.now()}`,
        email,
        role: 'user',
    };

    currentUser = mockUser;

    sessionStorage.setItem(
        'preview_user',
        JSON.stringify(mockUser)
    );

    return {
        success: true,
        data: {
            user: mockUser,
        },
    };
};

const login = async (email, password) => {
    // =================================================
    // MOCK LOGIN
    //
    // admin@test.com  -> admin
    // user@test.com   -> user
    // email khác      -> user
    //
    // Password chỉ phục vụ validation phía frontend.
    // Không gửi password tới backend.
    // =================================================

    const role = email.toLowerCase().includes('admin')
        ? 'admin'
        : 'user';

    const mockUser = {
        _id: role === 'admin'
            ? 'preview-admin'
            : 'preview-user',

        email,

        role,
    };

    currentUser = mockUser;

    sessionStorage.setItem(
        'preview_user',
        JSON.stringify(mockUser)
    );

    console.log('[authService] Preview login:', mockUser);

    return {
        success: true,
        role: mockUser.role,
        user: mockUser,
    };
};

const logout = () => {
    currentUser = null;

    sessionStorage.removeItem('preview_user');

    // Giữ hành vi logout hiện tại
    handleLogout();
};

const getCurrentUser = () => {
    return currentUser;
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;