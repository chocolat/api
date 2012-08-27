#import "Controller+API.h"
#import "CHDocumentController.h"
#import "NoddyBridge.h"
#import "NoddyThread.h"
#import "NoddyStorage.h"

@implementation NoddyController (API)

- (void)documentOpenPath:(NSString*)path parent:(id)parent callback:(NoddyFunction*)callback mixin:(NoddyMixin*)mixin {
    if (callback)
        callback.mixin = mixin;
    
    id doc = nil;
    if ([path length]) {
        doc = [[CHDocumentController sharedDocumentController] openDocumentWithContentsOfURL:[NSURL fileURLWithPath:path isDirectory:NO] display:YES error:NULL];
    }
    else {
        doc = [[CHDocumentController sharedDocumentController] newUntitledWindowDocument:nil];
    }
    
    // TODO: Do something with `parent`
    
    NoddyScheduleBlock(^{
        [callback call:nil arguments:[NSArray arrayWithObject:doc ?: [NSNull null]]];
    });
}

- (NoddyStorage*)js_persistentStorage {
    static NoddyStorage* store;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        store = [[NoddyStorage alloc] init];
        [store setPersistent:YES];
    });
    return store;
}
- (NoddyStorage*)js_transientStorage {
    static NoddyStorage* store;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        store = [[NoddyStorage alloc] init];
    });
    return store;
}

- (void)js_userNotification:(NSDictionary*)options {
    Class cNSUserNotificationCenter = NSClassFromString(@"NSUserNotificationCenter");
    Class cNSUserNotification = NSClassFromString(@"NSUserNotification");
    
    if (!cNSUserNotification || !cNSUserNotificationCenter)
        return;
    
    if (![[options objectForKey:@"title"] isKindOfClass:[NSString class]] || ![[options objectForKey:@"title"] length])
        return;
    
    id notif = [[cNSUserNotification alloc] init];
    if (!notif)
        return;
        
    NoddyFunction* callback = [options objectForKey:@"callback"];
    if (callback && [callback isKindOfClass:[NoddyFunction class]]) {
        NSString* uuid = [NSString stringWithFormat:@"notifcallback%x%x%x", arc4random(), arc4random(), arc4random()];
        
        if (!userNotificationMap)
            userNotificationMap = [[NSMutableDictionary alloc] init];
        
        [userNotificationMap setObject:callback forKey:uuid];
        [notif setUserInfo:[NSDictionary dictionaryWithObjectsAndKeys:uuid, @"uuid", nil]];
    }
    
    
    [notif setTitle:[options objectForKey:@"title"]];
    
    
    if ([options objectForKey:@"subtitle"] && [[options objectForKey:@"subtitle"] isKindOfClass:[NSString class]])
        [notif setSubtitle:[options objectForKey:@"subtitle"]];
    
    
    if ([options objectForKey:@"body"] && [[options objectForKey:@"body"] isKindOfClass:[NSString class]])
        [notif setInformativeText:[options objectForKey:@"body"]];
    
    
    if ([options objectForKey:@"button"] && [[options objectForKey:@"button"] isKindOfClass:[NSString class]]) {
        [notif setHasActionButton:YES];
        [notif setActionButtonTitle:[options objectForKey:@"button"]];
    }
    else {
        [notif setHasActionButton:NO];
    }
    
    
    [[cNSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:notif];
}
- (void)userNotificationCenter:(id)center didActivateNotification:(id)notification {
    
    [center removeDeliveredNotification:notification];
    NSString* uuid = [[notification userInfo] objectForKey:@"uuid"];
    CHDebug(@"userinfo = %@", [notification userInfo]);
    if (!uuid)
        return;
    
    NoddyFunction* callback = [userNotificationMap objectForKey:uuid];
    CHDebug(@"  - callback = %@", callback);

    if ([userNotificationMap objectForKey:uuid])
        [userNotificationMap removeObjectForKey:uuid]; // Try not to leak (though it's difficult not to)
    
    if ([callback isKindOfClass:[NoddyFunction class]]) {
        NoddyScheduleBlock(^{
            [callback call:nil arguments:[NSArray arrayWithObject:
                                          [NSNumber numberWithBool:((int)[notification activationType]) == 2]]
             ];
        });
    }
}

- (BOOL)userNotificationCenter:(id)center shouldPresentNotification:(id)notification {
    return YES;
}

// TODO: This code needs testing

//- (void)userNotificationCenter:(id)center didDeliverNotification:(id)notification {
//    [self performSelector:@selector(cleanNotification:) withObject:notification afterDelay:60.0 * 15.0]; // Clean in 15 minutes time
//}
//- (void)cleanNotification:(id)notif {
//    NSString* uuid = [[notification userInfo] objectForKey:@"uuid"];
//    if (!uuid)
//        return;
//    
//    NoddyFunction* callback = [userNotificationMap objectForKey:uuid];
//    if ([userNotificationMap objectForKey:uuid])
//        [userNotificationMap removeObjectForKey:uuid]; // Try not to leak (though it's difficult not to)
//}


@end
