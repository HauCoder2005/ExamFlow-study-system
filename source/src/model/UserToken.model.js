class UserToken {
    constructor(id, user_id, token, expired_at, created_at) {
        this.id = id;
        this.user_id = user_id;
        this.token = token;
        this.expired_at = expired_at;
        this.created_at = created_at;
    }
}
module.exports = UserToken;