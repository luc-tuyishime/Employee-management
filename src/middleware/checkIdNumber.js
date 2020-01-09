export default (req, res, next) => {
    if (req.body.nationalId.length === 16) {
        next();
    } else {
        return res.status(400).send({
            status: 400,
            message: "The national id should have 16 Numbers"
        })
    }
}