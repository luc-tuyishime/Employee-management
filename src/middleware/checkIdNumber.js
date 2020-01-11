export const checkifNumber = (req, res, next) => {
    if (req.body.nationalId.length === 16) {
        next();
    }
    else {
        return res.status(400).send({
            status: 400,
            message: "The national id should have 16 Numbers"
        })
    }
}

export const checkIfNumberValid = (req, res, next) => {
    if (req.body.nationalId.startsWith('1')) {
        next();
    } else {
        return res.status(400).send({
            status: 400,
            message: "The national id should start with 1"
        })
    }
}

// export const checkIfExist = (req, res, next) => {
//     if (req.body.nationalId !== '_bt_check_unique') {
//         next();
//     } else {
//         return res.status(400).send({
//             status: 400,
//             message: "voilaaaaaaaaaaaaaa"
//         })
//     }
// }