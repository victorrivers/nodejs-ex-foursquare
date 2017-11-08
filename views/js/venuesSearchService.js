angular.module('FoursquareApp').factory('venuesSearchService', function($http) {
  var service = {
	async: function(query, near) {
	  
	  var baseUrl = 'https://api.foursquare.com/v2/venues/explore?';
	  var clientId = 'client_id=DO5JJHGXBODWHZUZ2W45T0S35PKJH3MCLC1SKF5U4X3VF4YA';
	  var cs = 'client_secret=GF0PDCNGEKSU2GI4ANGBGBKTEUU0G3E3QYPO5YWFXRV33GY5';
	  var version = 'v=20151020';
	  var venuePhotos = 'venuePhotos=1';
	  var nearPlace = 'near=' + near.replace(" ","+");
	  var category = 'query=' + query;	  
	  var limit = 'limit=10';
	  var and = '&';
	  
	  var url = baseUrl + clientId + and + cs + and + version + and + venuePhotos + and + limit + and + nearPlace + and + category;
	  
	  // $http returns a promise, which has a then function, which also returns a promise
	  var promise = $http.get(url).then(function (response) {
		// The then function here is an opportunity to modify the response
		// The return value gets picked up by the then in the controller.
		
		var groups = response.data.response.groups;
		
		if (groups.length > 0)
		{
			return groups[0].items;
		}
		return null;
	  }, function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		
		return null;
	  });
	  // Return the promise to the controller
	  return promise;
	}
  };
  return service;
});