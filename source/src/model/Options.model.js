class OptionsModel {
    constructor(id, question_id, option_text, is_correct, created_at) {
        this.id = id;
        this.question_id = question_id;
        this.option_text = option_text;
        this.is_correct = is_correct;
        this.created_at = created_at;
    }
}
module.exports = OptionsModel;