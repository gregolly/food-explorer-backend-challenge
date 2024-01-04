module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || 'default',
        experiesIn: '1d',
    }
}