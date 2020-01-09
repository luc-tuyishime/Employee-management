export default (req, res, next) => {
    if (req.user.position === 'manager') {
        next();
    }
    else {
        return res.status(403).send({
            status: 403,
            message: "You are not a Manager to perform this action"
        })
    }
}