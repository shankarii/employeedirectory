require('../models/db')
var mongoose = require('mongoose');
var logger = require('winston');
var employee = require('../models/employee');

var sendJsonResponse = function (res, respObj) {
    res.status(respObj.status);
    res.json(respObj.message);
};


var createResponse = function () {
    var response = {
        status: 200,
        message: ''
    };
    return response;
}

module.exports.getEmployees = function (req, res) {

    var getResponse = createResponse();

    employee.find({}).exec(function (err, data) {
        if (err) {
            logger.log('error',err);
            getResponse.status = 500;
            getResponse.message = err;
        } else {            
            getResponse.status = 200;
            getResponse.message = data;
            logger.info("GET: data fetch successful.");
        }
        //console.log(resp);
        sendJsonResponse(res, getResponse);
    });
};

module.exports.addEmployee = function (req, res) {

    var addResponse = createResponse();

    //console.log("IN POST:", req.body);
    var newEmployee = new employee(req.body);
    var nowTime = Date.now();
    var diffTime = nowTime - newEmployee.date.getTime();
    var age = new Date(diffTime);
    newEmployee.age = Math.abs(age.getUTCFullYear() - 1970);

    //console.log("New Employee: ", newEmployee);

    newEmployee.save(function (err, data) {
        if (err) {
            logger.error(err);
            addResponse.status = 500;
            addResponse.message = err;
        } else {
            //console.log(data);
            addResponse.status = 200;
            addResponse.message = data;
            logger.info("POST: data add successful.");
        }
        sendJsonResponse(res, addResponse);
    });
};

module.exports.updateEmployee = function (req, res) {

    var updateResponse = createResponse();

    console.log("IN POST:", req.body);
    var newEmployee = new employee(req.body);
    var nowTime = Date.now();
    var diffTime = nowTime - newEmployee.date.getTime();
    var age = new Date(diffTime);
    newEmployee.age = Math.abs(age.getUTCFullYear() - 1970);

    console.log("New Employee: ", newEmployee);

    employee.findById(req.body.id, function (err, emp) {
        if (err) {
            logger.error(err);
            updateResponse.status = 500;
            updateResponse.message = err;
        } else {
            console.log(emp);
            emp.name = newEmployee.name;
            emp.email = newEmployee.email;
            emp.department = newEmployee.department;
            emp.gender = newEmployee.gender;
            emp.date = newEmployee.date;
            emp.age = newEmployee.age;

            emp.save(function (err, saved) {
                if (err) {
                    logger.error(err);
                    updateResponse.status = 500;
                    updateResponse.message = err;
                } else {
                    updateResponse.status = 200;
                    updateResponse.message = saved;
                    logger.info("PUT: data update successful.");
                }

            })

        }
        sendJsonResponse(res, updateResponse);
    });
};

module.exports.removeEmployee = function (req, res) {

    var deleteResponse = createResponse();

    //console.log("PARAMS ", req.query.email);
    employee.findOneAndRemove({
        email: req.query.email
    }, function (err, done) {
        if (err) {
            logger.error(err);
            deleteResponse.status = 500;
            deleteResponse.message = err;
        } else {
            deleteResponse.status = 200;
            deleteResponse.message = done;
            logger.info("DELETE: data delete successful.");
        }
        sendJsonResponse(res, deleteResponse);
    })

};