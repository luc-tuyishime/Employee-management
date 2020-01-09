export default (req, res, next) => {
    if (req.body.phone.includes(+250)) {
        next();
    } else {
        return res.status(400).send({
            status: 400,
            message: "Please the phone number should start with +250"
        })
    }
}