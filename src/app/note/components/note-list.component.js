(function() {
    'use strict';

	angular.module('app')
		.component('noteList', {
			templateUrl: 'app/note/components/note-list.tpl.html',
			controller: 'NoteController',
			controllerAs: 'noteController'
	});
	
})();