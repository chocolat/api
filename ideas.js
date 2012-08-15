// Things that would be nice to see implemented

// Document
.tabSize
.usesSoftTabs
.symbols()

// Tab
.addActiveDocument(<doc>)
.removeActiveDocument(<doc>)


// MainWindow
.frame
MainWindow.windows()


// Document
Document.documents()
Document.documentForPath(<path>)

Document.recents()
Document.clearRecents()

Document.newUntitled()
Document.open(<path>)

Document.saveAll()

.saveAs(<path>)


// Editor
Editor.editors()

.hide()
.starred

// OpenPanel, SavePanel
...

// Hooks

Hooks.addTooltip()   // If the mouse hovers for a sufficient amount of time, with optional modifiers
Hooks.addGesture(<kind>)   // "pinch", "swipe", "rotate", etc

// Multicursor
Editor.cursors.addRange()
Editor.cursors.addInsertionPoint()
Editor.cursors.setRange()
Editor.cursors.setInsertionPoint()
Editor.cursors.removeInRange()
Editor.cursors.each()


// Local Notifications
Alert.notify({ ... })

