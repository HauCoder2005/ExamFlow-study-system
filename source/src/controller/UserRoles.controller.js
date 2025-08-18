const userRolesRepository = require('../repositories/UserRoles.repositories');

const userRolesController = {
    async getAllRoles(req, res) {
        try {
            const roles = await userRolesRepository.getAllUserRoles();
            if (roles.length > 0) {
                res.status(200).json(roles);
            }
            else {
                res.status(404).json({ message: 'Khong co data' });
            }
        } catch (error) {
            res.status(500).json( {message: 'Lỗi khi lấy danh sách role', error })
        }
    }
}

module.exports = userRolesController;