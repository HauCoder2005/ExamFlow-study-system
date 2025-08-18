class ClassesModel {
    constructor(id, class_name, homeroom_teacher_id, created_at, updated_at) {
        this.id = id;
        this.class_name = class_name;
        this.homeroom_teacher_id = homeroom_teacher_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
module.exports = ClassesModel;