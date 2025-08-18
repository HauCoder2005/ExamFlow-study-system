class CoursesModel {
    constructor(id, name, description, img ,teacher_id, createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.img = img;
        this.teacher_id = teacher_id;
        this.createdAt = createdAt;
    }
}
module.exports = CoursesModel;