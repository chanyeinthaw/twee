const bcrypt = require('bcrypt')

exports.hash = (plainTextPwd) => bcrypt.hashSync(plainTextPwd, 10)

exports.compare = (plainTextPwd, hashedPwd) => bcrypt.compareSync(plainTextPwd, hashedPwd)