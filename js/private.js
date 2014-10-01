/**
 * @api private
 */
function private_get_mixin() {
    return global.CORE_MIXIN_ID;
}

/**
* @api private
*/
function createObject(parent) {
 function TempClass() {}
 TempClass.prototype = parent;
 var child = new TempClass();
 return child;
}

/**
* @api private
*/
function noddyInherit(sub, superObj) {
 var newSubPrototype = createObject(superObj.prototype); 
 newSubPrototype.constructor = sub; 
 sub.prototype = newSubPrototype;
}
