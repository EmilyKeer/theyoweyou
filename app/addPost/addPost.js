'use strict';

angular.module('webApp.addPost', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
		templateUrl: 'addPost/addPost.html',
		controller: 'AddPostCtrl'
	});
}])

.controller('AddPostCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var owingsref = firebase.database().ref().child('Owings');
	$scope.owings = $firebaseArray(owingsref);	

	$scope.createPost = function(){
		var item = $scope.owings.itemTxt;
		var detail = $scope.owings.detailTxt;
		var lord = $scope.owings.lordTxt;
		var borrower = $scope.owings.borrowerTxt;
		var date = $scope.owings.dateTxt;
		$scope.owings.$add({
			amount: detail,//
			borrower: borrower,
			date: date,
			lord: lord
		}).then(function(owingsref){
			console.log(owingsref);
			$scope.success = true;
			window.setTimeout(function() {
				$scope.$apply(function(){
					$scope.success = false;
				});
			}, 2000);
		}, function(error){
			console.log(error);
		});
	};

}]);
