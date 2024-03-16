const express = require('express');
const router = express.Router();

const { handleAdminCreateAccounts, handleAdminLogin, verifyJwtForClient, handleSuperAdminCount, handleSuperAdminCreate, handleCreateContentAdmin, handleReportAdminCreate } = require('../controller/admin');

const { isAuthenticated } = require("../middleware/auth")

router.post('/admin-create-account', handleAdminCreateAccounts)

router.post("/admin-login", handleAdminLogin);


// This is for the client
router.get("/verify-jwt/:token", verifyJwtForClient);

router.post("/create-super-admin", isAuthenticated, handleSuperAdminCount, handleSuperAdminCreate);

router.post("/create-content-admin", isAuthenticated, handleCreateContentAdmin);

router.post("/create-report-admin", isAuthenticated, handleReportAdminCreate);





module.exports = router