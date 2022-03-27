var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');
const User = require('./User')
const bcrypt = require('bcrypt');

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
                    bcrypt.compare(password, row.password, function(err, result) {
                        if (result) {
                            //Correct password
                            resolve(new User(row.email, row.password));
                        } else {
                            //Incorrect password
                            resolve(undefined);
                        }
                    });
                }
            });
        }));
    }
}

module.exports = AuthController;
