const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, 'Prasad', {
        expiresIn: "30d",
    })
}

module.exports = generateToken