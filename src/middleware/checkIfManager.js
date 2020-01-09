export default (req, res, next) => {
    const id = req.user ? req.user.id : 0;

    if (!id && req.body.position !== manager) {
        return res.status(403).json({
            message: 'Permission denied, you are not allowed to perform this action'
        });
    }
    return next();
}