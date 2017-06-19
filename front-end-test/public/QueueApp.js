(function () {
    'use strict';

	angular.module('qudini.QueueApp', [])
		.controller('QueueController', QueueController)
		.directive('addCustomer', AddCustomer)
		.directive('customer', Customer);

	QueueController.$inject = ['$scope', '$http'];
	AddCustomer.$inject = ['$http'];
	Customer.$inject = ['$http'];

	/**
	* Bonus points - manipulating the without waiting for the
	* server request
	*/	
	function QueueController($scope, $http) {

		$scope.customers = _getCustomers();
		$scope.customersServed = _getServedCustomers();

		_getCustomers();
		_getServedCustomers();
		$scope.onCustomerAdded = function () {
			_getCustomers();
		};

		$scope.onCustomerRemoved = function () {
			_getCustomers();
			_getServedCustomers();
		};

		$scope.onCustomerServed = function () {
			_getCustomers();
			_getServedCustomers();
		};
		function _getServedCustomers() {
			return $http.get('/api/customers/served').then(function (res) {
				$scope.customersServed = res.data;
			});
		}

		function _getCustomers() {
			return $http.get('/api/customers').then(function (res) {
				$scope.customers = res.data;
			});
		}


	}





	/**
	* The <customer> directive is responsible for:
	* - serving customer
	* - calculating queued time
	* - removing customer from the queue
	*/
	function Customer($http) {
		return {
			restrict: 'E',
			scope: {
				customer: '=',
				onRemoved: '&',
				onServed: '&'
			},
			templateUrl: '/customer/customer.html',
			link: function (scope) {

				// calculate how long the customer has queued for
				scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

				scope.remove = function () {
					if(confirm("Do you really want to remove this record?")){
						$http.delete('/api/customer/remove', { params: {
							id: scope.customer.id 
						} }).then(function (res) {
							scope.onRemoved();
						});
					}
				};

				scope.serve = function(){
					$http.put('/api/customer/serve', {id: scope.customer.id}).then(function (res) {
						alert(res.data);
						scope.onServed();
					});
				}

			}
		};
	}

	function AddCustomer($http) {
		return {
			restrict: 'E',
			scope: {
				onAdded: '&'
			},
			templateUrl: '/add-customer/add-customer.html',
			link: function (scope) {

				scope.products = [
					{ name: 'Grammatical advice' },
					{ name: 'Magnifying glass repair' },
					{ name: 'Cryptography advice' }
				];

				scope.add = function () {

		            var data = {
		                name: scope.name,
		                product: scope.product
						};

					$http.post('/api/customer/add', data)
						.success(function (data, status, headers, config) {
			                alert(data);
			                scope.name="";
			                scope.product="";
			                scope.onAdded();
			            })
			            .error(function (data, status, header, config) {
			                alert("Data: " + data +
			                    "<hr />status: " + status +
			                    "<hr />headers: " + header +
			                    "<hr />config: " + config);
			            });
				};

			}
		}
	}
})();
