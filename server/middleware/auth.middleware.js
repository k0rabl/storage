import jwt from 'jsonwebtoken'
import config from 'config'

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token)
            res.status(401).json({ message: 'Auth error! Haven`t token.' })

        const decoded = jwt.verify(token, config.get('privateKey'))
        req.user = decoded

        next()
    } catch (e) {
        console.log('Auth middleware errror: ', e)
        res.status(401).json({ message: 'Auth error! Something else....' })
    }
}
