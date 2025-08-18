class ExamsModel {
    constructor(
        id,
        title,
        course_id,
        teacher_id,
        type,
        time_limit,
        total_score,
        created_at
    )
    {
        this.id = id;
        this.title = title;
        this.course_id = course_id;
        this.teacher_id = teacher_id;
        this.type = type;
        this.time_limit = time_limit;
        this.total_score = total_score;
        this.created_at = created_at;
    }

}
module.exports = ExamsModel;