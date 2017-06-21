angular.module('employeeApp').controller('ModalInstanceCtrl', function ($uibModalInstance, toastr, employeeService, data) {
    var $ctrl = this;
    $ctrl.level = 'ADD';
    $ctrl.formData = {
        'id':'',
        'name': '',
        'email': '',
        'date': new Date(),
        'gender': '',
        'department': ''
    }

    if(data!=undefined){
        $ctrl.updateData = data;
        $ctrl.formData.id = $ctrl.updateData._id;
        $ctrl.formData.name = $ctrl.updateData.name;
        $ctrl.formData.email =$ctrl.updateData.email;
        $ctrl.formData.date = new Date($ctrl.updateData.date);
        $ctrl.formData.gender = $ctrl.updateData.gender;
        $ctrl.formData.department = $ctrl.updateData.department;
        $ctrl.level = 'UPDATE';
    }
    

    $ctrl.add = function () {
        //console.log($ctrl.formData);
        var checkValue = $ctrl.validationCheck();
        if (checkValue) {
            employeeService.addEmployee($ctrl.formData).then(function (data) {
                //console.log("EMP ADDED: ", data);
                toastr.success('Employee Added');
                $uibModalInstance.close();
            }).catch(function (err) {
                toastr.error('Employee Not Added');
                $uibModalInstance.close();
            })
        } else {
            toastr.warning('Fill all values please.');
        }
    };

    $ctrl.update = function () {
        //console.log($ctrl.formData);
        var checkValue = $ctrl.validationCheck();
        if (checkValue) {                    
            employeeService.updateEmployee($ctrl.formData).then(function (data) {
                //console.log("EMP UPDATED: ", data);
                toastr.success('Employee Updated');
                $uibModalInstance.close();
            }).catch(function (err) {
                toastr.error('Employee Not Updated');
                $uibModalInstance.close();
            })
        } else {
            toastr.warning('Fill all values please.');
        }
    };
    
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $ctrl.validationCheck = function () {
        if ($ctrl.formData.name == '' || $ctrl.formData.email == '' || $ctrl.formData.gender == '' || $ctrl.formData.department == '' || $ctrl.formData.name == undefined || $ctrl.formData.email == undefined || $ctrl.formData.gender == undefined || $ctrl.formData.department == undefined)
            return 0;
        else
            return 1;
    }

    //console.log($ctrl.updateData);
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('employeeApp').component('modalComponent', {
    templateUrl: 'modalContent.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        var $ctrl = this;

        $ctrl.ok = function () {
            $ctrl.close({
                $value: 'ok'
            });
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({
                $value: 'cancel'
            });
        };
    }
});