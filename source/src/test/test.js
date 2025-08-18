const userRolesRepo = require('../repositories/UserRoles.repositories');

(async () => {
    try {
        const roles = await userRolesRepo.getAllUserRoles();
        console.log(roles);
    } catch (error) {
        console.error('Lỗi khi lấy user roles:', error);
    }
})();
