class Users {
    constructor(id,
                password,
                first_name,
                last_name,
                email,
                profile_image,
                created_at,
                updated_at,
                place_of_birth,
                major,
                graduation_year,
                date_of_birth) {  // Bỏ role_id khỏi đây vì bạn dùng riêng class RoleMapping
        this.id = id;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.profile_image = profile_image;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.place_of_birth = place_of_birth;
        this.major = major;
        this.graduation_year = graduation_year;
        this.date_of_birth = date_of_birth;
        // Thuộc tính roleMapping để lưu instance của UserRoleMapping, tạo sau
        this.roleMapping = null;
    }
}

module.exports = Users;
