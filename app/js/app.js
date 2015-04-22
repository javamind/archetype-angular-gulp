(function () {
  'use strict';

  angular.module('angular-and-tests', []);

  angular.module('angular-and-tests').value('humanCollection',
    [{firstname:'Guillaume', lastname:'EHRET'}]);

  angular.module('angular-and-tests').directive('human', function () {
      'use strict';

      return {
        template: '<h2>Hello mister {{selectedHuman.firstname}} {{selectedHuman.lastname}}</h2>',
        restrict: 'E',
        scope: {
          firstname: '@',
          humans :'='
        },
        link: function (scope) {


//          scope.$watchCollection('humanCollection', function(newHuman) {
//            scope.selectedHuman = newHuman;
//          });
          
          console.log(scope.firstname);

          scope.selectedHuman = scope.humans.filter(function(h) {
            console.log(h.firstname === scope.firstname);
            return h.firstname === scope.firstname;
          })[0];

        }
      };
    }
  );

  angular.module('angular-and-tests').controller('humanCtrl', ['$scope', 'humanCollection', function ($scope, humanCollection) {
      'use strict';

      $scope.humanCollection = humanCollection;

      $scope.changeFirstName = function(){
        humanCollection[0].lastname += "1";
        console.log(humanCollection[0]);
      }

    }]
  );
})();