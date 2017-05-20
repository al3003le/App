(function() {
    'use strict';

	angular.module('app')
		.component('language', {
			templateUrl: 'app/translate/translate.tpl.html',
			controller: 'TranslateController',
			controllerAs: 'translateController'
	});

})();