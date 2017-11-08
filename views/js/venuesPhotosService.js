angular.module('FoursquareApp').factory('venuesPhotosService', function($http) {
  var service = {
	async: function(venueId) {
	  
		var baseUrl = 'https://api.foursquare.com/v2/venues/' + venueId + '/photos?'
		var clientId = 'client_id=DO5JJHGXBODWHZUZ2W45T0S35PKJH3MCLC1SKF5U4X3VF4YA';
		var cs = 'client_secret=GF0PDCNGEKSU2GI4ANGBGBKTEUU0G3E3QYPO5YWFXRV33GY5';
		var version = 'v=20151020';
		var limit = 'limit=20';
		var and = '&';
		
		var url = baseUrl + clientId + and + cs + and + version + and + limit;
		
		var promise = $http.get(url).then(function (response) {
		
		var photos = response.data.response.photos.items;
				
		if (photos.length > 0)
		{
			return photos;
		}
		return null;
	  });
	  // Return the promise to the controller
	  return promise;
	}
  };
  return service;
});