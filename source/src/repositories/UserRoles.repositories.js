const config = require('../config/config');

const userRolesRepositories =  {
    async getAllUserRoles() {
       return new Promise((resolve, reject) => {
           config.query(`SELECT * FROM user_roles`,(err, result) => {
               if (err) return reject(err);
               resolve(result.map(role => ({
                   id: role.id,
                   role_name: role.role_name
               })));
           })
       })
    }
}
module.exports = userRolesRepositories;