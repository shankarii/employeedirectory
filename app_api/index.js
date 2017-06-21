var express = require('express');
var router = express.Router();
var ctrlEmployee = require('./controllers/employeeData');

router.get('/employees', ctrlEmployee.getEmployees);
router.post('/employee', ctrlEmployee.addEmployee);
router.put('/employee', ctrlEmployee.updateEmployee);
router.delete('/employee', ctrlEmployee.removeEmployee);

module.exports = router;