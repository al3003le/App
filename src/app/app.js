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