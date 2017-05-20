(function() {
	'use strict';

	angular.module('app', ['ui.router', 'pascalprecht.translate']);

	angular.module('app')
		.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', 
			function($stateProvider, $urlRouterProvider, $translateProvider){

		$stateProvider
		  .state('list', {
		    url: '/notes',
		    template: '<note-list></note-list>'
		  })
		  .state('details', {
		    url: '/note/:id',
		    templateUrl: 'app/note/components/note-item.tpl.html',
		    controller: 'NoteController',
			controllerAs: 'noteController'
		  });

		$urlRouterProvider.otherwise('/notes');

		$translateProvider.translations('en', {
			'TITLE': 'Notes',
			'DETAILS': 'Details',
			"BACK_TO_LIST": "Back to list"
		});

		$translateProvider.translations('cz', {
			'TITLE': 'Poznamky',
			'DETAILS': 'Polozky',
			"BACK_TO_LIST": "Zpet do seznamu"
		});

		}]);

})();
(function() {
    'use strict';

	angular.module('app')
		.constant('appConstant',{
			url: 'http://private-9aad-note10.apiary-mock.com/',
			//altUrl: 'http://private-anon-e39726ce5a-note10.apiary-mock.com/'

		}).value('appValue',{
			lang: 'en'
	});	
})();
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
(function() {
    'use strict';

	angular.module('app')
		.service('NoteService', ['$http', 'appConstant', 
			function ($http, appConstant) {

			var that = this;

			that.getNotes = function(){
				return $http.get(appConstant.url + 'notes');
			};

			that.getNoteById = function(id){
				return $http.get(appConstant.url + 'notes/' + id);
			};

			that.createNote = function (note) {
		        var response = $http({
		            method: 'POST',
		            url: appConstant.url + 'notes/',
		            data: JSON.stringify(note),
		            datatype: 'json'
		        });
		        return response;
		    };

		    that.updateNote = function (note) {
		        var response = $http({
		            method: 'PUT',
		            url: appConstant.url + 'notes/' + note.id,
		            data: JSON.stringify(note),
		            datatype: 'json'
		        });
		        return response;
		    };

		    that.removeNote = function(id){
				return $http.delete(appConstant.url + 'notes/' + id);
			};

	}]);

})();
(function() {
    'use strict';

	angular.module('app')
		.component('language', {
			templateUrl: 'app/translate/translate.tpl.html',
			controller: 'TranslateController',
			controllerAs: 'translateController'
	});

})();
(function() {
    'use strict';

	angular.module('app')
		.controller('TranslateController', ['$scope', '$translate', 'appValue',
		function ($scope, $translate, appValue){ 

		$scope.selectedLanguage = appValue.lang;
		
		
		$scope.changeLanguage = function () {
		    $translate.use($scope.selectedLanguage);
		};	

		$scope.changeLanguage();

		}]);
})();
(function() {
    'use strict';

	angular.module('app')
		.component('noteList', {
			templateUrl: 'app/note/components/note-list.tpl.html',
			controller: 'NoteController',
			controllerAs: 'noteController'
	});
	
})();