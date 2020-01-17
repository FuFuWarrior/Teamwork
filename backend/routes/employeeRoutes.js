const express = require('express');
const employeeRouter = express.Router();
const auth = require('../middleware/auth')
const employeeCtrl = require('../controllers/employeeCtrl');

employeeRouter.get('/employees', auth.verifyUser, employeeCtrl.getAllEmployee);
employeeRouter.post('/auth/login',  employeeCtrl.login);
//employeeRouter.delete('/employees', auth.verifyUser, employeeCtrl.deleteALLEmployee);
employeeRouter.get('/employees/:user_id', employeeCtrl.getOneEmployee);
//employeeRouter.delete('/employees/:user_id', auth.verifyUser, employeeCtrl.deleteOneEmployee);
//employeeRouter.patch('/employees/:user_id', auth.verifyUser, employeeCtrl.editEmployee);


module.exports = employeeRouter