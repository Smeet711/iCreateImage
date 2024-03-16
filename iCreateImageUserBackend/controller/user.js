const userModel = require('../models/user');
const bcrypt = require("bcrypt");

//














//



const userRegistration = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username });
        if (user) return res.status(400).json({ msg: "username is taken" });

        const hasedPassword = await bcrypt.hash(password, 4);
        console.log({ hasedPassword, password });

        const userToSave = await new userModel({
            username,
            email,
            password: hasedPassword
        }).save();

        console.log(userToSave);

        return res.status(200).json({
            msg: "user Created",
            userToSave
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "Internal Server Error"
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const {USERNAME,MRID,PASSWORD,EMAIL,ROLE,HQ,REGION,BUSINESSUNIT,DOJ,SCCODE } = req.body;
        const user = await userModel.findOne({ MRID: MRID });

        if (user) {
            // Check the password (you may want to compare the hashed password)
            const isPasswordValid = PASSWORD === user.PASSWORD
            console.log(PASSWORD , user.PASSWORD);

            if (isPasswordValid) {
                // User exists, increment login count
                user.loginLogs.push({
                    timestamp: new Date(),
                    cnt: user.loginLogs.length + 1
                });

                // Save the updated user document
                await user.save();

                return res.status(200).json({
                    msg: "Login Successful",
                    success: true,
                    user
                });
            } else {
                return res.status(401).json({
                    msg: "Incorrect Password",
                    success: false,
                });
            }
        } else {
            const hashedPassword = await bcrypt.hash(PASSWORD, 4);
            console.log({ hashedPassword, PASSWORD });

            const newUser = new userModel({
                USERNAME:USERNAME,
                MRID: MRID,
                PASSWORD: PASSWORD,
                EMAIL: EMAIL,
                ROLE : ROLE,
                HQ : HQ,
                REGION : REGION,
                BUSINESSUNIT:  BUSINESSUNIT,
                DOJ:DOJ,
                SCCODE:SCCODE

            });

            newUser.loginLogs.push({
                timestamp: new Date(),
                cnt: 1
            });

            await newUser.save();

            return res.status(200).json({
                msg: "Login Successful",
                success: true,
                newUser
            });
        }
    } catch (error) {
        console.error("Internal Server Error:", error);
        const errorMessage = error.message;
        return res.status(500).json({
            msg: "Internal Server Error",
            success: false,
            errorMessage,
        });
    }
}









module.exports = {
    userRegistration,
    userLogin
}