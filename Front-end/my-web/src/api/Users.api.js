import  AxiosInstance  from './AxiosConfig.api'

export const getOneUsers = async (id) => {
    try {
        const response = await AxiosInstance.get(`/api/users/${id}`);
        console.log("User data:", response.data);
        return response.data;
    }
    catch(error) {
        console.error("Lỗi khi lấy user theo ID: ", error);
        throw error;
    }
}   

export const editUserById = async (id, userData) => {
    try {
        console.log("Sending data to: ", `/api/users/edit-user/${id}`);
        console.log("UserData: ", userData);

        const response = await AxiosInstance.put(`/api/users/edit-user/${id}`,
          userData ,
           
        );
        console.log("User edited successfully:", response.data);
        return response.data;
    } catch(error) {
        console.error("Lỗi khi chỉnh sửa user:", error);
        throw error;
    }
}

export const getAllStByTeacher = async (id) => {
    try {
        const response = await AxiosInstance.get(`/api/users/teacher/${id}`);
        console.log("All students by teacher:", response.data);
        return response.data;
    } catch(error) {
        console.error("Lỗi khi lấy tất cả sinh viên theo giáo viên:", error);
        throw error;
    }
}