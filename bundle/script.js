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
 * @description Is function
 * @param val
 * @returns {boolean}
 */
var isFunc = function isFunc(val) {
    return typeof val === 'function';
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
 * @param key
 * @returns {*}
 */
var extractNestedProp = function extractNestedProp(obj, key) {
    var keys = key.split('.');
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
 * @param key
 * @param propType
 * @param direction
 */
var _sortBy = function _sortBy(items, key, propType, direction) {
    return items.sort(function (a, b) {
        var aVal = isStr(key) ? extractNestedProp(a, key) : '';
        var bVal = isStr(key) ? extractNestedProp(b, key) : '';

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
            aVal = key.map(function (key) {
                return extractNestedProp(a, key);
            }).join(' ');
            bVal = key.map(function (key) {
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
var shape = function shape(items) {
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
            var length = 2;
            shapeItems = _filterByDuplicate(shapeItems, key, length);
            return this;
        },
        filterByProp: function filterByProp(key, value) {
            shapeItems = shapeItems.filter(function (item) {
                return extractNestedProp(item, key) === value;
            });
            return this;
        },
        sortBy: function sortBy(key) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'string';
            var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';

            shapeItems = _sortBy(shapeItems, key, type, direction);
            return this;
        },
        reduceTo: function reduceTo(key, augmenter) {
            var hasAugmenter = isFunc(augmenter);

            shapeItems = shapeItems.reduce(function (accumulator, item) {
                var prop = extractNestedProp(item, key);
                var augmentObj = void 0;

                if (isFunc(augmenter)) {
                    augmentObj = augmenter(item, prop, key);
                }

                if (isArr(prop)) {
                    var nextProp = prop;

                    if (isObj(prop[0]) && hasAugmenter) {
                        nextProp = prop.map(function (propItem) {
                            return extend({}, propItem, isObj(augmentObj) ? augmentObj : {});
                        });
                    }
                    return [].concat(_toConsumableArray(accumulator), _toConsumableArray(nextProp));
                } else if (!isUndef(prop) && !isNull(prop)) {
                    var _nextProp = prop;

                    if (isObj(prop) && hasAugmenter) {
                        _nextProp = extend({}, prop, isObj(augmentObj) ? augmentObj : {});
                    }
                    return [].concat(_toConsumableArray(accumulator), [_nextProp]);
                }
                return accumulator;
            }, []);
            return this;
        }
    };
};

module.exports = { shape: shape };

/***/ })
/******/ ]);