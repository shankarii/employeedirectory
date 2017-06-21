var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    date: Date,
    department: String,
    gender: String,
    age: Number

});

module.exports = mongoose.model('employee', employeeSchema, 'employee');