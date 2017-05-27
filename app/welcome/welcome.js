'use strict';

angular.module('webApp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location){
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var choresref = firebase.database().ref().child('Chores');
	$scope.chores = $firebaseArray(choresref);	
	var owingsref = firebase.database().ref().child('Owings');
	$scope.owings = $firebaseArray(owingsref);	
	var roommatesref = firebase.database().ref().child('Roommates');
	$scope.roommates = $firebaseArray(roommatesref);
	var sharableItemsref = firebase.database().ref().child('SharableItems');
	$scope.sharableItems = $firebaseArray(sharableItemsref);

	$scope.userClicked = {"default": "default"};

	$scope.editPost = function(id){
		var ref = firebase.database().ref().child('Chores/' + id);
		$scope.editPostData = $firebaseObject(ref);
	};

	$scope.updatePost = function(id){
		var ref = firebase.database().ref().child('Chores/' + id);
		ref.update({
			title: $scope.editPostData.title,
			post: $scope.editPostData.post,
			user: $scope.editPostData.user
		}).then(function(ref){
			$scope.$apply(function(){
				$("#editModal").modal('hide');
			});
		}, function(error){
			console.log(error);
		});
	};

	$scope.deleteCnf = function(article){
		$scope.deleteArticle = article;
	};

	$scope.deletePost = function(deleteArticle){
		$scope.articles.$remove(deleteArticle);
		$("#deleteModal").modal('hide');
	};

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

	$scope.userClicked;

	$scope.toDashboard = function() {
		document.getElementById("shadow").style.display="none";
		document.getElementById("roommateDetail").style.display="none";
	}
	$scope.showRoommateDetail = function(name) {
		document.getElementById("shadow").style.display="table";
		document.getElementById("roommateDetail").style.display="table";
		$scope.userClicked = name;
		var roommateNameTexts = document.getElementsByClassName("roommateNameText");
		for (var i = 0; i < roommateNameTexts.length; i ++) {
			roommateNameTexts[i].innerHTML = name;
		}
	}
	$scope.showAddRoommate = function() {
		document.getElementById("shadow").style.display="block";

	}

}])