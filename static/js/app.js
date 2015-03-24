'use strict';

var main = angular.module('crud', ['ui.bootstrap']);

main.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{$');
	$interpolateProvider.endSymbol('$}');
});


main.controller('mainCtrl', function ($scope,crudServices){
	$scope.listView = false;
	$scope.isCollapsed = true;

	// Get all devices
	function getAllDevices(){
		crudServices.allDevices()
		.then(function(data){
			$scope.listView = true;
			$scope.devices = data;
		},function(data){
			console.log("error",data);
		});
	}
	getAllDevices();

	// New Device
	$scope.newDevice = function(){
		$scope.listView = false;
		$scope.editing = true;
		$scope.model = {'device_name':'','range':''};
		$scope.new = function(formData){
			$scope.submitted = true;
			if(!formData.$invalid){
				crudServices.newDevice($scope.model)
				.then(function(data){
					$scope.model = {'device_name':'','range':''};
					formData.$setPristine(true);
					$scope.submitted = false;
					getAllDevices();
				},function(data){
					console.log("error",data);
				})
			}
		}
	}

	// Edit
	$scope.edit = function(id){
		$scope.editing = false;
		for(var i=0;i<$scope.devices.length;i++){
			if($scope.devices[i].id==id){
				$scope.deviceEdit = $scope.devices[i];
			}
		}
		$scope.listView = false;
		$scope.model = {'device_name':$scope.deviceEdit.device_name,'range':$scope.deviceEdit.range};
		$scope.update = function(formData){
			$scope.submitted = true;
			if(!formData.$invalid){
				crudServices.updateDevice($scope.model,id)
				.then(function(data){
					$scope.model = {'device_name':'','range':''};
					formData.$setPristine(true);
					$scope.submitted = false;
					getAllDevices();
				});
			}
		}
	}

	// Delete
	$scope.deviceDelete = function(id){
		crudServices.deleteDevice(id)
		.then(function(data){
			getAllDevices();
		});
	}

	// Cancel
	$scope.cancel = function(formData){
		$scope.listView = true;
		$scope.model = {'device_name':'','range':''};
		formData.$setPristine(true);
	}

	// Search Criteria
	$scope.isDropdown = false;
	$scope.search = function(formData){
		crudServices.searchCriteria($scope.model)
		.then(function(data){
			$scope.devices = data;
			// console.log(data);
		});
	}

});