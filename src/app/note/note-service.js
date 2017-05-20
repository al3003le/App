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