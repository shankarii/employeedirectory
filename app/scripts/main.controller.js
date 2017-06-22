//console.log('\'Allo \'Allo!');
var app = angular.module('employeeApp', ['ngAnimate', 'ui.bootstrap', 'toastr']);

app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        progressBar: false,
        tapToDismiss: true,
        timeOut: 1000
    });
});

app.service('employeeService', function ($http, $q) {

//    var allEmpURL = 'http://localhost:8080/api/employees';
//    var addEmpURL = 'http://localhost:8080/api/employee';

    var allEmpURL = 'https://employeedirectory9.herokuapp.com/api/employees';
    var addEmpURL = 'https://employeedirectory9.herokuapp.com/api/employee';

    var getAllEmployees = function () {
        var deferred = $q.defer();
        $http.get(allEmpURL).then(function (emps) {
            //console.log("EMP LIST: ", emps);
            deferred.resolve(emps.data);
        }).catch(function (err) {
            //console.log("ERR ", err);
            deferred.reject();
        });
        return deferred.promise;
    }

        var addEmployee = function (empdata) {
            var deferred = $q.defer();
            $http.post(addEmpURL, empdata).then(function (emp) {
                //console.log("EMP : ", emp);
                deferred.resolve(emp.data);
            }).catch(function (err) {
                //console.log("ERR ", err);
                deferred.reject();
            });
            return deferred.promise;
        }

    var updateEmployee = function (empdata) {
            var deferred = $q.defer();
            $http.put(addEmpURL, empdata).then(function (emp) {
                //console.log("EMP : ", emp);
                deferred.resolve(emp);
            }).catch(function (err) {
                //console.log("ERR ", err);
                deferred.reject();
            });
            return deferred.promise;
        }

    var removeEmployee = function (emailId) {
        var deferred = $q.defer();
        $http.delete(addEmpURL, {
            params: {
                email: emailId
            }
        }).then(function (emp) {
            //console.log("EMP : ", emp);
            deferred.resolve(emp.data);
        }).catch(function (err) {
            //console.log("ERR ", err);
            deferred.reject();
        });
        return deferred.promise;
    }

    return {
        getAllEmployees: getAllEmployees,
        addEmployee: addEmployee,
        updateEmployee: updateEmployee,
        removeEmployee: removeEmployee
    };
});

app.controller('employeeController', function ($window, $scope, $uibModal, $log, employeeService, toastr) {
    var $ctrl = this;
    var empSvc = employeeService;
    $scope.allEmp = [];

    $scope.modalOpen = function (value) {

        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'modalCtrl',
            size: 'modal-lg',
            resolve: {
                data: function () {
                    return value;
                }
            }
        });

        modalInstance.result.then(function (value) {
            //console.log("VALUE: ",value);
            $scope.reloadList();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
            $scope.reloadList();
        });
    };

    $scope.reloadList = function () {
        empSvc.getAllEmployees().then(function (emplist) {
            $scope.allEmp = emplist;
        }).catch(function (err) {
            //console.log(err);
        });
    }

    $scope.removeEmployee = function (emailId) {
        //console.log("TO DELETE: ", emailId);
        empSvc.removeEmployee(emailId).then(function (info) {
            //console.log(info);
            $scope.reloadList();
            toastr.success('Employee DELETED.');
        }).catch(function (err) {
            //console.log("ERR DEL", err);
        })
    }

    //console.log("In COntroller....");

    var init = function () {
        //console.log("in Init...")
        empSvc.getAllEmployees().then(function (emplist) {
            $scope.allEmp = emplist;
            //console.log("ALL: ", $scope.allEmp);
        }).catch(function (err) {
            //console.log(err);
        });
    }

    init();
});
