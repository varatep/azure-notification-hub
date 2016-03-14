
//azure notificationshub connection information
notificationHubPath = "";
connectionString = "";
//sender id for google cloud services
var senderIdGCM = "";
//tag registration (csv string), can be empty but not undefined
var registrationTagsCsv = "";

var app = {

    Initialize: function () {
        //reg for onload event
        document.addEventListener('deviceready', app.onLoad, false);
    },

    onLoad: function () {

        app.log("Initializing...");

        //setup push notifications
        Pushman.Initialize(connectionString, notificationHubPath, senderIdGCM,
                           app.onNotificationRegistered, app.onNotificationUnRegistered,
                           app.onNotificationInline, app.onNotificationBackground, app.onNotificationError);

        //hookup cmd buttons
        //$("#register").click(app.registerForPush);
        //$("#unregister").click(app.unRegisterForPush);

        app.onAppReady();
    },

    registerForPush: function (a,c) {

        app.log("Registering...");
        //register for tags
        Pushman.RegisterForPushNotifications(registrationTagsCsv);

    },
    unRegisterForPush: function (a, c) {

        app.log("UnRegistering...");
        //register for tags
        Pushman.UnRegisterForPushNotifications();

    },


    onAppReady: function () {
        app.log("Ready");
        app.registerForPush();
    },

    onNotificationRegistered: function (msg) {
        app.log("Registered: " + msg.registrationId);
    },

    onNotificationUnRegistered: function () {
        app.log("UnRegistered");
    },

    onNotificationInline: function (data) {
        app.log("Inline Notification: " + data);
    },

    onNotificationBackground: function (data) {
        app.log("Background Notification: " + data);
    },

    onNotificationError: function (error) {
        app.log("Error: " + error);
    },

    log: function(msg) {
        console.log(msg);
    },

};
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    app.onLoad();

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
