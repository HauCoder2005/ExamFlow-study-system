class QuestionModel  {
    constructor(id, exam_id, question_text, question_type, score, created_at) {
        this.id = id;
        this.exam_id = exam_id;
        this.question_text = question_text;
        this.question_type = question_type;
        this.score = score;
        this.created_at = created_at;
    }
}
module.exports = QuestionModel;