export default (req, res, next) => {
    const getAge = Math.floor((new Date() - new Date(req.body.birth).getTime()) / 3.15576e+10);
    if (getAge >= 18) {
        next();
    }
    else {
        return res.status(403).send({
            status: 403,
            message: "Should not register an employee who is below 18 years."
        })
    }
}