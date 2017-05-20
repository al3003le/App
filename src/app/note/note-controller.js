(function(){
    'use strict';

	angular.module('app')
		.controller('NoteController', ['$scope', '$stateParams', '$translate', 'NoteService', 
			function($scope, $stateParams, $translate, NoteService){

			var that = this;
			$scope.notes = [];
			$scope.selectNote = {};
			$scope.showAdd = false;
			$scope.showEdit = false;
			$scope.loading = false;

			that.getNotes = function(){
				$scope.loading = true;
				NoteService.getNotes()
				.then(
					function(resp){
						$scope.notes = resp.data;
						$scope.loading = false;
					}, 
					function(err){
						console.log(err);
						$scope.loading = false;
				});
			};

			that.getNoteById = function(id){
				$scope.loading = true;
				NoteService.getNoteById(id)
				.then(
					function(resp){
						$scope.selectNote = resp.data;
						$scope.loading = false;
					},
					function(err){
						console.log(err);
						$scope.loading = false;
					});
			};

			that.saveNote = function(note){
				if($scope.showAdd){
					$scope.loading = true;
					NoteService.createNote(note)
					.then(
						function(resp){
							$scope.selectNote = resp.data;
							$scope.loading = false;
						},
						function(err){
							$scope.loading = false;
							console.log(err);
						});
					$scope.showAdd = false;	
				}else if($scope.showEdit){
					$scope.loading = true;
					NoteService.updateNote(note)
					.then(
						function(resp){
							$scope.selectNote = resp.data;
							$scope.loading = false;
						},
						function(err){
							$scope.loading = false;
							console.log(err);
						});

					$scope.showEdit = false;
				}
			};

			that.removeNote = function(id){
				$scope.loading = true;
				NoteService.removeNote(id)
				.then(
					function(resp){
						$scope.selectNote = resp.data;
						$scope.loading = false;
					},
					function(err){
						console.log(err);
						$scope.loading = false;
					});
			};

			that.addNote = function(){
				$scope.showAdd = true;
				$scope.showEdit = false;
				$scope.selectNote = {};
				
			};
			that.editNote = function(node){
				$scope.showEdit = true;
				$scope.showAdd = false;
				$scope.selectNote.id = node.id;
				$scope.selectNote.title = node.title;
			};


			that.$onInit = function(){
				if ($stateParams.id) 	{
					that.getNoteById($stateParams.id);
	            } else {
					that.getNotes();
				};

			};
			
	}]);

})();