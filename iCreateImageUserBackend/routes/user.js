const express = require("express");
const router = express.Router();



const { userRegistration, userLogin } = require("../controller/user");


// router.post("/create-account", userRegistration);
router.post("/login", userLogin);




module.exports = router


