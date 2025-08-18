const UserRolerMappingRepository = require("../repositories/UserMapping.repository");
const UserRoleMappingController  = {
    async getAllUserRoleMapping(req, res) {
        try {
            const roleUserMapping = await UserRolerMappingRepository.getAllUserRoleMapping();
            if(roleUserMapping.length > 0) {
                return res.status(200).json(roleUserMapping);
            }
            else
            {
                return res.status(404).json({ message: 'Khong co data' });
            }
        } catch (error) {
            res.status(500).json( {message: 'Lỗi khi lấy danh sách user_role_mapping', error })
        }
    }
}

module.exports = UserRoleMappingController;