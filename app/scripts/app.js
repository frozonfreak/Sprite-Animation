'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sonoportTest', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('MainCtrl', function ($scope, $interval) {
    $scope.sound = new Howl({
      urls: ['audio/audio.wav'],
      loop: true,
      volume: 1,
      sprite: {
          noise: [0, 500],
          music: [500, 10000]
        }
    });

    $scope.spritePosition = 0;
    $scope.counter = 0;

    //Start Sprite Animation and Audio
    $scope.startAnimation = function(){
      $scope.sound.play('music');
      $scope.spriteAnimation = $interval($scope.animateSprite, 100);
    };

    //Stop Animation and audio
    $scope.stopAnimation = function(){
      $scope.sound.stop();
      $interval.cancel($scope.spriteAnimation);
    };

    //Sprite Animation
    $scope.animateSprite = function(){
      if($scope.counter === 7){
        $scope.counter = 0;
      }
      //Compute sprite position
      $scope.spritePosition = -$scope.counter * 279.42;

      //Update element on screen
      //ngStyle not regreshing screen. Temp patch needs jquery
      angular.element('.spriteWindow').css('background-position-x', $scope.spritePosition);

      $scope.counter++;
    };
    
  });
