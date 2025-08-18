import AxiosInstance from "./AxiosConfig.api";

export const getAllCourses = async () => {
   try {
     const response = await AxiosInstance.get("/api/course/");
     console.log("Courses data: ", response.data);
     return response.data;
   } catch (error) {
     console.error("Lỗi khi lấy môn học", error);
     throw error;
   }
} ;
export const getOneCoursesByIds = async (id) => {
  try {
    const response = await AxiosInstance.get(`/api/course/courses/${id}`);
    console.log('Courses by id: ', response.data);
    console.log("== FULL response ==", response);
    return response.data;
  }catch(error) {
     console.error("Lỗi khi lấy môn học theo Id: ", error);
     throw error;
  }
}