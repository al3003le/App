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