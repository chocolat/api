#import "Mixin+API.h"

@implementation NoddyMixin (API)

- (void)js_addEditorContextMenu:(NSDictionary*)ctxMenu {
    [self.editorContextItems addObject:[ctxMenu copy]];
}
- (void)js_addProjectContextMenu:(NSDictionary*)ctxMenu {
    [self.splendidContextItems addObject:[ctxMenu copy]];
}

@end
