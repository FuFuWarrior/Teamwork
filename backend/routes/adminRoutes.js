const express = require('express');
const adminRouter = express.Router();
const adminCtrl = require('../controllers/adminCtrl')
const auth = require('../middleware/auth');

adminRouter.post('/admin/auth/signup', auth.verifyUser, adminCtrl.createEmployee);
adminRouter.patch('/admin/:user_id', auth.verifyUser, adminCtrl.makeAdmin);
adminRouter.patch('/admin/employees/:user_id', auth.verifyUser, adminCtrl.editEmployee);

module.exports = adminRouter;