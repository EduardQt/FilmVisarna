var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

class Giftcard {
    createGiftCard(fromName, toName, code) {
        return new Promise(((resolve) => {
            const stmt = db.prepare("insert into giftcard (nameFrom, nameTo, code) VALUES(?, ?, ?);");
            stmt.get(fromName, toName, code, (err, row) => {
                resolve(true);
            });
        }));
    }

    readGiftCard(cardCode) {
        return new Promise(((resolve) => {
            const stmt = db.prepare("SELECT * FROM giftcard WHERE code = ?;");
            stmt.get(cardCode, (err, row) => {
                if (!row) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        }));
    }
}
module.exports = Giftcard;