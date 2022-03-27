var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');
const User = require('./User')

class AuthController {

    /**
     * The
     * @param email
     * @param password
     * @return {Promise<User>} true if successful false if failed.
     */
    onLogin(email, password) {
        return new Promise(((resolve) => {
            const stmt = db.prepare("SELECT * FROM users WHERE email = ?;");
            stmt.get(email, (err, row) => {
                if (!row) {
                    resolve(undefined);
                } else {
                    resolve(new User(row.email, row.password));
                }
            });
        }));
    }
}

module.exports = AuthController;
