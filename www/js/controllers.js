angular.module('starter.controllers', ['restangular'])

.controller('DashCtrl', function($scope,Restangular) {
  var todos = Restangular.all('pooopers');
  todos.one('avances123').get().then(function  (poooper) {
    $scope.poooper = poooper;
  })

})

.controller('ChatsCtrl', function($scope, Restangular) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.my_pooop = null;

  $scope.new_pooop = function () {
    Restangular.all('pooops').post({"start":moment(),"poooper":'avances123'}).then(function  (pooop) {
      $scope.my_pooop = pooop;
    })
  }

  $scope.finish_pooop = function () {
    $scope.my_pooop.end = moment();
    $scope.my_pooop.save();
    $scope.my_pooop = null;
  }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})




.controller('AccountCtrl', function($scope,Restangular,$state,$ionicPopup) {

  var todos = Restangular.all('pooopers');
  todos.one('avances123').get().then(function  (poooper) {
    $scope.poooper = poooper;
  })

  $scope.submit = function  () {
    console.log("submit");
    $scope.poooper.save().then(function  (poooper) {
      $scope.myForm.$dirty = false;
    })
  }



  $scope.reset = function() {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Resetear datos',
     template: 'Estas seguro de querer borrar todo y dejarlo a cero?'
    });

    confirmPopup.then(function(res) {
     if(res) {
        $scope.poooper.post('reset').then(function () {
          $state.go('tab.dash');  
        })
     } else {
       console.log('You are not sure');
     }
   });
 };





});
