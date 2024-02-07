const { dataBase } = require("../../../config/config.js");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../../../modules/admin/validator/loginSchema.js");
const { validateRequest } = require("../../../common/validation.js");
// const { successResponseHandler, errorResponseHandler } = require("../../../common/response.handler")

const login = async (req, res) => {
    const { email, password } = validateRequest(req.body, loginSchema);
    // const user = { email, password };

    dataBase.query(
        "SELECT * FROM admin WHERE email = '" +
        email +
        "' AND password = '" +
        password +
        "'", (err, data) => {
            if (err) {

                res.status(500).json({
                    success: false,
                    data: null,
                    error: 'Internal Server Error',
                });

            } else {

                if (data.length !== 0) {


                    // res.status(200).json({
                    //     success: true,
                    //     data: data,
                    //     error: null,
                    // });


                    const user = data[0];
                    res.status(200).json({
                        success: true,
                        data: {
                            email: user.email,
                            name: user.name,
                        },
                        error: null,
                    });




                } else {
                    return res.status(401).send("invaliad credentials!");
                }
            }
        }
    );
};

module.exports = { login };


// module.exports = { login };