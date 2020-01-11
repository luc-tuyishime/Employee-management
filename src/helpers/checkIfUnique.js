export const checkNationalID = (error, res) => {
    if (error.length === 232) {
        return res.status(400).send({
            status: 400,
            message: 'User with that NATIONAL ID already exist'
        });
    }
}