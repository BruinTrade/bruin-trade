import jwt from "jsonwebtoken";


let checkLogin = (req, res, next) => {
    if (req.method === 'OPTIONS')
    {
        return next()
    }

    try{
        if (!req.headers.access_control)
        {
            res.status(201).json({error: "no access"})
            return
        }
        const token = req.headers.access_control.split(' ')[1]
        if (!token)
        {
            res.status(201).json({error: "no access"})
            return
        }
        const decoded = jwt.verify(token, "scretekeygeneratedbyajshawn")
        req.user_info = {username: decoded.username}
        next()
    }
    catch(error)
    {
    res.status(201).json({error: "no access"})
       return
    }
}

export default checkLogin