#import "Document+API.h"
#import "CHIndentationContext.h"

@implementation CHSingleFileDocument (API)

- (NSInteger)js_tabSize {
    return [self tabInfo].tabSize;
}
- (BOOL)js_softTabs {
    return [self tabInfo].useSoftTabs;
}
- (NSString*)js_tabString {
    return [[self tabInfo] tabString];
}

@end
