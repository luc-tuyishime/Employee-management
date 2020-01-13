export const checkNationalID = (error, res) => {
    if (error.length === 232) {
        return res.status(400).send({
            status: 400,
            message: 'User with that NATIONAL ID already exist'
        });
    }
}


export const checkNumber = (error, res) => {
    if (error.length === 214) {
        return res.status(400).send({
            status: 400,
            message: 'User with that PHONE already exist'
        });
    }
}

export const checkEmail = (error, res) => {
    if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
            status: 400,
            message: 'User with that EMAIL already exist'
        });
    }
}

export const checkNationalIDTwo = (error, res) => {
    if (error.length === 235) {
        return res.status(400).send({
            status: 400,
            message: 'User with that NATIONAL ID already exist'
        });
    }
}

export const checkNumberTwo = (error, res) => {
    if (error.length === 217) {
        return res.status(400).send({
            status: 400,
            message: 'User with that PHONE already exist'
        });
    }
}