/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @description Iterate over each key of an object
 * @param obj
 * @param callback
 */
var eachKey = function eachKey(obj, callback) {
    Object.keys(obj).forEach(function (key, index) {
        return callback(obj[key], key, index);
    });
};

/**
 * @description Augment object with properties from other objects
 * @returns {object}
 */
var extend = function extend() {
    var obj = arguments[0];
    var enhancedObj = Object.assign(obj, {});
    var extenders = [];
    eachKey(arguments, function (argument, key, index) {
        if (index > 0) {
            extenders.push(argument);
        }
    });
    extenders.forEach(function (extender) {
        Object.assign(enhancedObj, extender);
    });
    return enhancedObj;
};

/**
 * @description Check if value is of type 'object'
 * @param val
 * @returns {boolean}
 */
var isObj = function isObj(val) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !isArr(val) && !isNull(val);
};

/**
 * @description Check if value is of type 'null'
 * @param val
 * @returns {boolean}
 */
var isNull = function isNull(val) {
    return val === null;
};

/**
 * @description Check if value is of type 'array'
 * @param val
 * @returns {boolean}
 */
var isArr = function isArr(val) {
    return Array.isArray(val);
};

/**
 * @description Check if value is of type 'string'
 * @param val
 * @returns {boolean}
 */
var isStr = function isStr(val) {
    return typeof val === 'string';
};

/**
 * @description Check if value is of type 'undefined'
 * @param val
 * @returns {boolean}
 */
var isUndef = function isUndef(val) {
    return typeof val === 'undefined';
};

/**
 * @description Extract nexted prop
 * @param obj
 * @param keysText
 * @returns {*}
 */
var extractNestedProp = function extractNestedProp(obj, keysText) {
    var keys = keysText.split('.');
    var keysLength = keys.length - 1;
    var keysIndex = 0;
    var isValidKey = true;
    var targetObj = Object.assign({}, obj);
    var targetProp = void 0;
    var nextTarget = void 0;

    if (keys.length > 0) {
        while (isValidKey) {
            nextTarget = targetObj[keys[keysIndex]];

            if (keysIndex === keysLength) {
                targetProp = !isUndef(nextTarget) && !isNull(nextTarget) ? nextTarget : undefined;
                break;
            }

            if (!isObj(nextTarget)) {
                isValidKey = false;
                break;
            }

            targetObj = nextTarget;
            keysIndex++;
        }
    }

    return targetProp;
};

/**
 * @description Sort by
 * @param items
 * @param keysText
 * @param propType
 * @param direction
 */
var _sortBy = function _sortBy(items, keysText, propType, direction) {
    return items.sort(function (a, b) {
        var aVal = isStr(keysText) ? extractNestedProp(a, keysText) : '';
        var bVal = isStr(keysText) ? extractNestedProp(b, keysText) : '';

        if (isUndef(aVal) || isNull(aVal)) {
            return direction === 'asc' ? -1 : 1;
        }

        if (isUndef(bVal) || isNull(bVal)) {
            return direction === 'asc' ? 1 : -1;
        }

        if (propType === 'string' || propType === 'email') {
            if (aVal.toLowerCase() > bVal.toLowerCase()) {
                return direction === 'asc' ? 1 : -1;
            }
            if (aVal.toLowerCase() < bVal.toLowerCase()) {
                return direction === 'asc' ? -1 : 1;
            }
            return 0;
        } else if (propType === 'number' || propType === 'integer' || propType === 'float') {
            if (aVal > bVal) {
                return direction === 'asc' ? 1 : -1;
            }
            if (aVal < bVal) {
                return direction === 'asc' ? -1 : 1;
            }
            return 0;
        } else if (propType === 'date') {
            return direction === 'asc' ? new Date(aVal) - new Date(bVal) : new Date(bVal) - new Date(aVal);
        } else if (propType === 'combo') {
            aVal = keysText.map(function (key) {
                return extractNestedProp(a, key);
            }).join(' ');
            bVal = keysText.map(function (key) {
                return extractNestedProp(b, key);
            }).join(' ');

            if (isUndef(aVal) || isNull(aVal)) {
                return direction === 'asc' ? -1 : 1;
            }

            if (isUndef(bVal) || isNull(bVal)) {
                return direction === 'asc' ? 1 : -1;
            }

            if (aVal.toLowerCase() > bVal.toLowerCase()) {
                return direction === 'asc' ? 1 : -1;
            }

            if (aVal.toLowerCase() < bVal.toLowerCase()) {
                return direction === 'asc' ? -1 : 1;
            }

            return 0;
        }
    });
};

/**
 * @description Filter by unique
 * @param items
 * @param key
 * @returns {*}
 */
var _filterByUnique = function _filterByUnique(items, key) {
    return items.reduce(function (accumulator, item) {
        var itemProp = extractNestedProp(item, key);

        var isDuplicate = accumulator.filter(function (filteredItem) {
            var prop = extractNestedProp(filteredItem, key);
            return prop === itemProp;
        }).length > 0;

        if (isDuplicate) {
            return accumulator;
        }

        var modifiedItem = extend({}, item);
        accumulator.push(modifiedItem);
        return accumulator;
    }, []);
};

/**
 * @description Filter by duplicate
 * @param items
 * @param key
 * @param duplicateLength
 * @returns {*}
 */
var _filterByDuplicate = function _filterByDuplicate(items, key) {
    var duplicateLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    return items.filter(function (item) {
        var itemProp = extractNestedProp(item, key);
        var duplicatesCount = duplicateLength - 1;

        return items.filter(function (innerItem) {
            var prop = extractNestedProp(innerItem, key);
            return prop === itemProp;
        }).length > duplicatesCount;
    });
};

/**
 * @description Shape
 * @param {array} items
 * @returns {*}
 */
var shape = exports.shape = function shape(items) {
    var shapeItems = [].concat(_toConsumableArray(items));

    return {
        fetch: function fetch() {
            return shapeItems;
        },
        fetchIndex: function fetchIndex(index) {
            return shapeItems[index];
        },
        filterByUnique: function filterByUnique(key) {
            shapeItems = _filterByUnique(shapeItems, key);
            return this;
        },
        filterByDuplicate: function filterByDuplicate(key) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

            shapeItems = _filterByDuplicate(shapeItems, key, length);
            return this;
        },
        filterByProp: function filterByProp(key, value) {
            shapeItems = shapeItems.filter(function (item) {
                return extractNestedProp(item, key) === value;
            });
            return this;
        },
        sortBy: function sortBy(_ref) {
            var key = _ref.key,
                _ref$type = _ref.type,
                type = _ref$type === undefined ? 'string' : _ref$type,
                _ref$direction = _ref.direction,
                direction = _ref$direction === undefined ? 'asc' : _ref$direction;

            shapeItems = _sortBy(shapeItems, key, type, direction);
            return this;
        },
        reduceTo: function reduceTo(key) {
            shapeItems = shapeItems.reduce(function (accumulator, item) {
                var prop = extractNestedProp(item, key);
                if (isArr(prop)) {
                    return [].concat(_toConsumableArray(accumulator), _toConsumableArray(prop));
                } else if (!isUndef(prop) && !isNull(prop)) {
                    return [].concat(_toConsumableArray(accumulator), [prop]);
                }
            }, []);
            return this;
        }
    };
};

window['shape'] = shape;

/***/ })
/******/ ]);