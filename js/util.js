'use strict';

var _exports = module.exports = {};

_exports.figureStyle = function figureStyle(d) {
    var translateX = Object.hasOwnProperty.call(d, 'translateX') ? d.translateX : 0;
    return {
        transform: 'rotateY(' + d.rotateY + 'rad) ' + ' translateX(' + translateX + 'px)' + ' translateZ(' + d.translateZ + 'px)',
        opacity: d.opacity
    };
};

_exports.partial = function partial(func) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        return func.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)));
    };
};

_exports.range = function range(from, to) {
    var res = [];
    for (var i = from; i < to; ++i) {
        res.push(i);
    }
    return res;
};

_exports.uniq = function uniq(a) {
    var prims = { 'boolean': {}, 'number': {}, 'string': {} },
        objs = [];
    return a.filter(function (item) {
        var type = typeof item;
        if (type in prims) return prims[type].hasOwnProperty(item) ? false : prims[type][item] = true;else return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
};

/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
_exports.merge = function merge(defaults, options) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};

_exports.pluck = function pluck(key, entries) {
    return entries.map(function (entry) {
        return entry[key];
    });
};

_exports.mapObj = function mapObj(fn, obj) {
    var res = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = fn(obj[key]);
        }
    }
    return res;
};