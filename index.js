/**
 * @description Iterate over each key of an object
 * @param obj
 * @param callback
 */
const eachKey = (obj, callback) => {
    Object.keys(obj).forEach((key, index) => callback(obj[key], key, index));
};

/**
 * @description Augment object with properties from other objects
 * @returns {object}
 */
const extend = function() {
    let obj = arguments[0];
    let enhancedObj = Object.assign(obj, {});
    let extenders = [];
    eachKey(arguments, (argument, key, index) => {
        if ( index > 0 ) {
            extenders.push(argument);
        }
    });
    extenders.forEach((extender) => {
        Object.assign(enhancedObj, extender);
    });
    return enhancedObj;
};

/**
 * @description Is function
 * @param val
 * @returns {boolean}
 */
const isFunc = val => typeof val === 'function';

/**
 * @description Check if value is of type 'object'
 * @param val
 * @returns {boolean}
 */
const isObj = val => typeof val === 'object' && !isArr(val) && !isNull(val);

/**
 * @description Check if value is of type 'null'
 * @param val
 * @returns {boolean}
 */
const isNull = val => val === null;

/**
 * @description Check if value is of type 'array'
 * @param val
 * @returns {boolean}
 */
const isArr = val => Array.isArray(val);

/**
 * @description Check if value is of type 'string'
 * @param val
 * @returns {boolean}
 */
const isStr = val => typeof val === 'string';

/**
 * @description Check if value is of type 'undefined'
 * @param val
 * @returns {boolean}
 */
const isUndef = val => typeof val === 'undefined';

/**
 * @description Extract nexted prop
 * @param obj
 * @param key
 * @returns {*}
 */
const extractNestedProp = (obj, key) => {
    const keys = key.split('.');
    const keysLength = keys.length - 1;
    let keysIndex = 0;
    let isValidKey = true;
    let targetObj = Object.assign({}, obj);
    let targetProp;
    let nextTarget;

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
const sortBy = (items, key, propType, direction) => {
    return items.sort((a, b) => {
        let aVal = isStr(key) ? extractNestedProp(a, key) : '';
        let bVal = isStr(key) ? extractNestedProp(b, key) : '';

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
            return direction === 'asc'
                ? new Date(aVal) - new Date(bVal)
                : new Date(bVal) - new Date(aVal);
        } else if (propType === 'combo') {
            aVal = key.map(key => extractNestedProp(a, key)).join(' ');
            bVal = key.map(key => extractNestedProp(b, key)).join(' ');

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
const filterByUnique = (items, key) => items.reduce((accumulator, item) => {
    const itemProp = extractNestedProp(item, key);

    const isDuplicate = accumulator.filter(filteredItem => {
        const prop = extractNestedProp(filteredItem, key);
        return prop === itemProp;
    }).length > 0;

    if (isDuplicate) {
        return accumulator;
    }

    const modifiedItem = extend({}, item);
    accumulator.push(modifiedItem);
    return accumulator;
}, []);

/**
 * @description Filter by duplicate
 * @param items
 * @param key
 * @param duplicateLength
 * @returns {*}
 */
const filterByDuplicate = (items, key, duplicateLength = 2) => items.filter(item => {
    const itemProp = extractNestedProp(item, key);
    const duplicatesCount = duplicateLength - 1;

    return items.filter(innerItem => {
        const prop = extractNestedProp(innerItem, key);
        return prop === itemProp;
    }).length > duplicatesCount;
});

/**
 * @description Shape
 * @param {array} items
 * @returns {*}
 */
const shape = items => {
    let shapeItems = [...items];

    return {
        fetch: () => shapeItems,
        fetchIndex(index) {
            return shapeItems[index];
        },
        filterByUnique(key) {
            shapeItems = filterByUnique(shapeItems, key);
            return this;
        },
        filterByDuplicate(key) {
            const length = 2;
            shapeItems = filterByDuplicate(shapeItems, key, length);
            return this;
        },
        filterByProp(key, value) {
            shapeItems = shapeItems.filter(item => extractNestedProp(item, key) === value);
            return this;
        },
        sortBy(key, type = 'string', direction = 'asc') {
            shapeItems = sortBy(shapeItems, key, type, direction);
            return this;
        },
        reduceTo(key, augmenter) {
            const hasAugmenter = isFunc(augmenter);

            shapeItems = shapeItems.reduce((accumulator, item) => {
                const prop = extractNestedProp(item, key);
                let augmentObj;

                if (isFunc(augmenter)) {
                    augmentObj = augmenter(item, prop, key);
                }

                if (isArr(prop)) {
                    let nextProp = prop;

                    if (isObj(prop[0]) && hasAugmenter) {
                        nextProp = prop.map(propItem => extend({}, propItem, isObj(augmentObj) ? augmentObj : {}))
                    }
                    return [...accumulator, ...nextProp];
                } else if (!isUndef(prop) && !isNull(prop)) {
                    let nextProp = prop;

                    if (isObj(prop) && hasAugmenter) {
                        nextProp = extend({}, prop, isObj(augmentObj) ? augmentObj : {});
                    }
                    return [...accumulator, nextProp];
                }
                return accumulator;
            }, []);
            return this;
        }
    };
};

module.exports = { shape };
