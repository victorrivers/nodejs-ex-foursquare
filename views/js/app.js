(function () {
    angular.module('FoursquareApp', ['result-directives']);

    angular.module('FoursquareApp').controller('MainController', function ($scope, venuesSearchService) {
        var mainScope = this;
		
        mainScope.items = [];

        mainScope.category = '';
        mainScope.place = 'Los Angeles';
		
		$scope.showPhotos = false;
		
        this.doExplore = function () {

			$scope.showPhotos = false;
			mainScope.selectedIndex = -1;
			
            // Call the async method and then do stuff with what is returned inside our own then function
            venuesSearchService.async(this.category, this.place).then(function (items) {
                mainScope.items = items;
            });
        };

        this.doExplore();

		this.showPhotoPreview = function (venue) {
			return venue.photos.groups.length > 0;
		};
		
        this.buildPhotoUrl = function (venue) {
            var url = '';
            if (venue.photos != null &&
                venue.photos.groups.length > 0 &&
                venue.photos.groups[0].items.length > 0) {
                var item = venue.photos.groups[0].items[0];
                url = item.prefix + '300x300' + item.suffix;
            }
            return url;
        };
		
        this.getCategory = function (venue) {
            var category = '';
            if (venue.categories.length > 0)
                category = venue.categories[0].name;
            return category;
        };

        this.buildIconUrl = function (venue) {
            var url = '';
            if (venue.categories.length > 0) {
                var icon = venue.categories[0].icon;
                url = icon.prefix + '32' + icon.suffix;
            }
            return url;
        };

		this.hideRating = function(rating) {
			
			return typeof rating === 'undefined';
			
		};
		
		this.getRatingColor = function(ratingColor) {
			if (typeof ratingColor === 'undefined')
			{
				return 'transparent';
			}
			else
			{
				return '#' + ratingColor;
			}
						
		};
		
        this.showUrl = function (url) {
            if (!url || 0 === url.length)
                return false;
            return true;
        };

        this.buildWebSiteUrl = function (url) {
            if (!url || 0 === url.length)
                return '';
            return url;
        };
		
		this.setSelectedItem = function(item, index)
		{
			this.selectedIndex = index;
			var itemId = item.venue.id;
			if (itemId != null)
			{				
				$scope.$emit('selectedItemChanged', itemId);				
			}			
		};
    });
})();