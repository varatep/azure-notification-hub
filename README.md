# Sample Azure Push Notification App using Azure Notification Hub
Plugins to be added
- https://github.com/mvanhalen/cordova-plugin-azure-notificationhub     (https://github.com/sgrebnov/cordova-plugin-azure-notificationhub)
- https://github.com/phonegap-build/PushPlugin

Platform Quirks

iOS

On iOS the following code must be manually added to AppDelegate.m in order to have plugin to functional correctly.

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *) deviceToken
{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"UIApplicationDidRegisterForRemoteNotifications" object:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"UIApplicationDidFailToRegisterForRemoteNotifications" object:error];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"UIApplicationDidReceiveRemoteNotification" object:userInfo];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"UIApplicationDidRegisterUserNotificationSettings" object:notificationSettings];
}
