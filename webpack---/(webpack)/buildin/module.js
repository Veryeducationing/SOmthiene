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


//////////////////
// WEBPACK FOOTER
// (webpack)/buildin/module.js
// module id = 99
// module chunks = 1
//# sourceURL=webpack:///(webpack)/buildin/module.js?