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
		document.getElementById('ModalEdit').style.display = "block";


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

	$scope.editYouOwe = function(id){
		document.getElementById("EditYouOwe").style.display = "block";
		

		var ref = firebase.database().ref().child('Owing/' + id);
		$scope.editOwingData = $firebaseObject(ref);
	};

	$scope.updateYouOwe = function(id){
		var ref = firebase.database().ref().child('Owing/' + id);
		ref.update({
			$id: $scope.editPostData.$id,
			amount: $scope.editPostData.amount,
			borrower: $scope.editPostData.borrower
		}).then(function(ref){
			document.getElementById("EditYouOwe").style.display = "none";
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


	//Derek
	$scope.logout = function(){
		CommonProp.logoutUser();
	}

	//$scope.userClicked;

	$scope.toDashboard = function() {
		document.getElementById("shadow").style.display="none";
		document.getElementById("roommateDetail").style.display="none";
	}
	$scope.showRoommateDetail = function(name) {
		document.getElementById("shadow").style.display="block";
		document.getElementById("roommateDetail").style.display="block";
		$scope.userClicked = name;
		var roommateNameTexts = document.getElementsByClassName("roommateNameText");
		for (var i = 0; i < roommateNameTexts.length; i ++) {
			roommateNameTexts[i].innerHTML = name;
		}
	}
	$scope.showAddRoommate = function() {
		document.getElementById("shadow").style.display="block";

		}



		/*

	//Edit
// Get the modal
	var modalEdit = document.getElementById('ModalEdit');

	// Get the button that opens the modal
	var btnEdit = document.getElementById("BtnEdit");

	// Get the <span> element that closes the modal
	var spanEdit = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	btnEdit.onclick = function() {
	    modalEdit.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	spanEdit.onclick = function() {
	    modalEdit.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modalEdit) {
	        modalEdit.style.display = "none";
	    }
	} 


	//Delete
		// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[1];

	// When the user clicks on the button, open the modal
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	} 
*/
	//list popup


		// Get the modal
	

	// Get the button that opens the modal
	

	// Get the <span> element that closes the modal
	
/*
	// When the user clicks on the button, open the modal
	btnOwe.onclick = function() {
	    modalOwe.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	spanOwe.onclick = function() {
	    modalOwe.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modalOwe) {
	        modalOwe.style.display = "none";
	    }
	} 	

*/

}])
function openOwingDetails(owing) {
		document.getElementById("oweDetail").style.display = "block";
	}
function closeOwing(owing) {
		document.getElementById("oweDetail").style.display = "none";
	}