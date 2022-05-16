const index = (_req, res, next) => {
    try {
        res.send({ status: 'Active' });
    } catch (error) {
        next(error);
    }
};

module.exports = { index };
