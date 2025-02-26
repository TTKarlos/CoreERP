const testController = {
    test: (req, res) => {
        try {
            const data = {
                name: "Karlos",
                welcome: "Welcome to the API"
            };
            res.status(200).json({
                success: true,
                data: data
            });
        } catch (error) {
            next(new Error('Error in test route: ' + error.message));
        }
    },

}

module.exports = testController;