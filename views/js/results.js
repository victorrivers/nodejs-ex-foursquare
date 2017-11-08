(function() {
	angular.module('result-directives', []);
	
	angular.module('result-directives').directive('venueDetails', function(){
		return {
			restrict: 'E',
			templateUrl: 'venue-details.html',
			controller: function($scope, venuesPhotosService){
				
				var venueDetailsScope = this;
				this.Photos = [];
				
				$scope.$on('selectedItemChanged', function(event, itemId) {
					
					venuesPhotosService.async(itemId).then(function (photos) {
						
						venueDetailsScope.Photos = photos;
						
						if (!photos)
						{
							$scope.showPhotos = false;
						}
						else
						{
							$scope.showPhotos = true;
						}
						
						
					});
				});
				
				this.buildPhotoUrl = function (item) {
					var url = '';
					if (item != null)
					{						
						url = item.prefix + '300x300' + item.suffix;
					}
					return url;
				};
				
			},
			controllerAs: 'venueDetailsCtrl'
		};
	});
	
})();