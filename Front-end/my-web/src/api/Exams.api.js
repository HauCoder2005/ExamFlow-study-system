import AxiosInstance from "./AxiosConfig.api";


const authHeaders = () => {
  const token = localStorage.getItem("accessToken");
  console.log("🔑 Token frontend lấy ra:", token);

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

// Tạo bài thi
export const createExams = async (course_id, examData) => {
  try {
    const response = await AxiosInstance.post(
      `/api/exams/create-exams/${course_id}`,
      examData,
      { headers: authHeaders() }
    );

    console.log("✅ Bài thi đã được tạo:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi tạo bài thi:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Tạo câu hỏi
export const createQuestions = async (exam_id, data) => {
  console.log("📌 Tạo câu hỏi cho exam:", exam_id, data);
  try {
    const response = await AxiosInstance.post(
      `/api/exams/create-question/${exam_id}`,
      data,
      { headers: authHeaders() }
    );
    console.log("✅ Câu hỏi đã được tạo:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi tạo câu hỏi:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Lấy tất cả đề thi theo môn học
export const getAllExamsByCourse = async (course_id) => {
  try {
    const response = await AxiosInstance.get(`/api/exams/${course_id}`, {
      headers: authHeaders(),
    });
    console.log("📚 Exams data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy đề thi theo môn học:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Xoá đề thi
export const deleteExamById = async (exam_id) => {
  try {
    const response = await AxiosInstance.delete(
      `/api/exams/delete-exam/${exam_id}`,
      { headers: authHeaders() }
    );
    console.log("🗑️ Xoá đề thi thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi xoá đề thi:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Cập nhật trạng thái đề thi
export const updateStatusExam = async (exam_id, status) => {
  try {
    const response = await AxiosInstance.put(
      `/api/exams/exam-status/${exam_id}`,
      { status },
      { headers: authHeaders() }
    );
    console.log("🔄 Cập nhật trạng thái đề thi:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi cập nhật trạng thái:",
      error.response?.data || error.message
    );
    throw error;
  }
};
