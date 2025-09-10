import AxiosInstance from "./AxiosConfig.api";
// Hàm tiện ích để lấy headers kèm token
const authHeaders = () => {
  const token = localStorage.getItem("accessToken");
  console.log("🔑 Token frontend lấy ra:", token);

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const createQuestions = (exam_id, data) => {
    try {
        console.log("ID cuả bài thi: ", exam_id)
        const response = AxiosInstance.post(
          `/api/exams/create-question/${exam_id}}`,
          data,
          { headers: authHeaders() }
        );
        console.log("Câu hỏi đã được tạo:", response.data);
        return response.data;
    } 
    catch (error) {
        console.error("Lỗi khi tạo câu hỏi -> kiểm tra đường dẫn API:", error);
    }
} ;

export const getAllQuestionsByExam = async (exam_id) => {
    try{
        console.log("Id của bài thi đã lấy từ URL:", exam_id)
        const response = await AxiosInstance.get(
          `/api/exams/question/${exam_id}`,
          { headers: authHeaders() }
        );
        if(response) {
            console.log("Tất cả câu hỏi theo đề thi:", response.data);
            return response.data;
        }
        else {
            console.log("Chưa có câu hỏi nào trong đề thi này.");
        }
    }
    catch(error) {
        console.error("Lỗi khi lấy tất cả câu hỏi theo đề thi:", error);
    }
};

// export const getAllOptionByQuestion = async (question_id) => {
//     try {
//         console.log("Id của câu hỏi đã lấy từ URL:", question_id);
//         const response = await AxiosInstance.get('/api/exmas/')
//     }
//     catch(error) {
//         console.error("Lỗi khi lấy tất cả option theo câu hỏi:", error);
//     }
// }


export const createOptionByQuestion = async (question_id, optionData) => {
    try {
        console.log("ID của câu hỏi: ", question_id);
        console.log("Dữ liệu option: ", optionData);
        const response = await AxiosInstance.post(
          `/api/exams/create-option/${question_id}`,
          { headers: authHeaders() },
            optionData
        );
        if(response) {
            console.log("Option đã được tạo:", response.data);
            return response.data;
        }
        else {
            console.log("Chưa có option nào được tạo cho câu hỏi này.");
        }
    } 
    catch(error) {
        console.error("Lỗi khi tạo option cho câu hỏi:", error);
    }
}