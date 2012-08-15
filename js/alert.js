var Alert = {};
global.Alert = Alert;

/**
 * Shows an alert.
 *
 * Example:
 * 
 *     Alert.show("My Title", "My awesome body!", ["Yes", "No"]);
 *
 * @param {String} title the title of your alert.
 * @param {String} message the body of your alert message. Optional.
 * @param {Array} buttons an array of buttons to display. Buttons are displayed from right to left.
 * @return {Number} the index of the button that was clicked. 0 is the right-most button. Optional.
 * @memberOf Alert
 *
 */
Alert.show = function(title, message, buttons) {
    
    if (title == null)
        title = "Some mixin forgot to give their alert a title (it was " + String(private_get_mixin()) + ")";
    
    if (message == null)
        message = "";
    
    if (buttons == null || buttons.length)
        buttons = ["OK"];
    
    return objc_msgSendSync("controller", "showAlert:", {
        "title": title,
        "message": message,
        "buttons": buttons
    });
};


/**
 * Play the system beep sound.
 *
 * @memberOf Alert
 */
Alert.beep = function() {
    global.objc_msgSend("controller", "js_beep");
}
