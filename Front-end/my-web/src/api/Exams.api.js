import AxiosInstance from "./AxiosConfig.api";

export const createExams = async (course_id, examData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await AxiosInstance.post(
      `/api/exams/create-exams/${course_id}`,
      examData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Bài thi đã được tạo:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi tạo bài thi:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createQuestions = (exam_id, data) => {
  console.log("Tạo câu hỏi cho bài thi ID:", exam_id, data);
  try {
    const response = AxiosInstance.post(
      `/api/exams/create-question/${exam_id}`,
      data
    );
    console.log("Câu hỏi đã được tạo:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo câu hỏi -> kiểm tra đường dẫn API:", error);
    throw error;
  }
};


export const getAllExamsByCourse = async (course_id) => {
    try {
      const token = localStorage.getItem("accessToken"); 
      const response = await AxiosInstance.get(`/api/exams/${course_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Exams data: ", response.data);
      return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy đề thi theo môn học", error);
        throw error;
    }
}