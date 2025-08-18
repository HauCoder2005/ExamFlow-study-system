class TeachingAssignmentsModel {
    constructor(id, teacher_id, class_id, subject_id, created_at, updated_at) {
        this.id = id;
        this.teacher_id = teacher_id;
        this.class_id = class_id;
        this.subject_id = subject_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
module.exports = TeachingAssignmentsModel;