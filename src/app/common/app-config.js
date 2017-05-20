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