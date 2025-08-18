import AxiosInstance from "./AxiosConfig.api"

export const Login = async (email, password) => {
    try {
        const response = await AxiosInstance.post("/api/login", {
            email, 
            password
        });
        return response.data;
    }
    catch(error) {
        throw error.response?.data?.message || "Đăng nhập thất bại!";
    }
}

export const RegisterUser = async (first_name, last_name, email, password) => {
    try {
        const response = await AxiosInstance.post("/api/login/register", {
          first_name,
          last_name,
          email,
          password,
        });
        return response.data
    }
    catch(error) {
        throw error.response?.data?.message || "Đăng ký thất bại!";
    }
}
export const SendOtpEmail = async (email) => {
    try {
        const response = await AxiosInstance.post("/api/send-otp/", {
            email
        });
        return response.data;
    }
    catch(error) {
        throw error.response?.data?.message || "Gửi OTP thắt bại!";
    }
}

export const VerifyOtpEmailApi = async (email,otp) => {
    try {
        const response = await AxiosInstance.post("/api/verify-otp/", {
            email,
            otp
        });
        return response.data;
    } 
    catch(error) {
        throw error.response?.data?.message || "Gửi OTP thắt bại!";
    }
}

export const ChangePasswords = async (email, password) => {
    try {
        const response = await AxiosInstance.post("/api/change-password/", {
            email,
            password
        });
        return response.data;
    }
    catch(error) {
        throw error.response?.data?.message || "Gửi yêu cầu đổi mật khẩu thất bại";
    }
}