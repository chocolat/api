var _ = require("underscore.js");

/**
 * @api private
 */
function throw_if_null(obj, argname) {
    if (obj === null || typeof obj === 'undefined') {
        throw "Null argument in " + argname + ".";
    }

    return obj;
}

/**
 * @api private
 */
function throw_ifnot_string(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'string') {
        return obj;
    }
    throw "Non-string argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_object(obj, argname, canBeNull) {
    
    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }
    
    if (typeof obj === 'object') {
        return obj;
    }
    throw "Non-object argument in " + argname + ".";
}


/**
 * @api private
 */
function throw_ifnot_array(obj, argname, canBeNull) {
    
    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }
    
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        return obj;
    }
    throw "Non-array of strings argument in " + argname + ".";
}


/**
 * @api private
 */
function throw_ifnot_number(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'number') {
        return obj;
    }
    throw "Non-number argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_function(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'function') {
        return obj;
    }
    throw "Non-function argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_boolean(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'boolean') {
        return obj;
    }
    throw "Non-boolean argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_range(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("length") && obj.hasOwnProperty("location"))) {
        throw "Invalid argument in " + argname + ". Must be an object with location and length properties.";
    }
    return obj;
}

/**
 * @api private
 */
function throw_ifnot_point(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("x") && obj.hasOwnProperty("y"))) {
        throw "Invalid argument in " + argname + ". Must be an object with x and y properties.";
    }
    return obj;
}

/**
 * @api private
 */
function throw_ifnot_size(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("width") && obj.hasOwnProperty("height"))) {
        throw "Invalid argument in " + argname + ". Must be an object with width and height properties.";
    }
    return obj;
}

/**
 * @api private
 */
function throw_ifnot_rect(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("x") && obj.hasOwnProperty("y") && obj.hasOwnProperty("width") && obj.hasOwnProperty("height"))) {
        throw "Invalid argument in " + argname + ". Must be an object with x, y, width and height properties.";
    }
    return obj;
}
