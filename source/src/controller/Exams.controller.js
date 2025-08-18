const ExamsRepository = require("../repositories/Exams.repository");

const ExamsController = {
    async getAllExams(req, res) {
        try {
            const examsRepository = await ExamsRepository.getAllExams();
            if(examsRepository.length > 0) {
                return res.status(200).json(examsRepository);
            }
            else
            {
                return res.status(404).json({message: 'No Data Exams'});
            }
        } catch (err) {
            res.status(500).json( {message: 'Lỗi khi lấy danh sách exmas', err })
        }
    }
}
module.exports = ExamsController;