var crypto = require('crypto');

exports.generateToken = function generateToken(username, date) {
    var token = username + date;
    token = crypto.createHash('sha256').update(token).digest('base64')
    return token
}

exports.hashPwd = function hashPwd(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64')
}

