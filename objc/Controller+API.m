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

@end
