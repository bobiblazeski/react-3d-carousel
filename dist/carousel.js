/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(1);

	var Util = __webpack_require__(2);
	var Depot = __webpack_require__(3);
	var Layout = __webpack_require__(4);
	var Images = __webpack_require__(5);

	var creator = Util.carousel;// Util.classic;
	var Carousel = React.createClass({displayName: "Carousel",
	    getInitialState: function () {
	        return {
	            sides: this.props.sides,
	            figures: Layout[this.props.layout].figures(this.props.width, this.props.sides, 0),
	            rotationY: 0
	        };
	    },
	    componentWillMount: function () {
	        this.store = Store(
	            this.getInitialState(),
	            this.props
	        );
	        this.store.state.skip(1).subscribe(function (state) {
	            this.setState(state);
	        }.bind(this));
	        this.onMove = function onMove(angle) {
	            this.store.move.onNext(angle);
	        }.bind(this);
	    },
	    componentWillReceiveProps: function (nextProps) {
	        this.store.props.onNext(nextProps);
	    },
	    render: function () {
	        var angle = (2 * Math.PI) / this.state.figures.length;
	        var cStyle = Util.carouselStyle(Layout[this.props.layout].distance(this.props.width,
	            this.state.figures.length));
	        // {i+1}
	        var figures =  this.state.figures.map(function (d, i) {
	            return (React.createElement("figure", {key: i, style: Util.figureStyle(d)}, 
	                React.createElement("img", {src: Images[i], alt: i, height: "100%", width: "100%"})
	            ));
	        });
	        return (
	            React.createElement("section", {className: "container"}, 
	                React.createElement("div", {id: "carousel", style: cStyle}, 
	                    figures
	                ), 
	                React.createElement("div", {className: "prev", onClick: Rex.partial(this.onMove, angle)}), 
	                React.createElement("div", {className: "next", onClick: Rex.partial(this.onMove,-angle)})
	            )
	        );
	    }
	});
	module.exports = Carousel;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = {};


	exports.figureStyle = function figureStyle(d) {
	    var translateX = Object.hasOwnProperty.call(d, 'translateX') ? d.translateX : 0;
	    return {
	        transform: 'rotateY(' + d.rotateY + 'rad) '
	        + ' translateX(' + translateX + 'px)'
	        + ' translateZ(' + d.translateZ + 'px)',
	        opacity: d.opacity
	    };
	};

	exports.carouselStyle = function carouselStyle(translateZ) {
	    return {
	        transform: "translateZ(" + (-translateZ) + "px)"
	    };
	};

	exports.partial = function partial(func){
	    var args = Array.prototype.slice.call(arguments, 1);
	    return function(){
	        return func.apply(this,args.concat(Array.prototype.slice.call(arguments, 0)));
	    }
	};
	/*
	 var multiply = function(a, b) { return a * b; };
	 var double = partial(multiply, 2)
	 double(3) //=> 6
	 */

	exports.range = function range(from,to){
	    var res = [];
	    for(var i =from; i < to; ++i){
	        res.push(i);
	    }
	    return res;
	};

	exports.uniq = function uniq(a) {
	    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
	    return a.filter(function(item) {
	        var type = typeof item;
	        if(type in prims)
	            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
	        else
	            return objs.indexOf(item) >= 0 ? false : objs.push(item);
	    });
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	exports.merge = function merge(defaults, options ) {
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

	exports.pluck = function pluck(key,entries){
	    return entries.map(function(entry){
	        return entry[key];
	    });
	};

	exports.mapObj = function mapObj(fn,obj){
	    var res= {};
	    for(var key in obj){
	        if(obj.hasOwnProperty(key)){
	            res[key] = fn(obj[key]);
	        }
	    }
	    return res;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var Ease = __webpack_require__(6);
	var Layout = __webpack_require__(4);

	var exports = module.exports = {};

	module.depot = function depot(initialState, initialProps,callback) {
	    var res = {};
	    var state = initialState;
	    var props = initialProps;
	    var request;
	    res.onNextProps = function onNextProps(nextProps) {
	        cancelAnimationFrame(request);
	        props = nextProps;
	        var to = Layout[props.layout]
	            .figures(props.width, props.sides, state.rotationY);
	        var bounds = transitionFigures(state.figures, to,
	            Ease[props.ease], props.duration);
	        var stepper = transit(bounds, to, props.duration);
	        request = requestAnimationFrame(function (timestamp) {
	            state.figures = stepper(timestamp);
	            if (state.figures == to) {
	                cancelAnimationFrame(request);
	            }
	            callback(state);
	        });
	    };
	    res.onRotate = function(angle){
	        state.rotationY +=angle;
	        var to = Layout[props.layout].figures(props.width,props.sides,
	            state.rotationY + angle);
	        var bounds = transitionFigures(state.figures,to,Ease[props.ease],props.duration);
	        var stepper = transit(bounds, to, props.duration);
	        request = requestAnimationFrame(function (timestamp) {
	            state.figures = stepper(timestamp);
	            if (state.figures == to) {
	                cancelAnimationFrame(request);
	            }
	            callback(state);
	        });
	    };
	    return res;
	};

	function transitionFigures(from, to, ease) {
	    var keys = Rex.uniq(Rex.pluck('key', from.concat(to)));
	    var fromTo = [];
	    keys.forEach(function (key) {
	        fromTo.push(transfigure(startFrame(from[key], to[key]),
	            endFrame(from[key], to[key]), ease));
	    });
	    return fromTo;
	}

	function transit(entries, to, duration) {
	    var start = Date.now();
	    var end = start + duration;
	    var withChange = addChange(entries);
	    var time = 0;
	    return function step(timestamp) {
	        if (timestamp >= end) {
	            return to;
	        }
	        time = timestamp - start;
	        return tally(time, withChange, duration);
	    }
	}

	function transfigure(from, to, ease) {
	    var keys = Rex.uniq(Object.keys(from || {}).concat(Object.keys(to || {})));
	    var res = {};
	    keys.forEach(function (key) {
	        res[key] = {
	            from: from[key],
	            to: to[key]
	        };
	        res[key].ease = isNaN(res[key].from) ? secondArg : ease;
	    });
	    return res;
	}

	function addChange(entries) {
	    var len = entries.length;
	    var res = new Array(len);
	    for (var i = 0; i < len; ++i) {
	        res[i] = addObjChange(entries[i]);
	    }
	    return res;
	}

	function addObjChange(entry) {
	    var res = Object.create(null);
	    for (var key in entry) {
	        res[key] = Rex.merge(entry[key], {change: entry[key].to - entry[key].from});
	    }
	    return res;
	}

	function tally(time, entries, duration) {
	    var len = entries.length;
	    var res = new Array(len);
	    var entry;
	    for (var i = 0; i < len; ++i) {
	        entry = entries[i];
	        var obj = Object.create(null);
	        for (var key in entry) {
	            obj[key] = entry[key].ease ?
	                entry[key].ease(time, entry[key].from, entry[key].change, duration)
	                : entry[key].from;
	        }
	        res[i] = obj;
	    }
	    return res;
	}


	var secondArg = function (x, y) {
	    return y;
	};


	var present = function present(entries) {
	    return entries.filter(function (entry) {
	        return entry.present;
	    });
	};

	function startFrame(now, then) {
	    return now || Rex.merge(then, {present: true, opacity: 0});
	}

	function endFrame(now, then) {
	    return now && !then ? Rex.merge(now, {present: false, opacity: 0}) // leaves
	        : Rex.merge(then, {present: true, opacity: 1});
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);

	var exports = module.exports = {};

	exports.prism = {
	    distance: function apothem(width, sides) {
	        return Math.ceil(width / (2 * Math.tan(Math.PI / sides)));
	    },
	    figures: function (width, sides, initial) {
	        var angle = 2 * Math.PI / sides;
	        var acceptable = Math.round(initial / angle) * angle;
	        return Util.range(0, sides).map(function (d) {
	            return {
	                rotateY: d * angle + acceptable,
	                translateX: 0,
	                translateZ: exports.prism.distance(width, sides),
	                opacity: 1,
	                present: true,
	                key: d
	            };
	        });
	    }
	};
	exports.classic = {
	    distance: function (width, sides) {
	        return Math.round(width * Math.log(sides))
	    },
	    figures: function (width, sides, initial) {
	        var angle = 2 * Math.PI / sides;
	        var distance = exports.classic.distance(width, sides);
	        var acceptable = Math.round(initial / angle) * angle;
	        return Util.range(0, sides).map(function (d) {
	            var angleR = d * angle + acceptable;
	            return {
	                rotateY: 0,
	                translateX: distance * Math.sin(angleR),
	                translateZ: distance * Math.cos(angleR),
	                opacity: 1,
	                present: true,
	                key: d
	            };
	        });
	    }
	};



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
	    'http://s4.postimg.org/r6g5ay2ng/zen1.jpg',
	    'http://s21.postimg.org/er8b066p3/zen2.jpg',
	    'http://s30.postimg.org/x3cgpdtgx/zen3.jpg',
	    'http://s21.postimg.org/h1estw95z/zen4.jpg',
	    'http://s8.postimg.org/upypfrk8l/zen5.jpg',
	    'http://s7.postimg.org/goiv34aez/zen6.jpg',
	    'http://s30.postimg.org/n9zuqbgq9/zen7.jpg',
	    'http://s7.postimg.org/dbamgegu3/zen8.jpg',
	    'http://s12.postimg.org/9kw5b42d9/zen9.jpg',
	    'http://s13.postimg.org/vwf92qbl3/zen10.jpg',
	    'http://s4.postimg.org/anf2w9rzh/zen11.jpg',
	    'http://s17.postimg.org/gpbiwdsu7/zen12.jpg',
	    'http://s9.postimg.org/n5uuedw3z/zen13.jpg',
	    'http://s9.postimg.org/x6zonp973/zen14.jpg',
	    'http://s2.postimg.org/r0vsbv8op/zen15.jpg',
	    'http://s21.postimg.org/szu5d0h2f/zen16.jpg',
	    'http://s15.postimg.org/xi59nxox7/zen17.jpg',
	    'http://s8.postimg.org/zexjdajw5/zen18.jpg',
	    'http://s24.postimg.org/st2ukrfz9/zen19.jpg',
	    'http://s15.postimg.org/40kb5u63v/zen20.jpg'
	];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = {};

	exports.bounceOut = function bounceOut(time, begin, change, duration) {
	    if ((time /= duration) < 1 / 2.75) {
	        return change * (7.5625 * time * time) + begin;
	    } else if (time < 2 / 2.75) {
	        return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
	    } else if (time < 2.5 / 2.75) {
	        return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
	    } else {
	        return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
	    }
	};

	exports.bounceIn = function bounceIn(time, begin, change, duration) {
	    return change - bounceOut(duration - time, 0, change, duration) + begin;
	};

	exports.bounceInOut = function bounceInOut(time, begin, change, duration) {
	    if (time < duration / 2) {
	        return bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
	    } else {
	        return bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
	    }
	};

	exports.circIn = function circIn(time, begin, change, duration) {
	    return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
	};

	exports.circOut = function circOut(time, begin, change, duration) {
	    return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
	};

	exports.circInOut = function circInOut(time, begin, change, duration) {
	    if ((time = time / (duration / 2)) < 1) {
	        return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
	    } else {
	        return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
	    }
	};

	exports.cubicIn = function cubicIn(time, begin, change, duration) {
	    return change * (time /= duration) * time * time + begin;
	};

	exports.cubicOut = function cubicOut(time, begin, change, duration) {
	    return change * ((time = time / duration - 1) * time * time + 1) + begin;
	};

	exports.cubicInOut = function cubicInOut(time, begin, change, duration) {
	    if ((time = time / (duration / 2)) < 1) {
	        return change / 2 * time * time * time + begin;
	    } else {
	        return change / 2 * ((time -= 2) * time * time + 2) + begin;
	    }
	};

	exports.expoIn = function expoIn(time, begin, change, duration) {
	    if (time === 0) {
	        return begin;
	    }
	    return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
	};

	exports.expoOut = function expoOut(time, begin, change, duration) {
	    if (time === duration) {
	        return begin + change;
	    }
	    return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
	};

	exports.expoInOut = function expoInOut(time, begin, change, duration) {
	    if (time === 0) {
	        return begin;
	    } else if (time === duration) {
	        return begin + change;
	    } else if ((time = time / (duration / 2)) < 1) {
	        return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
	    } else {
	        return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
	    }
	};

	exports.linear = function linear(time, begin, change, duration) {
	    return change * time / duration + begin;
	};

	exports.quadIn = function quadIn(time, begin, change, duration) {
	    return change * (time = time / duration) * time + begin;
	};

	exports.quadOut = function quadOut(time, begin, change, duration) {
	    return -change * (time = time / duration) * (time - 2) + begin;
	};

	exports.quadInOut = function quadInOut(time, begin, change, duration) {
	    if ((time = time / (duration / 2)) < 1) {
	        return change / 2 * time * time + begin;
	    } else {
	        return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
	    }
	};

	exports.quartIn = function quartIn(time, begin, change, duration) {
	    return change * (time = time / duration) * time * time * time + begin;
	};

	exports.quartOut = function quartOut(time, begin, change, duration) {
	    return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
	};

	exports.quartInOut = function quartInOut(time, begin, change, duration) {
	    if ((time = time / (duration / 2)) < 1) {
	        return change / 2 * time * time * time * time + begin;
	    } else {
	        return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
	    }
	};

	exports.quintIn = function quintIn(time, begin, change, duration) {
	    return change * (time = time / duration) * time * time * time * time + begin;
	};

	exports.quintOut = function quintOut(time, begin, change, duration) {
	    return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
	};

	exports.quintInOut = function quintInOut(time, begin, change, duration) {
	    if ((time = time / (duration / 2)) < 1) {
	        return change / 2 * time * time * time * time * time + begin;
	    } else {
	        return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
	    }
	};

	exports.sineIn = function sineIn(time, begin, change, duration) {
	    return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
	};

	exports.sineOut = function sineOut(time, begin, change, duration) {
	    return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
	};

	exports.sineInOut = function sineInOut(time, begin, change, duration) {
	    return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);