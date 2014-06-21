var x = 'hell';

$(function() {
  var initSelectionList = function(elem) {
    $(elem).UISelectList({
      selected: 2,
      callback: function() {
        $("#response").html($(this).text());
        x = $(this).text().replace(/\s/g, '');
      }
    });

    // // Setup selected choice:
    // $('#pickup-location li').each(function(idx, ctx) {
    //   if ($(ctx).hasClass('selected')) {
    //     $("#response").html($(ctx).text());
    //   }
    // });
  }
  initSelectionList('#pickup-location .list');
  initSelectionList('#destination .list');
});

angular.module('root', [])
  .controller('app', ['$scope', function($scope){
    $scope.$watch('x', function(n) {
      $scope.pickupLocation = n;
    });

    $scope.pickupLocation = x;
  }]);
