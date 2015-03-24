'use strict';
main.service('crudServices', function crudServices($q, $http) {
	var service = {
		'request': function(args) {
			params = args.params || {}
			args = args || {};
			var deferred = $q.defer(),
				url = args.url,
				method = args.method || "GET",
				params = params,
				data = args.data || {},
				transform = args.transform;;
			// Fire the request, as configured.
			$http({
				url: url,
				withCredentials: false,
				method: method.toUpperCase(),
				params: params,
				data: data
			})
			.success(angular.bind(this,function(data, status, headers, config) {
				deferred.resolve(data, status);
			}))
			.error(angular.bind(this,function(data, status, headers, config) {
				console.log("error syncing with: " + url);
				// Set request status
				if(data){
					data.status = status;
				}
				if(status == 0){
					if(data == ""){
						data = {};
						data['status'] = 0;
						data['non_field_errors'] = ["Could not connect. Please try again."];
					}
					// or if the data is null, then there was a timeout.
					if(data == null){
						// Inject a non field error alerting the user
						// that there's been a timeout error.
						data = {};
						data['status'] = 0;
						data['non_field_errors'] = ["Server timed out. Please try again."];
					}
				}
				deferred.reject(data, status, headers, config);
			}));
			return deferred.promise;
		},
		'allDevices':function(){
			return this.request({
				'method': "GET",
				'url': "/devices/"
			});
		},
		'newDevice':function(args){
			return this.request({
				'method': "POST",
				'url': "/devices/",
				'data':args
			});
		},
		'deleteDevice':function(id){
			return this.request({
				'method': "DELETE",
				'url': "/devices/"+id+"/"
			});
		},
		'updateDevice':function(args,id){
			return this.request({
				'method':'PUT',
				'url':"/devices/"+id+"/",
				'data':args
			});
		},
		'searchCriteria':function(args){
			return this.request({
				'method': "GET",
				'params': args,
				'url': "/devices/"
			});
		},
	}
	return service;
});
