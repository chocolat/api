var Alert = {};
global.Alert = Alert;

/**
 * @api private
 */
function private_nullifyundef(v) {
    if (v == null)
        return null;
    return v;
}

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
    
    throw_ifnot_string(private_nullifyundef(title), "title of Alert.show", null);
    throw_ifnot_string(private_nullifyundef(message), "message of Alert.show", null);
    throw_ifnot_array(private_nullifyundef(buttons), "buttons of Alert.show", null);
    
    if (title == null)
        title = "Some mixin forgot to give their alert a title (it was " + String(private_get_mixin()) + ")";
    
    if (message == null)
        message = "";
    
    if (buttons == null || buttons === [])
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
};

/**
 * Show a user notification on 10.8. Notifications are ignored on 10.7.
 *
 * Example:
 * 
 *     Alert.notify({
 *         title: "Acheivement Unlocked",
 *         subtitle: "Go To Hell",
 *         body: "Use the goto keyword 10 times in the same file",
 *         button: "Revert",
 *         callback: function () {
 *             // Do something when the "Revert" button is clicked
 *         }
 *     });
 *
 * @param {Object} options an object of options to configure the notification. See example.
 * @memberOf Alert
 */
Alert.notify = function(options) {
    throw_ifnot_string(private_nullifyundef(options.title), "options.title of Alert.notify", null);
    throw_ifnot_string(private_nullifyundef(options.subtitle), "options.subtitle of Alert.notify", null);
    throw_ifnot_string(private_nullifyundef(options.body), "options.body of Alert.notify", null);
    
    throw_ifnot_string(private_nullifyundef(options.button), "options.button of Alert.notify", null);
    throw_ifnot_function(private_nullifyundef(options.callback), "options.callback of Alert.notify", null);
    
    objc_msgSend("controller", "js_userNotification:", options);
};

